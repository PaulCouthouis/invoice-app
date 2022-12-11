import { add, pipe } from "ramda";

export const toFixed = (digits: number) => (n: number) => n.toFixed(digits);
const toNumber = (s: string) => Number(s);

// fix javascript decimal addition (0.1 + 0.2 !== 0.299999999)
const toTwoDecimalDigitNumber = pipe(toFixed(2), toNumber);

export const twoDecimalsSum = (a: number) => pipe(add(a), toTwoDecimalDigitNumber);