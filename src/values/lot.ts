import { pipe } from "ramda";
import { Monad } from "../helpers/monad";
import { Euro, sum } from "./euro";
import { getName, getPrice, getTax, Product } from "./product";

type LotContext = {
  readonly product: Product;
  readonly quantity: number;
};
export const Lot = Monad<LotContext>;
export type Lot = ReturnType<typeof Lot>;

const toPriceByQuantity = ({ price, quantity }: PriceAndQuantity) => price.multiply(quantity);
const toPriceAndQuantity = ({ product, quantity }: LotContext) => ({
  price: getPrice(product),
  quantity,
});
const toExcludingTaxLotPrice = pipe(
  toPriceAndQuantity,
  toPriceByQuantity
);

const toTaxByQuantity = ({ tax, quantity }: TaxAndQuantity) => tax.multiply(quantity);
const toTaxAndQuantity = ({ product, quantity }: LotContext) => ({
  tax: getTax(product),
  quantity,
});
const toLotTax = pipe(toTaxAndQuantity, toTaxByQuantity);

const getExcludingTaxLotPriceAndLotTax = (props: LotContext) => [
  toExcludingTaxLotPrice(props),
  toLotTax(props),
];
const toLotIncludingTaxPrice = pipe(getExcludingTaxLotPriceAndLotTax, sum);

const toLotDetails = ({ product, quantity }: LotContext) => ({
  name: getName(product),
  quantity,
  unitPrice: getPrice(product),
  includingTaxPriceByQuantity: toLotIncludingTaxPrice({
    product,
    quantity,
  }),
});

export const getLotTax = (lot: Lot) => lot.flatMap(toLotTax);
export const getLotDetails = (lot: Lot) => lot.flatMap(toLotDetails);
export const getLotIncludingTaxPrice = (lot: Lot) =>
  lot.flatMap(toLotIncludingTaxPrice);

export type LotDetails = ReturnType<typeof toLotDetails>;

type PriceAndQuantity = {
  readonly price: Euro;
  readonly quantity: number;
};

type TaxAndQuantity = {
  readonly tax: Euro;
  readonly quantity: number;
};