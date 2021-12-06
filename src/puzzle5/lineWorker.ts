import { Line } from "./types";

export function doPerpendicularLinesIntersect(h: Line, v: Line): boolean {
  const hStart = Math.min(h.point1.x, h.point2.x);
  const hEnd = Math.max(h.point1.x, h.point2.x);
  const hStable = h.point1.y;

  const vStart = Math.min(v.point1.y, v.point2.y);
  const vEnd = Math.max(v.point1.y, v.point2.y);
  const vStable = v.point1.x;

  if (hStable < vStart || hStable > vEnd) {
    return false;
  }
  if (vStable < hStart || vStable > hEnd) {
    return false;
  }

  return true;
}

export function findPerpendicularIntersections(
  horizontal: Line[],
  vertical: Line[]
): number {
  return horizontal.reduce((count, h) => {
    const intersections = vertical.filter((v) => {
      return doPerpendicularLinesIntersect(h, v);
    });
    if (intersections.length > 0) {
      console.log(`intersection count ${intersections.length}`);
      return count + intersections.length;
    }
    return count;
  }, 0);
}

export function findParallelLineOverlaps(
  // this is wrong as it's not taking the other direction into account
  lines: { pointOnAxis: number; point1: number; point2: number }[]
): number {
  return lines // here bucket them into their lines then reduce again.
    .reduce((allLines, line) => {
      const low = Math.min(line.point1, line.point2);
      const high = Math.max(line.point1, line.point2);
      for (let i = low; i <= high; i++) {
        allLines[i] = (allLines[i] ?? 0) + 1;
      }
      console.log(allLines);
      return allLines;
    }, [] as number[])
    .reduce((p, c) => {
      const overlaps = c ?? 0;
      const adjusted = overlaps - 1;
      return p + Math.max(0, adjusted);
    }, 0);
}
