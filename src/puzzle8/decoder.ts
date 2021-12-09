import { Entry } from "./types";

const lengthForA0 = 6;
const lengthForA1 = 2;
const lengthForA2 = 5;
const lengthForA3 = 5;
const lengthForA4 = 4;
const lengthForA5 = 5;
const lengthForA6 = 6;
const lengthForA7 = 3;
const lengthForAn8 = 7;
const lengthForA9 = 6;

function allPossibilities(): Map<string, string> {
  return new Map();
}

function charactersNotInString(superset: string, subset: string): string[] {
  return superset.split("").filter((x) => subset.indexOf(x) === -1);
}

function findLeftTopAndMidleCharacters(
  ones?: string[],
  sevens?: string[],
  fours?: string[]
): string[] | undefined {
  let leftTopMiddle: string[] | undefined = undefined;
  if ((ones || sevens) && fours) {
    if (ones) {
      leftTopMiddle = charactersNotInString(fours[0], ones[0]);
    } else if (sevens) {
      leftTopMiddle = charactersNotInString(fours[0], sevens[0]);
    }
  } else {
    console.log(
      `could'nt determine, 4s ${!!fours} ones ${!!ones} sevens ${!!sevens}`
    );
  }
  return leftTopMiddle;
}

function includesAllCharactersOf(str: string): (str: string) => boolean {
  return (other: string) =>
    str
      .split("")
      .reduce((p: boolean, char: string) => other.includes(char) && p, true);
}

function addToMap(
  str: string,
  num: number,
  map: Map<string, number>
): Map<string, number> {
  map.set(str, num);
  return map;
}

function buildTranslationModel(signalPatterns: string[]): void {
  const results = new Map<string, number>();
  const lengthBucket = signalPatterns.reduce((bucket, current) => {
    const c = bucket.get(current.length) || [];
    c.push(current);
    bucket.set(current.length, c);
    return bucket;
  }, new Map<number, string[]>());

  const ones = lengthBucket.get(lengthForA1);
  const hasOnes = !!ones;
  let oneString: string;
  if (hasOnes) {
    oneString = ones[0];
    addToMap(oneString, 1, results);
  }

  const fours = lengthBucket.get(lengthForA4);
  let fourString: string;
  const hasFours = !!fours;
  if (hasFours) {
    fourString = fours[0];
    addToMap(fourString, 4, results);
  }
  const sevens = lengthBucket.get(lengthForA7);
  let sevenString: string;
  const hasSevens = !!sevens;
  if (hasSevens) {
    sevenString = sevens[0];
    addToMap(sevenString, 4, results);
  }
  const eights = lengthBucket.get(lengthForAn8);
  let eightString: string;
  const hasEights = !!eights;
  if (hasEights) {
    eightString = eights[0];
    addToMap(eightString, 4, results);
  }

  let leftTopMiddle = findLeftTopAndMidleCharacters(ones, sevens, fours);
  let fives: string[] | undefined = [];
  let twos: string[] | undefined = [];

  if (leftTopMiddle) {
    const known = leftTopMiddle[1];
    fives = lengthBucket
      .get(lengthForA5)
      ?.filter((x) => x.includes(known[0]) && x.includes(known));
    const valueToLookFor = hasSevens
      ? sevens[0]
      : hasOnes
      ? ones[0]
      : undefined;
    if (valueToLookFor) {
      twos = lengthBucket
        .get(lengthForA2)
        ?.filter(
          (x) =>
            !x.includes(known[0]) &&
            x.includes(known) &&
            charactersNotInString(valueToLookFor, x).length === 1
        );
    }
  }

  let threes: string[] | undefined;
  if (ones || sevens) {
    const valueToLookFor = sevens ? sevens[0] : ones ? ones[0] : "wont find me";
    threes = lengthBucket
      .get(lengthForA3)
      ?.filter((x) => charactersNotInString(valueToLookFor, x).length == 0);
  }
}

export async function countOneFourSevenEight(
  inputProvider: () => Promise<Entry[]>
): Promise<number> {
  const input = await inputProvider();
  const desiredLengths = [lengthForA1, lengthForA4, lengthForA7, lengthForAn8];
  const oneFourSevenEight = input
    .flatMap((x) => x.outputValue)
    .filter((x) => desiredLengths.includes(x.length));
  console.log(oneFourSevenEight, oneFourSevenEight.length);
  return oneFourSevenEight.length;
}

export async function interpretInput(
  inputProvider: () => Promise<Entry[]>
): Promise<number> {
  // find the known letter positions
  // find a 1
  const input = await inputProvider();

  return 7;
}
