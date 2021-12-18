import { readGraph } from "./dataReader";
import { countPathsToEnd } from "./pathFinder";

describe.skip(countPathsToEnd, () => {
  test("it should find paths for simple input", async () => {
    expect(await countPathsToEnd(await readGraph("sample.txt"))).toEqual(10);
  });
  test("it should find paths for second sample input", async () => {
    expect(await countPathsToEnd(await readGraph("sample2.txt"))).toEqual(19);
  });
  test("it should find paths for third sample input", async () => {
    expect(await countPathsToEnd(await readGraph("sample3.txt"))).toEqual(226);
  });
  test("it should find paths for real input", async () => {
    expect(await countPathsToEnd(await readGraph("input.txt"))).toEqual(226);
  });
});
