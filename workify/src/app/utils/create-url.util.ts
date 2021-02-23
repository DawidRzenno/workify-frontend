export const API_URL = 'http://192.168.1.44:8000/api/v1';

export function appendApiUrl(url: string): string {
  return API_URL + url;
}

