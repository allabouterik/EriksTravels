export const removeSlashFromEnd = (str) =>
  str.charAt(str.length - 1) === "/" ? str.slice(0, -1) : str;
