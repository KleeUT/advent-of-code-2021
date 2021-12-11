import { read } from "../fileReader";
import path from "path";

export const readData = async (filePath: string): Promise<number[][]> =>
  (await read(path.join(__dirname, filePath))).map((row) =>
    row.split("").map(Number)
  );
