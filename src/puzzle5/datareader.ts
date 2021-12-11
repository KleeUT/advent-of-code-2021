import { readFileSync } from "fs-extra";
import path from "path";
import { Line, LineType, Point } from "./types";

function lineType(point1: Point, point2: Point): LineType {
  if (point1.x === point2.x) {
    return LineType.vertical;
  }
  if (point1.y === point2.y) {
    return LineType.horizontal;
  }
  return LineType.diagonal;
}

function pointFromString(str: string): Point {
  const parts = str.split(",");
  if (parts.length !== 2) {
    throw new Error(`Bad formatting on point ${str}`);
  }
  return {
    x: Number(parts[0]),
    y: Number(parts[1]),
  };
}

// /191,147 -> 191,956

function lineFromString(str: string): Line {
  const parts = str.split(" -> ");
  if (parts.length !== 2) {
    throw new Error(`Bad formatting on point ${str}`);
  }
  const point1 = pointFromString(parts[0]);
  const point2 = pointFromString(parts[1]);
  return {
    point1,
    point2,
    type: lineType(point1, point2),
  };
}
export async function readLines(
  filter?: (line: Line) => boolean
): Promise<Line[]> {
  const inputFilePath = path.join(__dirname, "input.txt");
  return read(inputFilePath, filter);
}

export async function readTestLines(
  filter?: (line: Line) => boolean
): Promise<Line[]> {
  const inputFilePath = path.join(__dirname, "testdata.txt");
  return read(inputFilePath, filter);
}

async function read(
  inputFile: string,
  filter?: (line: Line) => boolean
): Promise<Line[]> {
  const inputFilePath = path.join(inputFile);
  console.log(inputFilePath);
  const raw = readFileSync(inputFilePath, "utf8").toString().split("\n");
  const lines = raw.map(lineFromString);
  if (filter) {
    return lines.filter(filter);
  }
  return lines;
}
