export const zip = (a: Array<any>, b: Array<any>): Array<any> => {
  const zipped: Array<any> = [];
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    zipped.push([a[i], b[i]]);
  }
  return zipped;
};