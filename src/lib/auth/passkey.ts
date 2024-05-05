import { startRegistration } from "@simplewebauthn/browser";
import { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types'

export const register = (options: PublicKeyCredentialCreationOptionsJSON) => startRegistration(options);