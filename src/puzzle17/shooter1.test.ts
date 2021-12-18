import { adjustVelocity, checkResult, findHighestY, play } from "./shooter1";
import { Point, Result, Velocity } from "./types";
import { point, velocity } from "./utils";

describe(adjustVelocity, () => {
  test.each([
    {
      velocity: { x: 0, y: 0 },
      expectedVelocity: { x: 0, y: -1 },
    },
    {
      velocity: { x: 1, y: 0 },
      expectedVelocity: { x: 0, y: -1 },
    },
    {
      velocity: { x: 2, y: 0 },
      expectedVelocity: { x: 1, y: -1 },
    },
    {
      velocity: { x: -1, y: 0 },
      expectedVelocity: { x: 0, y: -1 },
    },
    {
      velocity: { x: -2, y: 0 },
      expectedVelocity: { x: -1, y: -1 },
    },
    {
      velocity: { x: 0, y: 2 },
      expectedVelocity: { x: 0, y: 1 },
    },
  ])("adjust", ({ velocity, expectedVelocity }) => {
    expect(adjustVelocity(velocity)).toEqual(expectedVelocity);
  });
});

describe(checkResult, () => {
  test.each([
    {
      target: { topLeft: { x: 1, y: 1 }, bottomRight: { x: 3, y: -1 } },
      position: { x: 0, y: 0 },
      result: Result.unsure,
    },
    {
      target: { topLeft: { x: 1, y: 1 }, bottomRight: { x: 3, y: -1 } },
      position: { x: 2, y: 0 },
      result: Result.in,
    },
    {
      target: { topLeft: { x: 1, y: 1 }, bottomRight: { x: 3, y: -1 } },
      position: { x: 0, y: -2 },
      result: Result.under,
    },
    {
      target: { topLeft: { x: 1, y: 1 }, bottomRight: { x: 3, y: -1 } },
      position: { x: 4, y: 0 },
      result: Result.over,
    },
  ])("test result checker", ({ target, position, result }) => {
    expect(checkResult(position, target)).toEqual(result);
  });
});

describe(play, () => {
  it("overShoot", () => {
    expect(
      play(
        point(0, 0),
        velocity(10, 10),
        {
          topLeft: point(10, 0),
          bottomRight: point(20, -10),
        },
        0
      )
    ).toEqual({ result: Result.over, y: 27 });
  });
  it("under shoot", () => {
    expect(
      play(
        point(0, 0),
        velocity(1, 1),
        {
          topLeft: point(10, 0),
          bottomRight: point(20, -10),
        },
        0
      )
    ).toEqual({ result: Result.under, y: 1 });
  });
  it("in", () => {
    expect(
      play(
        point(0, 0),
        velocity(2, 2),
        {
          topLeft: point(3, 0),
          bottomRight: point(6, -10),
        },
        0
      )
    ).toEqual({ result: Result.in, y: 3 });
  });
  it("some sample", () => {
    expect(
      play(
        point(0, 0),
        velocity(6, 3),
        {
          topLeft: point(20, -5),
          bottomRight: point(30, -10),
        },
        0
      )
    ).toEqual({ result: Result.in, y: 6 });
  });
});

describe.only("Live run", () => {
  it("should sample", () => {
    //x=20..30, y=-10..-5
    expect(
      findHighestY({ topLeft: point(20, -5), bottomRight: point(30, -10) })
    ).toEqual(45);
  });
  it("should Real", () => {
    //target area: x=241..275, y=-75..-49
    expect(
      findHighestY({ topLeft: point(241, -49), bottomRight: point(275, -75) })
    ).toEqual(45);
  });
});
