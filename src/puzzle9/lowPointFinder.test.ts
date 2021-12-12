import { readDataToArray } from "./dataReader";
import path from "path";

function isLowPoint(row: number, column: number, data: number[][]): boolean {
  const value = data[row][column];
  const rowAbove = data[row - 1];
  const rowBelow = data[row + 1];
  if (rowAbove !== undefined && value >= rowAbove[column]) {
    return false;
  }
  if (rowBelow !== undefined && value >= rowBelow[column]) {
    return false;
  }
  const columnLeft = data[row][column - 1];
  if (columnLeft !== undefined && value >= columnLeft) {
    return false;
  }

  const columnRight = data[row][column + 1];
  if (columnRight === 0) {
    console.log(value, columnRight);
  }
  if (columnRight !== undefined && value >= columnRight) {
    return false;
  }
  return true;
}

function lowPointRiskFinder(data: number[][]): number {
  return data.reduce((total, row, rowindex) => {
    return (
      row.reduce((rowTotal, height, columnIndex) => {
        return isLowPoint(rowindex, columnIndex, data)
          ? height + 1 + rowTotal
          : rowTotal;
      }, 0) + total
    );
  }, 0);
}

describe.skip(lowPointRiskFinder, () => {
  it("works against sample input", async () => {
    expect(
      lowPointRiskFinder(
        await readDataToArray(path.join(__dirname, "sampleInput.txt"))
      )
    ).toEqual(15);
  });
  it("works against sample input", async () => {
    expect(
      lowPointRiskFinder(
        await readDataToArray(path.join(__dirname, "input.txt"))
      )
    ).toEqual(15);
  });
});
