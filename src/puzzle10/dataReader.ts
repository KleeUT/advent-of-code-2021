import { read } from "../fileReader";

export const readData = async (fileName: string): Promise<string[][]> => {
  const raw = await read(fileName);
  const data = raw.map((row) => row.split(""));
  return data;
};
