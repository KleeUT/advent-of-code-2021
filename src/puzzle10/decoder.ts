const closingCharacters = [")", "]", "}", ">"];
const score = (character?: string): number => {
  switch (character) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
  }
  console.log("Something went wrong", character);
  return 0;
};

const isPair = (open: string | undefined, close: string) => {
  switch (open) {
    case undefined:
      return false;
    case "{":
      return close === "}";
    case "[":
      return close === "]";
    case "(":
      return close === ")";
    case "<":
      return close === ">";
  }
  return false;
};
const isClosingCharacter = (char: string) => closingCharacters.includes(char);
const isOpeningCharacter = (char: string) => !isClosingCharacter(char);
function findFirstWrongCharacter(line: string[]): string | undefined {
  const openStack: string[] = [];
  let currentOpen: string | undefined;
  let wrong: string | undefined;
  line.forEach((character) => {
    if (isOpeningCharacter(character)) {
      if (currentOpen) {
        openStack.push(currentOpen);
      }
      currentOpen = character;
    } else {
      if (isPair(currentOpen, character)) {
        currentOpen = openStack.pop();
        return;
      }
      if (!wrong) {
        wrong = character;
      }
      return;
    }
  });
  return wrong;
}

export function decoder(data: string[][]) {
  return data
    .map(findFirstWrongCharacter)
    .filter((x) => x)
    .reduce((p, c) => score(c) + p, 0);
}
