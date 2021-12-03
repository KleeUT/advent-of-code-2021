import { data } from "./input";

let oxygenString = "";

let oxygenRemainingData = [...data];

while (oxygenRemainingData.length > 1) {
  const startsWith = oxygenRemainingData.filter((d) =>
    d.startsWith(oxygenString + "0")
  );
  if (startsWith.length > oxygenRemainingData.length / 2) {
    oxygenString = oxygenString + "0";
    oxygenRemainingData = startsWith;
  } else {
    oxygenString = oxygenString + "1";
    oxygenRemainingData = oxygenRemainingData.filter((x) =>
      x.startsWith(oxygenString)
    );
  }
  console.log(oxygenString);
}
console.log(oxygenString, oxygenRemainingData);

let co2String = "";

let co2RemainingData = [...data];

while (co2RemainingData.length > 1) {
  const startsWith = co2RemainingData.filter((d) =>
    d.startsWith(co2String + "0")
  );
  if (startsWith.length <= co2RemainingData.length / 2) {
    co2String = co2String + "0";
    co2RemainingData = startsWith;
  } else {
    co2String = co2String + "1";
    co2RemainingData = co2RemainingData.filter((x) => x.startsWith(co2String));
  }
  console.log(co2String);
}
console.log(co2String, co2RemainingData);

const co2 = parseInt(co2RemainingData[0], 2);
const o2 = parseInt(oxygenRemainingData[0], 2);

console.log({ o2, co2, total: co2 * o2 });
