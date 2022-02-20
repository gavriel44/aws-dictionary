export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lettersOnly(str: string): string {
  return str.replace(/[^a-zA-Z]/g, "");
}
