import { RegistrationCredential } from "../types";
import { throwIfFalsy } from "../utils";

export const createCredential = (options: CredentialCreationOptions): Promise<RegistrationCredential> =>
  navigator.credentials.create(options).then(
    throwIfFalsy<Credential, RegistrationCredential>('Authentication was not completed')
  );
