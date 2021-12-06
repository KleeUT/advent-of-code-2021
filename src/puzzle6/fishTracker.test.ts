import { predictFishNumbers } from "./fishTracker";
describe(predictFishNumbers, () => {
  it("should predict the fish", () => {
    expect(predictFishNumbers([3, 4, 3, 1, 2], 80)).toEqual(5934);
  });
});
