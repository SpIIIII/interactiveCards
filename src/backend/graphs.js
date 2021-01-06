import { Node } from "./nodes";

class Graph {
  constructor(nodes) {
    this.nodes = nodes;
    this.tree = ["Приветствие"];
    this.depth = 0;
    this.root = new Node(
      "Приветствие",
      "Здравствуйте это компания Feonet, оператор _____ чем могу помочь"
    );
    this.populating();
    this.exclNodes = [];
  }

  nodefy(node, parentNode) {
    let newNode = new Node(node);
    newNode.addParent(parentNode);
    this.addChilds(newNode);
    return newNode;
  }
  addChilds(parentNode) {
    let tempChilds = this.nodes[parentNode.tytle].child;
    parentNode.type = this.nodes[parentNode.tytle].type;
    for (let child of tempChilds) {
      parentNode.addChild(this.nodefy(child, parentNode));
    }
  }

  isChildAdd(floor, child) {
    let rule1,
      rule2 = false;
    for (let nod of floor) {
      if (nod.isEqual(child)) {
        rule1 = true;
        break;
      }
    }
    console.log(child.strParents());
    return rule1;
  }

  populating() {
    this.addChilds(this.root);
    return this.root;
  }
  *getFloor(exclNodes) {
    let floor = [this.root];
    while (floor.length > 0) {
      yield floor;
      let tempNodes = [];
      for (let nod of floor) {
        tempNodes.push(...nod.childs);
      }
      floor = [];
      for (let nod of tempNodes) {
        if (!this.isChildAdd(floor, nod)) floor.push(nod);
      }
    }
  }
  *represente(exclNodes = []) {
    this.exclNodes = exclNodes;
    let it = this.getFloor(exclNodes);
    for (let i of it) {
      if (!exclNodes.includes(i.tytpe)) {
        let ret = i.map((x) => ({
          tytle: x.tytle,
          text: x.text,
          type: x.type
        }));
        console.log(ret);
        yield ret;
      }
    }
  }
}

// function makeGraph(allNodes, nodes, tree, excl = []) {
//   let chNodes = [];
//   for (let e of excl) {
//     if (nodes.includes(e)) {
//       nodes = nodes.filter((x) => excl.includes(x));
//     }
//   }
//   for (let node of nodes) {
//     let tempNodes = [];
//     tempNodes = allNodes[node].child;
//     chNodes.push(...tempNodes);
//   }
//   if (chNodes.length === 0) return tree;

//   tree.push(new Set(chNodes));
//   return makeGraph(allNodes, chNodes, tree, excl);
// }
// const graph = [];
// graph.push(["Приветствие"]);
// let resultGraph = makeGraph(copyNodes, ["Приветствие"], graph, ecxlNodes);

export { Graph };
