import { WebAuthnAbortService, getCredential } from "./native";
import { base64URLStringToBuffer, bufferToBase64URLString, isSupportedByBrowser, rethrow } from "../utils";
import { AuthenticationCredential, AuthenticationResponseJSON, PublicKeyCredentialDescriptorJSON, PublicKeyCredentialRequestOptionsJSON } from "../types";

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

const toPublicKey = (options: PublicKeyCredentialRequestOptionsJSON, allowCredentials: PublicKeyCredentialDescriptor[]) => ({
  ...options,
  challenge: base64URLStringToBuffer(options.challenge),
  allowCredentials,
})

const attachments: AuthenticatorAttachment[] = ['cross-platform', 'platform'];

export function toAuthenticatorAttachment(
  attachment: string | null,
): AuthenticatorAttachment | undefined {
  if (!attachment) {
    return;
  }

  if (attachments.indexOf(attachment as AuthenticatorAttachment) < 0) {
    return;
  }

  return attachment as AuthenticatorAttachment;
}

const toUserHandle = ({ userHandle }: AuthenticatorAssertionResponse) =>
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
