export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lettersOnly(str) {
  return str.replace(/[^a-zA-Z]/g, "");
}
