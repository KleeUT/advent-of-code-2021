import { readFile } from "fs-extra";

export async function read(inputFilePath: string): Promise<string[]> {
  console.log(inputFilePath);
  const raw = (await readFile(inputFilePath, "utf8")).toString().split("\n");
  return raw;
}
