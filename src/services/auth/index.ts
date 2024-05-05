import { post } from "@/lib/rest";
import type {
  FinishLoggingPayload,
  FinishLoggingResponse,
  FinishRegistrationPayload,
  FinishRegistrationResponse,
  StartLoggingPayload,
  StartLoggingResponse,
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

export const startLoginProcess = ({ email }: StartLoggingPayload) =>
  post<StartLoggingResponse>('/passkey/login/begin', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

export const finishLoginProcess = ({ assertion, token }: FinishLoggingPayload) =>
  post<FinishLoggingResponse>('/passkey/login/finish', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...assertion, token })
  });
