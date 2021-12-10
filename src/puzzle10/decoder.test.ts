import path from "path";
import { readData } from "./dataReader";
import { decoder } from "./decoder";

describe.skip(decoder, () => {
  it("Should handle sample data", async () => {
    const data = await readData(path.join(__dirname, "sampleInput.txt"));
    expect(decoder(data)).toEqual(26397);
  });
  it("Should handle real data", async () => {
    const data = await readData(path.join(__dirname, "input.txt"));
    expect(decoder(data)).toEqual(26397);
  });
});
