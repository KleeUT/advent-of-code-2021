import { readDataToArray } from "./dataReader";
import path from "path";

type Point = {
  row: number;
  column: number;
  height?: number;
};

type Basin = {
  points: Point[];
  minimum?: Point;
};

function neighboursLowestFirst(point: Point, data: number[][]): Point[] {
  const neighbours: Point[] = [];
  const rowAbove = data[point.row - 1];
  const rowBelow = data[point.row + 1];
  const pointLeft = {
    ...point,
    column: point.column - 1,
    height: data[point.row][point.column - 1],
  };
  const pointRight = {
    ...point,
    column: point.column + 1,
    height: data[point.row][point.column + 1],
  };
  const pointUp = {
    ...point,
    row: point.row - 1,
    height: rowAbove ? rowAbove[point.column] : undefined,
  };
  const pointDown = {
    ...point,
    row: point.row + 1,
    height: rowBelow ? rowBelow[point.column] : undefined,
  };

  return [pointLeft, pointRight, pointUp, pointDown]
    .filter((x) => x.height && x.height !== 9)
    .sort((a, b) =>
      (a.height || Number.MAX_VALUE) < (b.height || Number.MAX_VALUE) ? -1 : 1
    );
}

function pointToString(point: Point): string {
  return `${point.row}:${point.column}`;
}

function consolidateBasins(
  pointToBasin: Map<string, Basin>,
  basins: Basin[]
): Basin {
  const dedupedBasins = basins.filter(
    (basin, index, array) => array.findIndex((x) => x === basin) === index
  );
  dedupedBasins.sort((a, b) => (a!.points.length < b!.points.length ? 1 : -1));

  // take the biggest
  const [bigBasin, ...otherBasins] = dedupedBasins;

  const uniqueSmallBasins = otherBasins;
  // find all points in the others
  const uniqueSmallBasinPoints = uniqueSmallBasins
    .flatMap((basin) => basin.points)
    .filter(
      (point, index, arr) =>
        arr.findIndex(
          (x) => x.column === point.column && x.row === point.row
        ) === index
    );
  // move points to big basin
  bigBasin.points = [...bigBasin.points, ...uniqueSmallBasinPoints];
  // update points in map
  uniqueSmallBasinPoints.forEach((point) => {
    pointToBasin.set(pointToString(point), bigBasin);
  });

  // set small basins to 0
  uniqueSmallBasins.forEach((basin) => {
    basin.points = [];
  });
  return bigBasin;
}

function basinFinder(data: number[][]): number {
  const mapPointToBasin = new Map<string, Basin>();
  const basins: Basin[] = [];
  // for each cell
  // find the lowest neighbour
  data.forEach((row, rowIndex) => {
    row.forEach((height, columnIndex) => {
      const node: Point = {
        row: rowIndex,
        column: columnIndex,
        height: height,
      };

      if (node.height === 9) {
        // nines are not in a basin bug out
        return;
      }
      const neighbours = neighboursLowestFirst(node, data);
      if (neighbours.length === 0) {
        // all neighbours are 9s
      }
      // if the lowest neighbour is already in a basin then use that basin
      const neighboursInABasin = neighbours.filter((x) =>
        mapPointToBasin.get(pointToString(x))
      );

      // if there are multiple basins then collapse them into one.
      const neighbourBasins = neighboursInABasin
        .map((n) => mapPointToBasin.get(pointToString(n)))
        .filter((x) => x) as Basin[];

      if (neighboursInABasin.length > 0) {
        const basinToUse = consolidateBasins(mapPointToBasin, neighbourBasins);

        mapPointToBasin.set(pointToString(node), basinToUse!);
        basinToUse!.points.push(node);
      } else {
        const basin: Basin = {
          points: [node],
        };
        mapPointToBasin.set(pointToString(node), basin);
        basins.push(basin);
      }
    });
  });

  console.log(`Found ${basins.length} basins`);
  basins.sort((a, b) => (a.points > b.points ? -1 : 1));
  console.table(basins.map((x) => x.points.map(pointToString)));
  return (
    basins[0].points.length * basins[1].points.length * basins[2].points.length
  );
}

// note: The issue is that on line 3 the first 8 will be part of a  basin but doesn't have a neighbour in a basin but it will
describe(basinFinder, () => {
  it("works against sample input", async () => {
    expect(
      basinFinder(
        await readDataToArray(path.join(__dirname, "sampleInput.txt"))
      )
    ).toEqual(1134);
  });
  it("works against full input", async () => {
    expect(
      basinFinder(await readDataToArray(path.join(__dirname, "input.txt")))
    ).toEqual(15);
  });
});
