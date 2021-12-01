import { data } from "./input";

const increases = data.reduce((total, current, index, array) => {
  if (index === 0) {
    return total;
  }

  const [prev, first, second, third] = array.slice(index - 1, index + 3);

  if (first && second && third) {
    const thisWindow = first + second + third;
    const lastWindow = prev + first + second;
    return thisWindow > lastWindow ? total + 1 : total;
  }
  return total;
}, 0);
console.log(increases);
