import { cards, numbers } from "./input";
import { cards as testCards, numbers as testNumbers } from "./testInput";
describe("stuff", () => {
  test.each([{ sut: numbers }, { sut: testNumbers }])(
    "numbers should have the right shape",
    ({ sut }) => {
      for (let val of sut) {
        expect(typeof val).toEqual("number");
      }
    }
  );
  test.each([
    { sut: cards, len: 100 },
    { sut: testCards, len: 3 },
  ])("cards should had the right shape", ({ sut, len }) => {
    sut.forEach((card) => {
      expect(card.length).toEqual(5);
      card.forEach((row) => {
        expect(row.length).toEqual(5);
        row.forEach((cell) => {
          expect(typeof cell).toEqual("number");
        });
      });
    });
  });
});
