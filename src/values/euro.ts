import { identity, pipe, multiply as multiplyWith } from "ramda";
import { Monad } from "../helpers/monad";
import { twoDecimalsSum, toFixed } from "../helpers/number";

const toDecimal = (euro: Euro) => euro.flatMap(identity);
const sumWith = pipe(toDecimal, twoDecimalsSum);

export const Euro = (context: number) => {
  const { flatMap } = Monad(context);

  const map = (f: (context: number) => number) => Euro(f(context));
  const add = (addedEuro: Euro) => map(sumWith(addedEuro));
  const multiply = (multiplier: number) => map(multiplyWith(multiplier));

  return { add, flatMap, multiply };
};

export type Euro = {
  readonly add: (euro: Euro) => Euro;
  readonly flatMap: <T>(f: (context: number) => T) => T;
  readonly multiply: (n: number) => Euro;
};


const fromEuroToString = (euro: Readonly<Euro>) => euro.flatMap(toFixed(2));
const concatAfterWithEuroSymbol = (s: string): string => s + "€";
const twoAmountsSum = (amount1: Euro, amount2: Euro) => amount1.add(amount2);

export const printEuro = pipe(fromEuroToString, concatAfterWithEuroSymbol);

export const sum = (euros: ReadonlyArray<Euro>) => {
  return euros.reduce(twoAmountsSum, Euro(0))
}