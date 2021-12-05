import { cards, numbers } from "./testInput";
import { cards as realCards, numbers as realNumbers } from "./input";
import { bingoGame, getUnmarkedNumbers } from "./bingoGame";

describe("bingo game", () => {
  it("Should get results from example", () => {
    expect(bingoGame({ cardData: cards, numbers })).toEqual({
      finalNumber: 24,
      cardSum: 188,
      total: 4512,
    });
  });
  // it("Should get real results", () => {
  //   expect(bingoGame({ cardData: realCards, numbers: realNumbers })).toEqual{
  //     finalNumber: -1,
  //     cardSum: -1,
  //     total: -1,
  //   });
  // });

  it("Should sum a card correctly", () => {
    const input = [
      [
        { num: 22, checked: 0 },
        { num: 13, checked: 0 },
        { num: 17, checked: 1 },
        { num: 11, checked: 1 },
        { num: 0, checked: 1 },
      ],
      [
        { num: 8, checked: 0 },
        { num: 2, checked: 1 },
        { num: 23, checked: 1 },
        { num: 4, checked: 1 },
        { num: 24, checked: 1 },
      ],
      [
        { num: 21, checked: 1 },
        { num: 9, checked: 1 },
        { num: 14, checked: 1 },
        { num: 16, checked: 1 },
        { num: 7, checked: 1 },
      ],
      [
        { num: 6, checked: 0 },
        { num: 10, checked: 1 },
        { num: 3, checked: 0 },
        { num: 18, checked: 0 },
        { num: 5, checked: 1 },
      ],
      [
        { num: 1, checked: 0 },
        { num: 12, checked: 0 },
        { num: 20, checked: 0 },
        { num: 15, checked: 0 },
        { num: 19, checked: 0 },
      ],
    ];

    expect(getUnmarkedNumbers({ card: input, columnMarks: [] })).toEqual([
      1, 12, 20, 15, 19, 6, 3, 18, 8, 22, 13,
    ]);
  });
  it("Should sum a card correctly (horizontal winner)", () => {
    const input = [
      [
        { num: 14, checked: 1 },
        { num: 21, checked: 1 },
        { num: 17, checked: 1 },
        { num: 24, checked: 1 },
        { num: 4, checked: 1 },
      ],
      [
        { num: 10, checked: 0 },
        { num: 16, checked: 0 },
        { num: 15, checked: 0 },
        { num: 9, checked: 1 },
        { num: 19, checked: 0 },
      ],
      [
        { num: 18, checked: 0 },
        { num: 8, checked: 0 },
        { num: 23, checked: 1 },
        { num: 26, checked: 0 },
        { num: 20, checked: 0 },
      ],
      [
        { num: 22, checked: 0 },
        { num: 11, checked: 1 },
        { num: 13, checked: 0 },
        { num: 6, checked: 0 },
        { num: 5, checked: 1 },
      ],
      [
        { num: 2, checked: 1 },
        { num: 0, checked: 1 },
        { num: 12, checked: 0 },
        { num: 3, checked: 0 },
        { num: 7, checked: 1 },
      ],
    ];

    expect(getUnmarkedNumbers({ card: input, columnMarks: [] })).toEqual([
      12, 3, 22, 13, 6, 18, 8, 26, 20, 10, 16, 15, 19,
    ]);
  });
});
