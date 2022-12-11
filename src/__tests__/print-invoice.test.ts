import { describe, expect, it } from "vitest";
import { createPrintInvoiceOfCart, PrintedInvoice } from "../actions/print-invoice-of-cart";
import { createPutProductInCart } from "../actions/put-product-in-cart";
import { Cart } from "../values/cart";
import { Euro } from "../values/euro";
import { Product } from "../values/product";

describe('Story: Print Invoice', () => {
  it('Example 1', () => {
    /*
      * 1 jeu(x) Switch à 49.99€ : 59.99€ TTC
      * 3 boite(s) de chocolat à 12.98€ : 38.94€ TTC
      * 2 livre(s) à 15.55€ : 34.21€ TTC
      
      Montant des taxes : 13.11€
      Total : 133.14€
    */

    const steps = Steps();

    steps.givenCart([
      { name: "jeu(x) Switch", quantity: 1 },
      { name: "boite(s) de chocolat", quantity: 3 },
      { name: "livre(s)", quantity: 2 },
    ]);

    steps.whenCashierPrintInvoiceForNextCart();

    steps.thenPrintedInvoiceIs({
      lotsPrinted: [
        "* 1 jeu(x) Switch à 49.99€ : 59.99€ TTC",
        "* 3 boite(s) de chocolat à 12.98€ : 38.94€ TTC",
        "* 2 livre(s) à 15.55€ : 34.21€ TTC",
      ],
      totalTaxPrinted: "Montant des taxes : 13.11€",
      totalPricePrinted: "Total : 133.14€",
    });
  })

  it('Example 2', () => {
    /*
      * 2 médicament(s) à 4.00€ : 8.00€ TTC
      * 1 jouet(s) à 27.55€ : 33.06€ TTC
      * 1 DVD à 14.99€ : 17.99€ TTC
      
      Montant des taxes : 8.51€
      Total : 59.05€
    */

    const steps = Steps();

    steps.givenCart([
      { name: "médicament(s)", quantity: 2 },
      { name: "jouet(s)", quantity: 1 },
      { name: "DVD", quantity: 1 },
    ]);

    steps.whenCashierPrintInvoiceForNextCart();

    steps.thenPrintedInvoiceIs({
      lotsPrinted: [
        "* 2 médicament(s) à 4.00€ : 8.00€ TTC",
        "* 1 jouet(s) à 27.55€ : 33.06€ TTC",
        "* 1 DVD à 14.99€ : 17.99€ TTC",
      ],
      totalTaxPrinted: "Montant des taxes : 8.51€",
      totalPricePrinted: "Total : 59.05€",
    });
  })
})

const Steps = () => {
  let printedInvoice: PrintedInvoice;
  let currentCart: Cart

  const fakeLoadProduct = (id: string) =>
    FAKE_PRODUCTS[id as keyof typeof FAKE_PRODUCTS];

  const fakeShowPrintedInvoice = (newPrintedInvoice: PrintedInvoice) => {
    printedInvoice = newPrintedInvoice
  }

  const putProductInCart = createPutProductInCart(fakeLoadProduct);
  const printInvoiceOfCart = createPrintInvoiceOfCart(fakeShowPrintedInvoice);

  const givenCart = (
    initiedProduct: Array<{
      name: string;
      quantity: number;
    }>
  ) => {
    currentCart = putProductInCart(
      initiedProduct.map(({ name, quantity }) => ({ id: name, quantity }))
    );
  };

  const whenCashierPrintInvoiceForNextCart = () => {
    printInvoiceOfCart(currentCart);
  };

  const thenPrintedInvoiceIs = (expectedPrintedInvoice: PrintedInvoice) => {
    expect(printedInvoice).toEqual(expectedPrintedInvoice);
  };

  return {
    givenCart,
    whenCashierPrintInvoiceForNextCart,
    thenPrintedInvoiceIs,
  };
};

const FAKE_PRODUCTS = {
  "jeu(x) Switch": Product({
    price: Euro(49.99),
    type: "other",
    name: "jeu(x) Switch",
  }),
  "livre(s)": Product({ price: Euro(15.55), type: "book", name: "livre(s)" }),
  "boite(s) de chocolat": Product({
    price: Euro(12.98),
    type: "essential",
    name: "boite(s) de chocolat",
  }),
  "médicament(s)": Product({
    price: Euro(4.0),
    type: "essential",
    name: "médicament(s)",
  }),
  "jouet(s)": Product({
    price: Euro(27.55),
    type: "other",
    name: "jouet(s)",
  }),
  DVD: Product({
    price: Euro(14.99),
    type: "other",
    name: "DVD",
  }),
};

