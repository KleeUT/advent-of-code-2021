import { data } from "./input";

const increases = data.reduce(
  (p, c, i, arr) => (c > arr[i - 1] ? p + 1 : p),
  0
);
console.log(increases);
