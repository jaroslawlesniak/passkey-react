import {
  AuthenticatorAttestationResponseFuture,
  AuthenticatorTransportFuture,
  PublicKeyCredentialCreationOptions,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialDescriptor,
  PublicKeyCredentialDescriptorJSON,
  RegistrationCredentialWithResponse,
  RegistrationResponseJSON,
} from '../types';
import {
  base64URLStringToBuffer,
  bufferToBase64URLString,
  isSupportedByBrowser,
  toAuthenticatorAttachment,
  WebAuthnAbortService,
} from '../utils';
import { createCredential } from './native';

const toPublicKeyCredentialDescriptor = (
  descriptor: PublicKeyCredentialDescriptorJSON,
): PublicKeyCredentialDescriptor => {
  const { id } = descriptor;

  return {
    ...descriptor,
    id: base64URLStringToBuffer(id),
    transports: descriptor.transports as AuthenticatorTransport[],
  };
};

const toPublicKey = (
  request: PublicKeyCredentialCreationOptionsJSON,
): PublicKeyCredentialCreationOptions => ({
  ...request,
  challenge: base64URLStringToBuffer(request.challenge),
  user: {
    ...request.user,
    id: base64URLStringToBuffer(request.user.id),
  },
  excludeCredentials: request.excludeCredentials?.map(
    toPublicKeyCredentialDescriptor,
  ),
});

const toOptions = (
  request: PublicKeyCredentialCreationOptionsJSON,
): CredentialCreationOptions => {
  const publicKey = toPublicKey(request);
  const signal = WebAuthnAbortService.createNewAbortSignal();

  return {
    publicKey,
    signal,
  };
};

const withTransports = (
  response: AuthenticatorAttestationResponseFuture,
): AuthenticatorTransportFuture[] | undefined => {
  if (typeof response.getTransports === 'function') {
    return response.getTransports();
  }

  return undefined;
};

const withResponsePublicKeyAlgorithm = (
  response: AuthenticatorAttestationResponseFuture,
): number | undefined => {
  if (typeof response.getPublicKeyAlgorithm === 'function') {
    return response.getPublicKeyAlgorithm();
  }
};

const withResponsePublicKey = (
  response: AuthenticatorAttestationResponseFuture,
): string | undefined => {
  if (typeof response.getPublicKey === 'function') {
    const publicKey = response.getPublicKey();

    if (publicKey) {
      return bufferToBase64URLString(publicKey);
    }
  }
};

const withResponseAuthenticatorData = (
  response: AuthenticatorAttestationResponseFuture,
): string | undefined => {
  if (typeof response.getAuthenticatorData === 'function') {
    return bufferToBase64URLString(response.getAuthenticatorData());
  }
};

const toResponse = (
  credential: RegistrationCredentialWithResponse,
): RegistrationResponseJSON => {
  const { id, rawId, response, type } = credential;

  return {
    id,
    rawId: bufferToBase64URLString(rawId),
    response: {
      transports: withTransports(response),
      attestationObject: bufferToBase64URLString(response.attestationObject),
      clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
      publicKeyAlgorithm: withResponsePublicKeyAlgorithm(response),
      publicKey: withResponsePublicKey(response),
      authenticatorData: withResponseAuthenticatorData(response),
    },
    type,
    clientExtensionResults: credential.getClientExtensionResults(),
    authenticatorAttachment: toAuthenticatorAttachment(
      credential.authenticatorAttachment,
    ),
  };
};

export const startRegistration = async (
  request: PublicKeyCredentialCreationOptionsJSON,
): Promise<RegistrationResponseJSON> => {
  if (!isSupportedByBrowser()) {
    throw new Error('Browser is not supporting Web Authentication API');
  }

  return (
    createCredential(toOptions(request))
      // .then(addResponseData)
      .then(toResponse)
  );
};
