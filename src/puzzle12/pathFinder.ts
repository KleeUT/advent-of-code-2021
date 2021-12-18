import { Node, NodeType } from "./types";

function visit(
  node: Node,
  allPreviousNodes: Node[],
  visitedSmallCaves: Node[]
): Node[][] {
  if (node.type === NodeType.end) {
    console.table(allPreviousNodes.map((x) => x.name));
    return [[...allPreviousNodes, node]];
  }

  const toVisit = node.connected.filter(
    (next) => !visitedSmallCaves.find((x) => x.name === next.name)
  );

  if (toVisit.length === 0) {
    return [[...allPreviousNodes, node]];
  }
  let previousSmall = [...visitedSmallCaves];
  if (node.type === NodeType.small || node.type === NodeType.start) {
    previousSmall.push(node);
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
  // console.table(allPaths);
  console.log(`all paths ${allPaths.length} to end ${pathsToEnd.length}`);
  return pathsToEnd.length;
}
