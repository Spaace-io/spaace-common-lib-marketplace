/**
 * Adds '0x' prefix to a string if it doesn't already have it
 * @param text The string or array of strings to add '0x' prefix to
 * @returns The string or array with '0x' prefix added
 */
export declare function add0x<T extends string | null | undefined | (string | null | undefined)[]>(text: T): T;
