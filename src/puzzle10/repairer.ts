const closingCharacters = [")", "]", "}", ">"];
const score = (character: string): number => {
  switch (character) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
  }
  console.log("Something went wrong", character);
  throw new Error("Developer mistake scoring");
};

const isPair = (open: string, close: string) => {
  switch (open) {
    case "{":
      return close === "}";
    case "[":
      return close === "]";
    case "(":
      return close === ")";
    case "<":
      return close === ">";
  }
  throw new Error("Developer mistake isPair");
};

const closingCharacterFor = (open: string): string => {
  switch (open) {
    case "{":
      return "}";
    case "[":
      return "]";
    case "(":
      return ")";
    case "<":
      return ">";
  }
  throw new Error("Developer mistake closingCharacter");
};

const isClosingCharacter = (char: string) => closingCharacters.includes(char);
const isOpeningCharacter = (char: string) => !isClosingCharacter(char);

function assess(
  currentOpen: string | null,
  remainingChars: string[],
  openChars: string[]
): string[] | null {
  // remaining chars empty exit condition needed;
  if (remainingChars.length === 0) {
    return [...openChars, currentOpen!].reduceRight(
      (p, c) => [...p, closingCharacterFor(c)],
      [] as string[]
    );
  }
  const [toAsses, ...remaining] = remainingChars;
  if (isOpeningCharacter(toAsses)) {
    const newOpen = currentOpen ? [...openChars, currentOpen] : openChars;
    return assess(toAsses, remaining, newOpen);
  }

  if (currentOpen && isPair(currentOpen, toAsses)) {
    const stillOpen = [...openChars];
    const newOpen = stillOpen.pop() ?? null;
    return assess(newOpen, remaining, stillOpen);
  }
  // it's not an open char and it's not a pair so it's an error
  return null;
}

function charactersToComplete(row: string[]): string[] | null {
  return assess(null, row, []);
}

function calculateScore(closing: string[]): number {
  return closing.reduce((total, character) => {
    let newTotal = total * 5;
    newTotal += score(character);
    return newTotal;
  }, 0);
}

export function repairer(data: string[][]): number {
  const complete = data
    .map(charactersToComplete)
    .filter((x) => x) as string[][];
  console.table(complete);
  const scores = complete.map((row) => ({ row, score: calculateScore(row) }));
  scores.sort((a, b) => (a.score < b.score ? 1 : -1));

  console.table(scores);

  return scores[Math.floor(scores.length / 2)].score;
}
