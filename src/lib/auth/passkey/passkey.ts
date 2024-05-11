import {
  startRegistration
} from "@simplewebauthn/browser";
import {
  PublicKeyCredentialCreationOptionsJSON,
} from '@simplewebauthn/types'
import { startAuthentication } from "./authentication";
import { AuthenticationResponseJSON, PublicKeyCredentialRequestOptionsJSON } from "./types";

export const register = (options: PublicKeyCredentialCreationOptionsJSON) =>
  startRegistration(options);

export const login = (options: PublicKeyCredentialRequestOptionsJSON): Promise<AuthenticationResponseJSON> =>
  startAuthentication(options);
