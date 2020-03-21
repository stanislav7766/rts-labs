export const transformDots = (arr_x, arr_y) => arr_x.reduce((acc, el, i) => [...acc, {name: el, value: arr_y[i]}], []);
