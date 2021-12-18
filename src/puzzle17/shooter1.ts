import {
  Target,
  Velocity,
  Point,
  Result,
  ResultWithHighestYReached,
} from "./types";
import { point, velocity } from "./utils";

export function adjustVelocity(velocity: Velocity): Velocity {
  let x = velocity.x;
  if (x > 0) {
    x--;
  } else if (x < 0) {
    x++;
  }
  let y = velocity.y - 1;
  return { x, y };
}

export function checkResult(currentPosition: Point, target: Target): Result {
  if (currentPosition.x > target.bottomRight.x) {
    return Result.over;
  }
  if (currentPosition.y < target.bottomRight.y) {
    return Result.under;
  }
  if (
    currentPosition.x < target.topLeft.x ||
    currentPosition.y > target.topLeft.y
  ) {
    return Result.unsure;
  }
  return Result.in;
}

export function adjustPosition(point: Point, velocity: Velocity): Point {
  return {
    x: point.x + velocity.x,
    y: point.y + velocity.y,
  };
}

export function play(
  position: Point,
  velocity: Velocity,
  target: Target,
  highestY: number
): ResultWithHighestYReached {
  const result = checkResult(position, target);
  if (result !== Result.unsure) {
    return { result, y: highestY };
  }
  const newPosition = adjustPosition(position, velocity);
  return play(
    newPosition,
    adjustVelocity(velocity),
    target,
    Math.max(highestY, newPosition.y)
  );
}

export function findHighestY(
  targetSpace: Target
): ResultWithHighestYReached & { startingVelocity: Velocity } {
  const results: (ResultWithHighestYReached & {
    startingVelocity: Velocity;
  })[] = [];
  for (let x = 0; x < 300; x++) {
    for (let y = -200; y < 300; y++) {
      const startingVelocity = velocity(x, y);
      const result = play(point(0, 0), startingVelocity, targetSpace, 0);
      results.push({ ...result, startingVelocity });
    }
  }

  const successes = results.filter((x) => x.result === Result.in);
  console.log(
    `Total results ${results.length} successResults: ${successes.length}`
  );
  successes.sort((a, b) => (a.y < b.y ? 1 : -1));
  // console.table(successes.sl);
  // x must be less than max >
  return successes[0];
}
