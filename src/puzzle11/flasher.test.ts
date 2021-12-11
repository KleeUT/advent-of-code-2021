import { readData } from "./dataReader";

type Grid = number[][];
type Point = { row: number; column: number };

function neighbourPoints(point: Point): Point[] {
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
      column: point.column,
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
  ];
}

function updateForPoints(points: Point[], grid: Grid): Grid {
  const newGrid = [...grid];
  points
    .filter(
      (p) =>
        p.row < grid.length &&
        p.row >= 0 &&
        p.column < grid[0].length &&
        p.column >= 0
    )
    .forEach((point) => {
      const newRow = [...grid[point.row]];
      newRow[point.column] += 1;
      newGrid[point.row] = newRow;
    });
  return newGrid;
}

function flashOneOctopus(
  octopi: Point[],
  grid: Grid,
  totalFlashes: number
): { grid: Grid; totalFlashes: number } {
  if (octopi.length === 0) {
    return { grid, totalFlashes };
  }
  const [thisOne, ...remaining] = octopi;
  const neighbours = neighbourPoints(thisOne);
  const updatedGrid = updateForPoints(neighbours, grid);
  const willNowFlash = neighbours.filter(
    (p) =>
      p.row < grid.length &&
      p.row >= 0 &&
      p.column < grid[0].length &&
      p.column >= 0 &&
      updatedGrid[p.row][p.column] === 10
  );
  return flashOneOctopus(
    [...remaining, ...willNowFlash],
    updatedGrid,
    totalFlashes + 1
  );
}

function flashWholeGrid(
  grid: Grid,
  stepsRemaining: number,
  totalFlashes: number
): { grid: Grid; totalFlashes: number } {
  if (stepsRemaining === 0) {
    return { grid, totalFlashes };
  }
  const all = grid
    .map((row, rowIndex) =>
      row.map((_column, columIndex) => ({ row: rowIndex, column: columIndex }))
    )
    .flat();
  const { grid: updatedGrid, totalFlashes: updatedFlashes } = flashOneOctopus(
    all,
    grid,
    totalFlashes
  );
  const resetGrid = updatedGrid.map((row) =>
    row.map((cell) => {
      if (cell > 9) {
        return 0;
      } else {
        return cell;
      }
    })
  );
  console.log(`step ${stepsRemaining}, total ${updatedFlashes}`);
  console.table(resetGrid);
  return flashWholeGrid(resetGrid, stepsRemaining - 1, updatedFlashes);
}

function flash(grid: Grid, steps: number): number {
  const { totalFlashes } = flashWholeGrid(grid, steps, 0);
  return totalFlashes;
}

describe.skip(flashWholeGrid, () => {
  it("should work with sample data", async () => {
    const grid = await readData("sampleInput.txt");
    console.table(grid);
    expect(flash(grid, 3)).toEqual(1656);
  });
});
