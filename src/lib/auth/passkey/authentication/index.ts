import { getCredential } from "./native";
import { WebAuthnAbortService, base64URLStringToBuffer, bufferToBase64URLString, isSupportedByBrowser, rethrow, toAuthenticatorAttachment } from "../utils";
import { AuthenticationCredential, AuthenticationResponseJSON, Base64URLString, PublicKeyCredentialDescriptorJSON, PublicKeyCredentialRequestOptionsJSON } from "../types";

const toAllowCredentials = (allowed?: PublicKeyCredentialDescriptorJSON[]): PublicKeyCredentialDescriptor[] => {
  if (!allowed) {
    return [];
  }

  return allowed.map(descriptor => {
    const { id, transports } = descriptor;

    return {
      ...descriptor,
      id: base64URLStringToBuffer(id),
      transports: transports as AuthenticatorTransport[],
    };
  })
}

const toPublicKey = (options: PublicKeyCredentialRequestOptionsJSON, allowCredentials: PublicKeyCredentialDescriptor[]): PublicKeyCredentialRequestOptions => ({
  ...options,
  challenge: base64URLStringToBuffer(options.challenge),
  allowCredentials,
})

const toUserHandle = ({ userHandle }: AuthenticatorAssertionResponse): Base64URLString | undefined =>
  userHandle ? bufferToBase64URLString(userHandle) : undefined;

const toResponse = (credential: AuthenticationCredential): AuthenticationResponseJSON => {
  const { id, rawId, response, type } = credential;

  return {
    id,
    rawId: bufferToBase64URLString(rawId),
    response: {
      authenticatorData: bufferToBase64URLString(response.authenticatorData),
      clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
      signature: bufferToBase64URLString(response.signature),
      userHandle: toUserHandle(response),
    },
    type,
    clientExtensionResults: credential.getClientExtensionResults(),
    authenticatorAttachment: toAuthenticatorAttachment(
      credential.authenticatorAttachment,
    ),
  };
}

const toOptions = (request: PublicKeyCredentialRequestOptionsJSON): CredentialRequestOptions => {
  const allowCredentials = toAllowCredentials(request.allowCredentials);
  const publicKey = toPublicKey(request, allowCredentials);
  const signal = WebAuthnAbortService.createNewAbortSignal();

  return {
    publicKey,
    signal,
  }
}

export const startAuthentication = async (request: PublicKeyCredentialRequestOptionsJSON): Promise<AuthenticationResponseJSON> => {
  if (!isSupportedByBrowser()) {
    throw new Error('Browser is not supporting Web Authentication API');
  }

  const options = toOptions(request);

  return getCredential(options)
    .then(toResponse)
    .catch(rethrow);
}
