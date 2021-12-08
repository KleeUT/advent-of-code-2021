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

enum DisplayPart {
  rightTop,
  rightBottom,
  bottom,
  leftBottom,
  leftTop,
  top,
  middle,
}

type OuptPossibilities = {
  a: DisplayPart[];
  b: DisplayPart[];
  c: DisplayPart[];
  d: DisplayPart[];
  e: DisplayPart[];
  f: DisplayPart[];
  g: DisplayPart[];
};

function allPossibilities() :Map<string, DisplayPart[]>{
  return new Map([
    ["a", [
    ]],
    ["b", [
    ]],
    ["c", [
    ]],
    ["d", [
    ]],
    ["e", [
    ]],
    ["f", [
    ]],
    ["g", [
    ]],
  ]);
}
function charactersNotInString(superset: string, subset:string):string[]{
 return superset.split("").filter(x => subset.indexOf(x) === -1)
}
function buildTranslationModel(signalPatterns: string[]) {
  const lengthBucket = signalPatterns.reduce((bucket, current) => {
    const c = bucket.get(current.length) || []; 
    c.push(current);
    bucket.set(current.length, c);
    return bucket; 
  }, new Map<number, string[]>())
  const possible = allPossibilities()
  const ones = lengthBucket.get(lengthForA1);
  const fours = lengthBucket.get(lengthForA4);
  const sevens = lengthBucket.get(lengthForA7);
  const eights = lengthBucket.get(lengthForAn8);
  if(ones){
    ones[0]?.split("").forEach(char => {
      possible.set(char, [DisplayPart.rightBottom, DisplayPart.rightTop])
    })
  }
  if(sevens){
    if(ones){
      const top = charactersNotInString(sevens[0], ones[0]);
      possible.set(top[0], [DisplayPart.top]);
      // find the different thats the top 
    }
  }
  if(fours){
    let possibleLeftTopAndMiddle: string[] = [];
    if(ones){
      possibleLeftTopAndMiddle = charactersNotInString(fours[0], ones[0])
    }else if (sevens){
      possibleLeftTopAndMiddle = charactersNotInString(fours[0], sevens[0])
    }
    possibleLeftTopAndMiddle.forEach(char => possible.set(char, []))
  }
}

export async function countOneFourSevenEight(
  inputProvider: () => Promise<Entry[]>
): Promise<number> {
  const input = await inputProvider();
  const desiredLengths = [lengthForA1,lengthForA4, lengthForA7, lengthForAn8];
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
