import { pipe } from "ramda";
import { ShowPrintedInvoice } from "../ports.interface";
import { Invoice, printInvoice } from "../values/invoice";

export const createPrintInvoiceOfCart = (showPrintedInvoice: ShowPrintedInvoice) => {
  return pipe(Invoice, printInvoice, showPrintedInvoice);
}

export const printInvoiceOfCart = pipe(Invoice, printInvoice);

export type PrintedInvoice = {
  readonly lotsPrinted: ReadonlyArray<string>;
  readonly totalTaxPrinted: string;
  readonly totalPricePrinted: string;
};
