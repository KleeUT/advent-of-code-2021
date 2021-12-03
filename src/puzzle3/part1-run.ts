import { data } from "./input";
import { calculateGammaAndEpsilon, countPositions } from "./part1";

const positionalData = countPositions(data);
const gande = calculateGammaAndEpsilon(positionalData, data.length);
console.log(gande, gande.ed * gande.gd);
