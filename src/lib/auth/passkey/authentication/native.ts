import { throwIfFalsy } from "../utils";
import { AuthenticationCredential } from "../types";

export const getCredential = (options: CredentialRequestOptions): Promise<AuthenticationCredential> =>
  navigator.credentials.get(options).then(
    throwIfFalsy<Credential, AuthenticationCredential>('Authentication was not completed')
  )
