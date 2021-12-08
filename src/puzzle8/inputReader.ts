import { readFileSync } from "fs-extra";
import path from "path";
import { Entry } from "./types";

export async function readInput(
): Promise<Entry[]> {
  const inputFilePath = path.join(__dirname, "input.txt");
  return read(inputFilePath);
}

export async function readTestInput(
): Promise<Entry[]> {
  const inputFilePath = path.join(__dirname, "testdata.txt");
  return read(inputFilePath);
}
export function lineToEntry(line: string): Entry{
  const parts = line.split("|");
  return {
    signalPattern: parts[0].trim().split(" "),
     outputValue: parts[1].trim().split(" ")
  }
}
async function read(
  inputFilePath: string,
): Promise<Entry[]> {
  console.log(inputFilePath);
  const raw = readFileSync(inputFilePath, "utf8").toString().split("\n");
  return raw.map(lineToEntry)
}
