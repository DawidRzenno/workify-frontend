// Usage: randomDate(new Date(2012, 0, 1), new Date());
export function randomDate(): Date {
  return (new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)));
}

