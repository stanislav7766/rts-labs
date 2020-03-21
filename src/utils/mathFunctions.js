const calcSumArr = arr => arr.reduce((acc, el) => (acc += el), 0);
const calcSignal = (t, w, ampl, phi) => Math.sin(w * t + phi) * ampl;
export const correlationStabilizer = (arr, max = Math.max(...arr), min = Math.min(...arr)) =>
  arr.map(el => (-1 < el && el < 1 ? el : el > 1 ? el * (1 / max) : el * (-1 / min)));

export const makeZero = (val, arr, len = arr.length) =>
  val ? arr.map((el, i) => (i < len / 2 ? el : 0)) : arr.map((el, i) => (i < len / 2 ? 0 : el));
export const makeSignal = ({N, n, phi, amplitude}) =>
  Array(N)
    .fill()
    .map((_, i) => {
      const tempArr = Array(n)
        .fill()
        .map((_, j) => calcSignal(i, (j * N) / n, amplitude, phi));
      return calcSumArr(tempArr);
    });
export const calcExpected = (arr_y, N) => [calcSumArr(arr_y) / N];

export const calcDispersion = (expected, arr_y, N) => {
  const tempArr = arr_y.map(el => (el - expected) ** 2);
  return [calcSumArr(tempArr) / (N - 1)];
};
export const calcCorrelation = (t_arr, tau_arr, {mx, my}, N) => {
  const tempArr = Array(N)
    .fill()
    .map((_, i) => (t_arr[i] - mx) * (tau_arr[i] - my));
  return [calcSumArr(tempArr) / (N - 1), tempArr];
};

export const calcDft = x => {
  const N = x.length;
  const fourierReal = Array(N).fill(0);
  const fourierImagine = Array(N).fill(0);
  const fourierFinal = Array(N).fill(0);

  for (let p = 0; p < N; p++) {
    for (let k = 0; k < N; k++) {
      fourierReal[p] += x[k] * Math.cos((-2 * Math.PI * p * k) / N);
      fourierImagine[p] += x[k] * Math.sin((-2 * Math.PI * p * k) / N);
    }
    fourierFinal[p] = Math.sqrt(fourierReal[p] ** 2 + fourierImagine[p] ** 2);
  }

  return [fourierReal, fourierImagine, fourierFinal];
};

export const calcFft = x => {
  const N = x.length;
  const NN = Math.round(x.length / 2 - 1);
  const freal11 = Array(NN).fill(0);
  const freal12 = Array(NN).fill(0);
  const fimage11 = Array(NN).fill(0);
  const fimage12 = Array(NN).fill(0);

  const fourierReal = Array(N).fill(0);
  const fourierImagine = Array(N).fill(0);
  const fourierFinal = Array(N).fill(0);

  for (let p = 0; p < NN; p++) {
    for (let m = 0; m < NN; m++) {
      freal11[p] += x[2 * m + 1] * Math.cos(((4 * Math.PI) / N) * p * m);
      fimage11[p] += x[2 * m + 1] * Math.sin(((4 * Math.PI) / N) * p * m);
      freal12[p] += x[2 * m] * Math.cos(((4 * Math.PI) / N) * p * m);
      fimage12[p] += x[2 * m] * Math.sin(((4 * Math.PI) / N) * p * m);
    }

    fourierReal[p] =
      freal12[p] + freal11[p] * Math.cos(((2 * Math.PI) / N) * p) - fimage11[p] * Math.sin(((2 * Math.PI) / N) * p);

    fourierImagine[p] =
      fimage12[p] + fimage11[p] * Math.cos(((2 * Math.PI) / N) * p) + freal11[p] * Math.sin(((2 * Math.PI) / N) * p);

    fourierReal[p + NN] =
      freal12[p] - (freal11[p] * Math.cos(((2 * Math.PI) / N) * p) - fimage11[p] * Math.sin(((2 * Math.PI) / N) * p));

    fourierImagine[p + NN] =
      fimage12[p] - (fimage11[p] * Math.cos(((2 * Math.PI) / N) * p) + freal11[p] * Math.sin(((2 * Math.PI) / N) * p));
    fourierFinal[p] = (fourierReal[p] ** 2 + fourierImagine[p] ** 2) ** 0.5;
    fourierFinal[p + NN] = (fourierReal[p + NN] ** 2 + fourierImagine[p + NN] ** 2) ** 0.5;
  }

  return [fourierReal, fourierImagine, fourierFinal];
};
