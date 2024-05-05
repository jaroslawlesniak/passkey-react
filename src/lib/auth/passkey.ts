import {
  startAuthentication,
  startRegistration
} from "@simplewebauthn/browser";
import {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON
} from '@simplewebauthn/types'

export const register = (options: PublicKeyCredentialCreationOptionsJSON) =>
  startRegistration(options);

export const authenticate = (options: PublicKeyCredentialRequestOptionsJSON) =>
  startAuthentication(options);
