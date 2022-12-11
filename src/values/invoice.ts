import { map, pipe, toString } from "ramda";
import { concatAfterWithIncludingTaxSymbol, concatBeforeWithStar, concatBeforeWithTaxAmount, concatBeforeWithTotal } from "../helpers/concat";
import { Monad } from "../helpers/monad";
import { Cart, getPriceTotal, getTaxTotal, getAllLotDetails } from "./cart";
import { printEuro } from "./euro"
import { LotDetails } from "./lot";

export const Invoice = Monad<Cart>
export type Invoice = ReturnType<typeof Invoice>

const printLotDetails = ({ quantity, name, unitPrice, includingTaxPriceByQuantity }: Readonly<LotDetails>) => 
  toString(quantity) + 
  ' ' +
  name +
  ' à ' + 
  printEuro(unitPrice) + 
  ' : ' + 
  printEuro(includingTaxPriceByQuantity)

const printLot = pipe(
  printLotDetails,
  concatBeforeWithStar,
  concatAfterWithIncludingTaxSymbol
);

const getAllLotPrinted = map(printLot);
const printLots = pipe(getAllLotDetails, getAllLotPrinted);

const printPriceTotal = pipe(
  getPriceTotal,
  printEuro,
  concatBeforeWithTotal
);

const printTaxTotal = pipe(getTaxTotal, printEuro, concatBeforeWithTaxAmount);

const toPrinted = (cart: Cart) => ({
  lotsPrinted: printLots(cart),
  totalTaxPrinted: printTaxTotal(cart),
  totalPricePrinted: printPriceTotal(cart),
});

export const printInvoice = (invoice: Invoice) => invoice.flatMap(toPrinted);