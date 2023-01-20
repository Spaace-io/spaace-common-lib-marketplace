export function strip0x(text: string): string;
export function strip0x(text: string | null): string | null;
export function strip0x(text: string[]): string[];
export function strip0x(text: (string | null)[]): (string | null)[];
export function strip0x(
  text: string | null | (string | null)[],
): string | null | (string | null)[] {
  if (Array.isArray(text))
    return text.map<string | null>((elem) => strip0x(elem));

  if (text === null) return null;

  text = text.toLowerCase();
  return text.startsWith('0x') ? text.substring(2) : text;
}
