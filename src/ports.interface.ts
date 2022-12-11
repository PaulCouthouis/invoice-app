/* eslint-disable functional/no-return-void */

import { PrintedInvoice } from "./actions/print-invoice-of-cart";
import { Product } from "./values/product";

export type LoadProduct = (productId: string) => Product;
export type ShowPrintedInvoice = (printedInvoice: PrintedInvoice) => void