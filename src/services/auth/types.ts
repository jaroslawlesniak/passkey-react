import { AuthenticationResponseJSON, PublicKeyCredentialCreationOptionsJSON, RegistrationResponseJSON } from "@/lib/auth/passkey";

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
  token: string;
  email: string;
};

export type StartLoggingPayload = {
  email: string;
}

export type StartLoggingResponse = {
  options: PublicKeyCredentialCreationOptionsJSON;
  token: string;
}

export type FinishLoggingPayload = {
  token: string;
  assertion: AuthenticationResponseJSON;
}

export type FinishLoggingResponse = {
  token: string;
  email: string;
};
