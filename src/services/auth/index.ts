import { post } from "@/lib/rest";
import type {
  FinishRegistrationPayload,
  FinishRegistrationResponse,
  StartRegistrationPayload,
  StartRegistrationResponse
} from "./types";

export const startRegistrationProcess = ({ email }: StartRegistrationPayload) =>
  post<StartRegistrationResponse>('/passkey/register/begin', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

export const finishRegistrationProcess = ({ attestation, token }: FinishRegistrationPayload) =>
  post<FinishRegistrationResponse>('/passkey/register/finish', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...attestation, token })
  });