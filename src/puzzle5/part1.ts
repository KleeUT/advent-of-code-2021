import { readLines, readTestLines } from "./datareader";
import {
  findParallelLineOverlaps,
  findPerpendicularIntersections,
} from "./lineWorker";
import { Line, LineType } from "./types";

async function run() {
  const lines = await readTestLines(
    (line: Line) => line.type !== LineType.diagonal
  );

  const { horizontal, vertical } = lines.reduce(
    (buckets, line) => {
      if (line.type === LineType.horizontal) {
        buckets.horizontal.push(line);
      } else {
        buckets.vertical.push(line);
      }
      return buckets;
    },
    { horizontal: [] as Line[], vertical: [] as Line[] }
  );
  console.log(horizontal.length, vertical.length);
  console.table(horizontal);
  console.table(vertical);

  const perpCount = findPerpendicularIntersections(horizontal, vertical);
  const horCount = findParallelLineOverlaps(
    horizontal.map((x) => ({ point1: x.point1.x, point2: x.point2.x }))
  );
  const verCount = findParallelLineOverlaps(
    vertical.map((x) => ({ point1: x.point1.y, point2: x.point2.y }))
  );
  console.log(`Overlapping lines ${perpCount + horCount + verCount}`);
  console.table({ perpCount, horCount, verCount });
}

run();
