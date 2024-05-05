export const post = <T>(url: string, { body, headers }: RequestInit): Promise<T> =>
  fetch(`${process.env.VITE_API_URL}${url}`, { method: 'POST', body, headers })
    .then(response => response.json() as T);
