import { bingoGame } from "./bingoGame";
import { cards as cardData, cards, numbers } from "./input";
// import { cards as cardData, numbers } from "./testInput";

console.table(bingoGame({ cardData: cards, numbers }));
