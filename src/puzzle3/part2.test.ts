interface Tree {
  get: (name: string) => TreeNode | undefined;
}

class TreeNode implements Tree {
  private nodes: Map<string, TreeNode>;
  private count: number;
  private _value: string;
  constructor(value: string) {
    this.count = 0;
    this.nodes = new Map<string, TreeNode>();
    this._value = value;
  }
  public incrementCount() {
    this.count++;
  }
  get(name: string) {
    return this.nodes.get(name);
  }
  addNode(name: string, node: TreeNode) {
    this.nodes.set(name, node);
  }
  get value() {
    return this._value;
  }
}

function addToTree(value: string, root: TreeNode, originalValue: string): Tree {
  root.incrementCount();
  // does root have a matching node
  const childName = value.at(0);
  if (!childName) {
    return root;
  }
  const child = root.get(childName);
  if (child) {
    return addToTree(value.substring(1, value.length), child, originalValue);
  }
  let newNode: TreeNode;
  if (value.length === 1) {
    newNode = new TreeNode(originalValue);
  } else {
    newNode = new TreeNode(value);
  }
}

describe("tree solution", () => {
  it("should", () => {
    const input = "101";
  });
});
