import { Node } from "./nodes";

class Graph {
  constructor(nodes) {
    this.nodes = nodes;
    this.tree = ["Приветствие"];
    this.root = new Node(
      "Приветствие",
      "Здравствуйте это компания Feonet, оператор _____ чем могу помочь"
    );
  }
  makeGraph() {
    function recPopulate(allNodes, nodes, tree) {
      let chNodes = [];
      for (let node of nodes) {
        let tempNodes = allNodes[node].child;
        chNodes.push(...tempNodes);
      }
      if (chNodes.length === 0) return tree;

      tree.push(new Set(chNodes));
      return recPopulate(allNodes, chNodes, tree);
    }
    return recPopulate(this.nodes, ["Приветствие"], this.tree);
  }

  nodefy(node, parentNode) {
    let newNode = new Node(node);
    newNode.addParent(parentNode);
    this.addChilds(newNode);
    return newNode;
  }
  addChilds(parentNode) {
    let tempChilds = this.nodes[parentNode.tytle].child;
    for (let child of tempChilds) {
      parentNode.addChild(this.nodefy(child, parentNode));
    }
  }
  populating() {
    this.addChilds(this.root);
    return this.root;
  }
}

function makeGraph(allNodes, nodes, tree, excl = []) {
  let chNodes = [];
  for (let e of excl) {
    if (nodes.includes(e)) {
      nodes = nodes.filter((x) => excl.includes(x));
    }
  }
  for (let node of nodes) {
    let tempNodes = [];
    tempNodes = allNodes[node].child;
    chNodes.push(...tempNodes);
  }
  if (chNodes.length === 0) return tree;

  tree.push(new Set(chNodes));
  return makeGraph(allNodes, chNodes, tree, excl);
}
// const graph = [];
// graph.push(["Приветствие"]);
// let resultGraph = makeGraph(copyNodes, ["Приветствие"], graph, ecxlNodes);

export { makeGraph, Graph };
