import { data } from "./input";

export function countPositions(input: string[]): number[] {
  return input.reduce((p, c) => {
    let out: number[] = [];
    Array.from(c).forEach((char, index) => {
      out[index] = (p[index] ?? 0) + parseInt(char);
    });
    return out;
  }, [] as Array<number>);
}

export function calculateGammaAndEpsilon(
  positionData: number[],
  maxValue: number
): { g: string; e: string; gd: number; ed: number } {
  const half = maxValue / 2;
  const binaryData = positionData.reduce(
    (p, c) => {
      return {
        g: p.g + (c > half ? "1" : "0"),
        e: p.e + (c < half ? "1" : "0"),
      };
    },
    { g: "", e: "" }
  );

  return {
    ...binaryData,
    gd: parseInt(binaryData.g, 2),
    ed: parseInt(binaryData.e, 2),
  };
}
