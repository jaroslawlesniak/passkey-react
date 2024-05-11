import { throwIfFalsy } from "../utils";
import { AuthenticationCredential } from "../types";

class BaseWebAuthnAbortService {
  private controller: AbortController | undefined;

  createNewAbortSignal() {
    if (this.controller) {
      const abortError = new Error(
        'Cancelling existing WebAuthn API call for new one',
      );
      abortError.name = 'AbortError';
      this.controller.abort(abortError);
    }

    const newController = new AbortController();

    this.controller = newController;
    return newController.signal;
  }

  cancelCeremony() {
    if (this.controller) {
      const abortError = new Error(
        'Manually cancelling existing WebAuthn API call',
      );
      abortError.name = 'AbortError';
      this.controller.abort(abortError);

      this.controller = undefined;
    }
  }
}

export const WebAuthnAbortService = new BaseWebAuthnAbortService();

export const getCredential = (options: CredentialRequestOptions): Promise<AuthenticationCredential> =>
  navigator.credentials.get(options).then(
    throwIfFalsy<Credential, AuthenticationCredential>('Authentication was not completed')
  )
