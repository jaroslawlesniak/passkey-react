import { RegistrationResponseJSON, PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types'

export type StartRegistrationPayload = {
  email: string;
}

export type StartRegistrationResponse = {
  options: PublicKeyCredentialCreationOptionsJSON;
  token: string;
}

export type FinishRegistrationPayload = {
  token: string;
  attestation: RegistrationResponseJSON;
}

export type FinishRegistrationResponse = {
  
}
