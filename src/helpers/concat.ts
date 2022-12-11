const concatBeforeWith = (s1: string) => (s2: string) => s1 + " " + s2;
export const concatBeforeWithTaxAmount = concatBeforeWith("Montant des taxes :");
export const concatBeforeWithTotal = concatBeforeWith("Total :");
export const concatBeforeWithStar = concatBeforeWith("*");

const concatAfterWith = (s1: string) => (s2: string) => s2 + " " + s1;
export const concatAfterWithIncludingTaxSymbol = concatAfterWith("TTC");
