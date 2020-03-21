const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0) ||
  (typeof value === 'function' && value.length === 0) ||
  (Array.isArray(value) && value.length === 0) ||
  (value instanceof Error && value.message === '');

const isNumeric = value => /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/.test(value);

const NUMERIC_REQUIRED = 'Введіть численне значення';

const validate = ({W, n, N}, errors = {}) => {
  !isNumeric(W) && (errors.W = NUMERIC_REQUIRED);
  !isNumeric(n) && (errors.n = NUMERIC_REQUIRED);
  !isNumeric(N) && (errors.N = NUMERIC_REQUIRED);

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
export default validate;
