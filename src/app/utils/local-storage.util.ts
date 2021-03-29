export function getParsedFromLocalStorage(key: string): any | null {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : null;
}

export function storeStringifiedInLocalStorage(key: string, object: any): void {
  return localStorage.setItem(key, JSON.stringify(object));
}
