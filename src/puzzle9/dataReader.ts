import { read } from "./fileReader";

export async function readDataToArray(filePath: string): Promise<number[][]> {
  const data = await read(filePath);
  return data.map((line) => line.split("").map(Number));
}
