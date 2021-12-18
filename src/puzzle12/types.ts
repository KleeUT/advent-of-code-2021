export enum NodeType {
  small = "small",
  large = "large",
  start = "start",
  end = "end",
}
export type Node = {
  name: string;
  connected: Node[];
  type: NodeType;
};

export const START_NODE_NAME = "start";
export const END_NODE_NAME = "end";
