import path from "path";
import { readData } from "./dataReader";
import { repairer } from "./repairer";

describe(repairer, () => {
  it("Should handle sample data", async () => {
    const data = await readData(path.join(__dirname, "sampleInput.txt"));
    expect(repairer(data)).toEqual(288957);
  });
  it("Should handle real data", async () => {
    const data = await readData(path.join(__dirname, "input.txt"));
    expect(repairer(data)).toEqual(26397);
  });
});
