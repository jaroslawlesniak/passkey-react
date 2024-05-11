import { startAuthentication } from './authentication';
import { startRegistration } from './registration';
import {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from './types';

export const register = (
  options: PublicKeyCredentialCreationOptionsJSON,
): Promise<RegistrationResponseJSON> => startRegistration(options);

export const login = (
  options: PublicKeyCredentialRequestOptionsJSON,
): Promise<AuthenticationResponseJSON> => startAuthentication(options);
