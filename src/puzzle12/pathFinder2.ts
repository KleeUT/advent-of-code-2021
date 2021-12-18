import { Node, NodeType } from "./types";

export function aggregateVisits(visitedSmallCaves: Pick<Node, "name">[]): {
  [key: string]: number;
} {
  return visitedSmallCaves.reduce((p, v) => {
    let val = p[v.name];
    if (val === undefined) {
      val = 0;
    }
    p[v.name] = val + 1;
    return p;
  }, {} as { [s: string]: number });
}

export function findToVisit(
  connected: Node[],
  visitCount: { [key: string]: number }
): Node[] {
  return Math.max(...Object.values(visitCount)) <= 1
    ? connected.filter((x) => x.type !== NodeType.start)
    : connected.filter(
        (next) => !Object.keys(visitCount).find((x) => x === next.name)
      );
}

function visit(
  node: Node,
  allPreviousNodes: Node[],
  visitedSmallCaves: Node[]
): Node[][] {
  if (node.type === NodeType.end) {
    return [[...allPreviousNodes, node]];
  }

  let previousSmall = [...visitedSmallCaves];
  if (node.type === NodeType.small || node.type === NodeType.start) {
    previousSmall.push(node);
  }

  const aggregatedCaveVisits = aggregateVisits(previousSmall);
  // The current implementation has 2 nodes being visited twice
  const toVisit = findToVisit(node.connected, aggregatedCaveVisits);

  if (toVisit.length === 0) {
    return [[...allPreviousNodes, node]];
  }

  const all = toVisit.flatMap((next) =>
    visit(next, [...allPreviousNodes, node], previousSmall)
  );
  return all;
}

export function countPathsToEnd(startNode: Node): number {
  const allPaths = visit(startNode, [], []);
  const pathsToEnd = allPaths.filter(
    (x) => x[x.length - 1].type === NodeType.end
  );

  console.log(`all paths ${allPaths.length} to end ${pathsToEnd.length}`);

  return pathsToEnd.length;
}
