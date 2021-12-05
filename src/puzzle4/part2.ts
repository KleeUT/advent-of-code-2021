import { findLosingBingoCard } from "./bingoGame";
import { cards, numbers } from "./input";
// import { cards as cardData, numbers } from "./testInput";

console.table(findLosingBingoCard({ cardData: cards, numbers }));
