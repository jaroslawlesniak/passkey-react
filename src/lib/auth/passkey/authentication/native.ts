import { AuthenticationCredential } from "../types";
import { throwIfFalsy } from "../utils";

export const getCredential = (options: CredentialRequestOptions): Promise<AuthenticationCredential> =>
  navigator.credentials.get(options).then(
    throwIfFalsy<Credential, AuthenticationCredential>('Authentication was not completed')
  )
