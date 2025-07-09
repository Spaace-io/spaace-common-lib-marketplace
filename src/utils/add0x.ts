/**
 * Adds '0x' prefix to a string if it doesn't already have it
 * @param text The string or array of strings to add '0x' prefix to
 * @returns The string or array with '0x' prefix added
 */
export function add0x<
  T extends string | null | undefined | (string | null | undefined)[],
>(text: T): T {
  if (Array.isArray(text)) {
    return text.map((elem) => add0x(elem)) as T;
  }

  if (text === undefined || text === null) {
    return text;
  }

  return (text.startsWith('0x') ? text : `0x${text}`) as T;
}
