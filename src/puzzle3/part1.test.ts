import { countPositions, calculateGammaAndEpsilon } from "./part1";

describe("part 1", () => {
  it("should count digits", () => {
    expect(countPositions(["101", "110", "000"])).toEqual([2, 1, 1]);
  });

  it("Should work out string", () => {
    expect(calculateGammaAndEpsilon([2, 1, 1], 3)).toEqual({
      g: "100",
      e: "011",
      gd: 4,
      ed: 3,
    });
  });
});
