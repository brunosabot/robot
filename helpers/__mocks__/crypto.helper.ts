export function getSalt() {
  return "000000000000000000000000000000000";
}

export function getHashedString(password: string, salt: string) {
  return `${password}:::${salt}`;
}
