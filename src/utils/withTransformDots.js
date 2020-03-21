import {transformDots} from './transformDots';

export const withTransformDots = (f, N) => (...args) => {
  const [fourierReal, fourierImagine, fourierFinal] = f(...args);
  const arg_x = Array(N)
    .fill()
    .map((_, i) => i + 1);
  return [transformDots(arg_x, fourierReal), transformDots(arg_x, fourierImagine), transformDots(arg_x, fourierFinal)];
};
