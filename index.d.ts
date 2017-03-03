export function compactInteger(input: number, decimals?: number): string;
export function intComma(number: number, decimals?: 0): string;
export function fileSize(filesize: number, precision?: number): string;
export function formatNumber(number: number, precision?: number, thousand?: string, decimal?: string): string;
export function toFixed(value: number, precision: number): string;
export function normalizePrecision(value: number, base: number): number;
export function ordinal(value: number): number;
export function times(value: number, overrides?: any): string;
export function pluralize(number: number, singular: string, plural: string): string;
export function truncate(str: string, length?: number, ending?: string): string;
export function truncateWords(string: string, length: number): string;
export function boundedNumber(num: number, bound?: number, ending?: string): string;
export function oxford(items: any[], limit?: number, limitStr?: string): string;
export function dictionary(object: any, joiner?: string, separator?: string): string;
export function frequency(list: any[], verb: any): string;
export function pace(value: number , intervalMs: number, unit?: string): string;
export function nl2br(string: string, replacement?: string): string;
export function br2nl(string: string, replacement?: string): string;
export function capitalize(string: string, downCaseTail?: boolean): string;
export function capitalizeAll(string: string): string;
export function titleCase(string: string): string;

// DEPRECATED - These methods will not be present in the next major version.
// export function intword(number: number, charWidth: number, decimals:? number): string;
// export function intcomma(): string;
// export function filesize(): string;
// export function truncatewords(): string;
// export function truncatenumber(): string;
// export function titlecase(): string;