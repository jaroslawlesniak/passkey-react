export const isSupportedByBrowser = () =>
  window?.PublicKeyCredential !== undefined && typeof window.PublicKeyCredential === 'function'

export const base64URLStringToBuffer = (base64URLString: string): ArrayBuffer => {
  const base64 = base64URLString.replace(/-/g, '+').replace(/_/g, '/');

  const padLength = (4 - (base64.length % 4)) % 4;
  const padded = base64.padEnd(base64.length + padLength, '=');

  const binary = atob(padded);

  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return buffer;
}

export const bufferToBase64URLString = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let str = '';

  for (const charCode of bytes) {
    str += String.fromCharCode(charCode);
  }

  const base64String = btoa(str);

  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export const rethrow = (err: Error) => {
  throw new Error(err.message);
};

export const throwIfFalsy = <T, Q>(message: string) => (data: T | null): Q => {
  if (data) {
    return data as Q;
  }

  throw new Error(message);
};
