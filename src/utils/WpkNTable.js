const WpkN = (wReal, wImagine) => ({
  wReal,
  wImagine,
});
const WReal = (p, k, N) => Math.cos((-2 * Math.PI * p * k) / N);
const WImage = (p, k, N) => Math.sin((-2 * Math.PI * p * k) / N);

const makeZero2DArray = N =>
  Array(N)
    .fill(0)
    .map(_ => Array(N).fill(0));

export const WpkNTable = n => {
  const table = makeZero2DArray(n);
  const N = n;
  return {
    get: (p, k) => table[p][k],
    createTable: () => {
      for (let p = 0; p < N; p++) {
        for (let k = 0; k < N; k++) {
          table[p][k] = WpkN(WReal(p, k, N), WImage(p, k, N));
        }
      }
    },
    printTable: () => {
      console.log(table);
    },
  };
};
