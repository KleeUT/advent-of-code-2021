import { read } from "../fileReader";
import { END_NODE_NAME, Node, NodeType, START_NODE_NAME } from "./types";
import path from "path";

function nodeMaker(name: string): Node {
  return {
    name,
    connected: [],
    type:
      name === START_NODE_NAME
        ? NodeType.start
        : name === END_NODE_NAME
        ? NodeType.end
        : name === name.toLowerCase()
        ? NodeType.small
        : NodeType.large,
  };
}

export async function readGraph(fileName: string): Promise<Node> {
  const lines = await read(path.join(__dirname, fileName));
  const allNodes = lines.reduce((nodes, line) => {
    const [from, to] = line.split("-");
    let fromNode = nodes.get(from) || nodeMaker(from);
    let toNode = nodes.get(to) || nodeMaker(to);
    fromNode.connected.push(toNode);
    toNode.connected.push(fromNode);
    nodes.set(from, fromNode);
    nodes.set(to, toNode);
    return nodes;
  }, new Map<string, Node>());
  const startNode = allNodes.get(START_NODE_NAME);
  if (!startNode) {
    throw new Error(`Could not find node for ${START_NODE_NAME}`);
  }
  return startNode;
}
