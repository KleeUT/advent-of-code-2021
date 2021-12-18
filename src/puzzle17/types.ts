export type Point = {
  x: number;
  y: number;
};
export type Velocity = {
  x: number;
  y: number;
};
export type Target = {
  topLeft: Point;
  bottomRight: Point;
};

export enum Result {
  unsure = "unsure",
  under = "under",
  over = "over",
  in = "in",
}

export type ResultWithHighestYReached = {
  result: Result;
  y: number;
};
