export type Results = {
  finalNumber: number;
  cardSum: number;
  total: number;
};
enum Checked {
  no,
  yes,
}

type CardNumber = {
  num: number;
  checked: Checked;
};
type Card = {
  card: CardNumber[][];
  columnMarks: Checked[][];
};

function readData(cards: number[][][]): Card[] {
  return cards.map((card) => {
    return {
      card: card.map((row) =>
        row.map((cell) => ({ num: cell, checked: Checked.no }))
      ),
      columnMarks: card[0].map((_column) => [] as Checked[]),
    };
  });
}

export function getUnmarkedNumbers(card: Card): number[] {
  return card.card
    .reduce((p, c) => [...c.filter((x) => x.checked === Checked.no), ...p], [])
    .flat()
    .map((x) => x.num);
}

function markCard(card: Card, num: number): { card: Card; winning: boolean } {
  let column: number = -1;
  let rowNumber: number = 0;
  for (let row of card.card) {
    let found = row.findIndex((x) => x.num === num);
    if (found !== -1) {
      column = found;
      card.card[rowNumber][found].checked = Checked.yes;
      break;
    }
    rowNumber++;
  }
  if (column < 0) {
    return { card, winning: false };
  }

  card.columnMarks[column].push(Checked.yes);
  const hasWinningColumn = card.columnMarks[column].length === 5;
  const hasWinningRow =
    card.card[rowNumber].filter((x) => x.checked === Checked.yes).length === 5;
  if (hasWinningRow || hasWinningColumn) {
    return {
      card,
      winning: true,
    };
  }
  return { card, winning: false };
}
export function bingoGame({
  cardData,
  numbers,
}: {
  cardData: number[][][];
  numbers: number[];
}): Results {
  let winnerFound = false;
  let finalNumber = 0;
  let winningCard: Card | undefined;

  const cards = readData(cardData);

  for (let index = 0; index < numbers.length && !winnerFound; index++) {
    const numberForRound = numbers[index];
    for (let cardToCheck of cards) {
      const { card, winning } = markCard(cardToCheck, numberForRound);
      if (winning) {
        (winnerFound = true), (finalNumber = numberForRound);
        winningCard = card;
        break;
      }
    }
  }
  if (!winningCard) {
    throw new Error("No winner");
  }

  const unchecked = getUnmarkedNumbers(winningCard);

  const results = {
    finalNumber,
    cardSum: unchecked.reduce((p, c) => p + c, 0),
    total: unchecked.reduce((p, c) => p + c, 0) * finalNumber,
  };

  return results;
}

function playUntilOnlyLosersLeft(
  nonWinningCards: Card[],
  remainingNumbers: number[]
): { card: Card; finalNumber: number } {
  let stillLosing: Card[] = [];
  let lastLoser: Card | null = null;
  const [numberForRound, ...stillMoreNumbers] = remainingNumbers;
  for (let cardToCheck of nonWinningCards) {
    const { card, winning } = markCard(cardToCheck, numberForRound);
    if (!winning) {
      stillLosing.push(card);
    } else {
      lastLoser = card;
    }
  }
  if (stillLosing.length === 0 && !lastLoser) {
    throw new Error("Something has gone wrong ");
  }
  if (stillLosing.length === 0 && lastLoser) {
    return { card: lastLoser, finalNumber: numberForRound };
  }

  console.log(
    `Still going with length ${stillLosing.length} remaining numbers ${stillMoreNumbers.length}`
  );
  return playUntilOnlyLosersLeft(stillLosing, stillMoreNumbers);
}

export function findLosingBingoCard({
  cardData,
  numbers,
}: {
  cardData: number[][][];
  numbers: number[];
}): Results {
  const cards = readData(cardData);
  const result = playUntilOnlyLosersLeft(cards, numbers);

  if (!result.card) {
    throw new Error("No loser");
  }

  const unchecked = getUnmarkedNumbers(result.card);

  const results = {
    finalNumber: result.finalNumber,
    cardSum: unchecked.reduce((p, c) => p + c, 0),
    total: unchecked.reduce((p, c) => p + c, 0) * result.finalNumber,
  };
  return results;
}
