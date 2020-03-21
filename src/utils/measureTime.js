export const withTime = f => (...args) => {
  const t0 = performance.now();
  const [value, tempArr] = f(...args);
  const t1 = performance.now();
  return [value, `${(t1 - t0).toFixed(4)} ms`, tempArr && tempArr];
};
