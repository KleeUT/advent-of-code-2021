import { readGraph } from "./dataReader";
import { countPathsToEnd, aggregateVisits, findToVisit } from "./pathFinder2";
import { NodeType } from "./types";

describe(countPathsToEnd, () => {
  it("it should find paths for simple input", async () => {
    expect(await countPathsToEnd(await readGraph("sample.txt"))).toEqual(36);
  });
  it("it should find paths for second sample input", async () => {
    expect(await countPathsToEnd(await readGraph("sample2.txt"))).toEqual(103);
  });
  it("it should find paths for third sample input", async () => {
    expect(await countPathsToEnd(await readGraph("sample3.txt"))).toEqual(3509);
  });
  test("it should find paths for real input", async () => {
    expect(await countPathsToEnd(await readGraph("input.txt"))).toEqual(226);
  });
});
describe.skip(aggregateVisits, () => {
  it("should count", () => {
    const nodes = [
      { name: "start" },
      { name: "dc" },
      { name: "kj" },
      { name: "dc" },
      { name: "kj" },
      { name: "HN" },
      { name: "end" },
    ];
    expect(aggregateVisits(nodes)).toEqual({
      start: 1,
      dc: 2,
      kj: 2,
      HN: 1,
      end: 1,
    });
  });
});

describe(findToVisit, () => {
  test.each([
    {
      connected: [
        { name: "start", connected: [], type: NodeType.start },
        { name: "dc", connected: [], type: NodeType.small },
        { name: "kj", connected: [], type: NodeType.small },
        { name: "HN", connected: [], type: NodeType.large },
        { name: "end", connected: [], type: NodeType.end },
      ],
      aggregated: {
        start: 1,
        dc: 2,
        kj: 2,
      },
      expected: [
        { name: "HN", connected: [], type: NodeType.large },
        { name: "end", connected: [], type: NodeType.end },
      ],
    },
    {
      connected: [
        { name: "start", connected: [], type: NodeType.start },
        { name: "dc", connected: [], type: NodeType.small },
        { name: "kj", connected: [], type: NodeType.small },
        { name: "HN", connected: [], type: NodeType.large },
        { name: "end", connected: [], type: NodeType.end },
      ],
      aggregated: {
        start: 1,
        dc: 2,
        kj: 1,
      },
      expected: [
        { name: "HN", connected: [], type: NodeType.large },
        { name: "end", connected: [], type: NodeType.end },
      ],
    },
    {
      connected: [
        { name: "start", connected: [], type: NodeType.start },
        { name: "dc", connected: [], type: NodeType.small },
        { name: "kj", connected: [], type: NodeType.small },
        { name: "HN", connected: [], type: NodeType.large },
        { name: "end", connected: [], type: NodeType.end },
      ],
      aggregated: {
        start: 1,
        dc: 1,
        kj: 1,
      },
      expected: [
        { name: "dc", connected: [], type: NodeType.small },
        { name: "kj", connected: [], type: NodeType.small },
        { name: "HN", connected: [], type: NodeType.large },
        { name: "end", connected: [], type: NodeType.end },
      ],
    },
    {
      connected: [
        { name: "end", connected: [], type: NodeType.end },
        { name: "start", connected: [], type: NodeType.start },
        { name: "kj", connected: [], type: NodeType.small },
        { name: "HN", connected: [], type: NodeType.large },
        { name: "LN", connected: [], type: NodeType.large },
      ],
      aggregated: {
        start: 1,
        dc: 1,
        kj: 1,
      },
      expected: [
        { name: "kj", connected: [], type: NodeType.small },
        { name: "HN", connected: [], type: NodeType.large },
        { name: "LN", connected: [], type: NodeType.large },
        { name: "end", connected: [], type: NodeType.end },
      ],
    },
  ])("should find next caves", ({ connected, aggregated, expected }) => {
    expect(findToVisit(connected, aggregated)).toEqual(
      expect.arrayContaining(expected)
    );
  });
});
// 238   │ 'start' │ 'dc' │ 'kj'  │ 'dc'  │ 'kj'  │ 'HN'  │ 'end' │
