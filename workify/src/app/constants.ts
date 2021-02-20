export const SERVER_URL = 'http://192.168.1.44:8000/api/v1';

export function createUrl(url: string): string {
  return SERVER_URL + url;
}

