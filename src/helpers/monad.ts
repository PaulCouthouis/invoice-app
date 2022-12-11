export const Monad = <C>(context: C) => {
  const flatMap = <T>(f: (context: C) => T) => f(context);
  return Object.freeze({ flatMap });
};