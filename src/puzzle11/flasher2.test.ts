import { readData } from "./dataReader";

type Grid = number[][];
type Point = { row: number; column: number };

function neighbourPoints(point: Point, grid: Grid): Point[] {
  const above = point.row - 1;
  const below = point.row + 1;
  const left = point.column - 1;
  const right = point.column + 1;
  return [
    {
      row: above,
      column: left,
    },
    {
      row: above,
      column: point.column,
    },
    {
      row: above,
      column: right,
    },
    {
      row: point.row,
      column: left,
    },
    {
      row: point.row,
      column: right,
    },
    {
      row: below,
      column: left,
    },
    {
      row: below,
      column: point.column,
    },
    {
      row: below,
      column: right,
    },
  ].filter(
    (point) =>
      point.row >= 0 &&
      point.column >= 0 &&
      point.row < grid.length &&
      point.column < grid[0].length
  );
}

function incrementGrid(grid: Grid): Grid {
  return grid.map((row) => row.map((cell) => cell + 1));
}

function normaliseGrid(grid: Grid): Grid {
  return grid.map((row) => row.map((cell) => (cell > 9 ? 0 : cell)));
}

function findOctopiThatWillFlash(grid: Grid): Point[] {
  return grid.reduce((willFlash, octoRow, row) => {
    const toFlashThisRow = octoRow.reduce((willFlash, octo, column) => {
      if (octo === 10) {
        return [...willFlash, { row, column }];
      }
      return willFlash;
    }, [] as Point[]);
    return [...willFlash, ...toFlashThisRow];
  }, [] as Point[]);
}
function flash(startingGrid: Grid, steps: number): number {
  let flashes = 0;
  let grid = startingGrid;
  for (let step = 0; step < steps; step++) {
    const postStepIncrementedGrid = incrementGrid(grid);
    let pointsToAction: Point[] = findOctopiThatWillFlash(
      postStepIncrementedGrid
    );
    while (pointsToAction.length > 0) {
      const point = pointsToAction.pop();
      const neighbours = neighbourPoints(point!, postStepIncrementedGrid);
      neighbours.forEach((n) => {
        postStepIncrementedGrid[n.row][n.column]++;
        if (postStepIncrementedGrid[n.row][n.column] === 10) {
          pointsToAction.push(n);
        }
      });
      flashes++;
    }
    grid = normaliseGrid(postStepIncrementedGrid);
  }
  return flashes;
}

describe.skip(flash, () => {
  it("should work with sample data", async () => {
    const grid = await readData("sampleInput.txt");
    expect(flash(grid, 100)).toEqual(1656);
  });
  it("should work with real data", async () => {
    const grid = await readData("input.txt");
    expect(flash(grid, 100)).toEqual(1656);
  });
});
