import { countOneFourSevenEight } from "./decoder";
import { readTestInput } from "./inputReader";

describe(countOneFourSevenEight, () => {
  it("should find 7 4 3 2", () => {
    expect(countOneFourSevenEight(readTestInput)).resolves.toEqual(26)
  })

})