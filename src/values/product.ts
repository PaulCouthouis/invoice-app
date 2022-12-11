import { pick, pipe, prop } from "ramda";
import { Monad } from "../helpers/monad";
import { Euro } from "./euro";

type ProductContext = {
  readonly price: Euro;
  readonly type: Type;
  readonly name: string;
};

export const Product = Monad<ProductContext>
export type Product = ReturnType<typeof Product>

const getTaxPercent = (type: Type) => TAX_PERCENT_BY_TYPE[type]

const toPrice = prop('price')
const toName = prop('name')

const toPriceAndType = pick(["price", "type"])<ProductContext>;
const toPriceAndTaxPercent = ({ price, type }: PriceAndType) => Object.freeze({
  price,
  taxPercent: getTaxPercent(type),
});

const extractTaxFromPrice = ({ price, taxPercent }: PriceAndTaxPercent) => price.multiply(taxPercent)
 
const toTax = pipe(
  toPriceAndType,
  toPriceAndTaxPercent,
  extractTaxFromPrice
);

export const getName = (product: Product) => product.flatMap(toName)
export const getPrice = (product: Product) => product.flatMap(toPrice)
export const getTax = (product: Product) => product.flatMap(toTax)

type Type = keyof typeof TAX_PERCENT_BY_TYPE;
type PriceAndType = ReturnType<typeof toPriceAndType>
type PriceAndTaxPercent = ReturnType<typeof toPriceAndTaxPercent>

const TAX_PERCENT_BY_TYPE = {
  'essential': 0,
  'book': 10 / 100,
  'other': 20 / 100
}