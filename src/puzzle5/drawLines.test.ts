import { fstat } from "fs-extra";
import { readLines, readTestLines } from "./datareader";
import { Line, LineType } from "./types";
import path from "path";
import * as fs from "fs-extra";
type Grid = number[][];

function drawHorizontal(line: Line, grid: Grid): Grid {
  const start = Math.min(line.point1.x, line.point2.x);
  const end = Math.max(line.point1.x, line.point2.x);
  const row = grid[line.point1.y] ?? [];
  for (let i = start; i <= end; i++) {
    row[i] = row[i] !== undefined ? row[i] + 1 : 0;
  }
  grid[line.point1.y] = row;
  return grid;
}

function drawVertical(line: Line, grid: Grid): Grid {
  const start = Math.min(line.point1.y, line.point2.y);
  const end = Math.max(line.point1.y, line.point2.y);
  const columnIndex = line.point1.x;

  for (let i = start; i <= end; i++) {
    const row = grid[i] ?? [];
    row[columnIndex] =
      row[columnIndex] !== undefined ? row[columnIndex] + 1 : 0;
    grid[i] = row;
  }

  return grid;
}

function drawLines(input: Line[]): Grid {
  const grid: Grid = [];

  input.forEach((line) => {
    switch (line.type) {
      case LineType.vertical:
        drawVertical(line, grid);
        break;
      case LineType.horizontal:
        drawHorizontal(line, grid);
        break;
    }
  });
  return grid;
}

function sumGrid(grid: Grid): number {
  let sum = 0;
  grid.forEach((row) => {
    row.forEach((cell) => {
      sum += cell ?? 0;
    });
  });
  return sum;
}

function writeToFile(grid: Grid): void {
  const filePath = path.join(__dirname, "out.txt");
  const filledGrid: string[] = [];
  const totalRows = grid.length;
  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const row: number[] = grid[rowIndex] ?? [];
    const filledRow: string[] = [];
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      const cell = row[cellIndex];
      filledRow.push(cell === undefined ? "0" : `${cell + 1}`);
    }
    filledGrid.push(filledRow.join(""));
  }
  fs.writeFileSync(filePath, filledGrid.join("\n"));
}

describe(drawLines, () => {
  it("should work with test data", async () => {
    const lines = await readTestLines(
      (line: Line) => line.type !== LineType.diagonal
    );
    const grid = drawLines(lines);
    // console.table(grid);
    expect(sumGrid(grid)).toEqual(5);
  });

  it("should work with real data", async () => {
    const lines = await readLines(
      (line: Line) => line.type !== LineType.diagonal
    );
    const grid = drawLines(lines);

    expect(sumGrid(grid)).toEqual(5);
  });
});
