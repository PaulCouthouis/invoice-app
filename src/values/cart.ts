import { pipe, map } from "ramda";
import { Monad } from "../helpers/monad";
import { sum } from "./euro";
import { getLotTax, getLotDetails, Lot, getLotIncludingTaxPrice } from "./lot";

type CartContext = ReadonlyArray<Lot>;
export const Cart = Monad<CartContext>;
export type Cart = ReturnType<typeof Cart>;

const toAllLotTax = map(getLotTax);
const toAllLotPrice = map(getLotIncludingTaxPrice);
const toAllLotDetails = map(getLotDetails)

const toTaxTotal = pipe(toAllLotTax, sum);
const toPriceTotal = pipe(toAllLotPrice, sum);

export const getTaxTotal = (cart: Cart) => cart.flatMap(toTaxTotal);
export const getPriceTotal = (cart: Cart) => cart.flatMap(toPriceTotal);
export const getAllLotDetails = (cart: Cart) => cart.flatMap(toAllLotDetails);