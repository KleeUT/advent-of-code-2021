export enum LineType {
  horizontal,
  vertical,
  diagonal,
}
export type Point = { x: number; y: number };
export type Line = {
  point1: Point;
  point2: Point;
  type: LineType;
};
