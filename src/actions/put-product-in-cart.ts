import { map, pipe } from "ramda";
import { LoadProduct } from "../ports.interface";
import { Cart } from "../values/cart";
import { Lot } from "../values/lot";

export const createPutProductInCart = (loadProduct: LoadProduct) => {
  const toLots = ({ id, quantity }: ProductPayload) => { 
    return Lot({
      product: loadProduct(id),
      quantity,
    });
  }

  const loadLots = map(toLots)
  const loadCart = pipe(loadLots, Cart)

  return (productsPayload: ReadonlyArray<ProductPayload>) => loadCart(productsPayload);
}

type ProductPayload = {
  readonly id: string;
  readonly quantity: number;
};