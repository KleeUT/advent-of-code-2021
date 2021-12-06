import {
  doPerpendicularLinesIntersect,
  findParallelLineOverlaps,
  findPerpendicularIntersections,
} from "./lineWorker";
import { Line, LineType } from "./types";

describe("line intersection", () => {
  test.each([
    {
      hor: {
        point1: { x: 1, y: 1 },
        point2: { x: 3, y: 1 },
        type: LineType.horizontal,
      },
      vert: {
        point1: { x: 2, y: 0 },
        point2: { x: 2, y: 3 },
        type: LineType.vertical,
      },
      overlap: true,
    },
    {
      hor: {
        point1: { x: 1, y: 1 },
        point2: { x: 3, y: 1 },
        type: LineType.horizontal,
      },
      vert: {
        point1: { x: 2, y: 0 },
        point2: { x: 2, y: 3 },
        type: LineType.vertical,
      },
      overlap: true,
    },
    {
      hor: {
        point1: { x: 1, y: 1 },
        point2: { x: 3, y: 1 },
        type: LineType.horizontal,
      },
      vert: {
        point1: { x: 7, y: 0 },
        point2: { x: 7, y: 3 },
        type: LineType.vertical,
      },
      overlap: false,
    },
    {
      hor: {
        point1: { x: 1, y: 1 },
        point2: { x: 3, y: 1 },
        type: LineType.horizontal,
      },
      vert: {
        point1: { x: 2, y: 2 },
        point2: { x: 2, y: 5 },
        type: LineType.vertical,
      },
      overlap: false,
    },
    {
      hor: {
        point1: { x: 1, y: 1 },
        point2: { x: 3, y: 1 },
        type: LineType.horizontal,
      },
      vert: {
        point1: { x: 2, y: 0 },
        point2: { x: 2, y: 1 },
        type: LineType.vertical,
      },
      overlap: true,
    },
    {
      hor: {
        point1: { x: 403, y: 976 },
        point2: { x: 575, y: 976 },
        type: LineType.horizontal,
      },
      vert: {
        point1: { x: 423, y: 970 },
        point2: { x: 423, y: 980 },
        type: LineType.vertical,
      },
      overlap: true,
    },
    {
      hor: {
        point1: { x: 20, y: 10 },
        point2: { x: 30, y: 10 },
        type: LineType.horizontal,
      },
      vert: {
        point1: { x: 23, y: 6 },
        point2: { x: 23, y: 12 },
        type: LineType.vertical,
      },
      overlap: true,
    },
    {
      hor: {
        point1: { x: 9, y: 4 },
        point2: { x: 3, y: 4 },
        type: LineType.horizontal,
      },
      vert: {
        point1: { x: 7, y: 0 },
        point2: { x: 7, y: 4 },
        type: LineType.vertical,
      },
      overlap: true,
    },
  ])("$hor $ver shouldOverlap $shouldOverlap", ({ hor, vert, overlap }) => {
    expect(doPerpendicularLinesIntersect(hor, vert)).toEqual(overlap);
  });
});

describe(findPerpendicularIntersections, () => {
  it("should find intersections", () => {
    const horizontal: Line[] = [
      {
        point1: { x: 1, y: 1 },
        point2: { x: 3, y: 1 },
        type: LineType.horizontal,
      },
    ];
    const vertical: Line[] = [
      {
        point1: { x: 2, y: 0 },
        point2: { x: 2, y: 1 },
        type: LineType.vertical,
      },
    ];
    expect(findPerpendicularIntersections(horizontal, vertical)).toEqual(1);
  });
});

describe(findParallelLineOverlaps, () => {
  test.each([
    {
      lines: [
        { point1: 10, point2: 15 },
        {
          point1: 11,
          point2: 16,
        },
      ],
      overlaps: 5,
    },
    {
      lines: [
        { point1: 10, point2: 15 },
        {
          point1: 121,
          point2: 126,
        },
      ],
      overlaps: 0,
    },
    {
      lines: [
        { point1: 0, point2: 5 },
        { point1: 9, point2: 3 },
        { point1: 0, point2: 2 },
        { point1: 3, point2: 1 },
      ],
    },
  ])("find overlap", ({ lines, overlaps }) => {
    expect(findParallelLineOverlaps(lines)).toEqual(overlaps);
  });
});
