import { Point, Velocity } from "./types";

export function point(x: number, y: number): Point {
  return { x, y };
}
export function velocity(x: number, y: number): Velocity {
  return { x, y };
}
