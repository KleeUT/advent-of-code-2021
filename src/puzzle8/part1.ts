import { countOneFourSevenEight } from "./decoder";
import { readInput } from "./inputReader";

async function run(){
  const count = await countOneFourSevenEight(readInput);
  console.log("the count is ", count);
}