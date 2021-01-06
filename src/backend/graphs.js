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
    for (let nod of floor) {
      if (nod.isEqual(child)) return true
    }
    return false;
  }

  populating() {
    this.addChilds(this.root);
    return this.root;
  }
  
  *getFloors() {
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
  getFloor(parents=[]) {
      let childs = [];
      let tempChilds = []
      for (let nod of parents) {
          tempChilds.push(...nod.childs);
      }
      for (let nod of tempChilds) {
        if (!this.isChildAdd(childs, nod)) childs.push(nod);
      }
      return childs
  }

  *represente(exclNodes = []) {
    this.exclNodes = exclNodes;
    let parents = [this.root]
    
    let childs = []
    yield parents
    while(parents.length>0){
      childs = this.getFloor(parents)
      yield childs
      let intercept = childs.map(x=>x.tytle).filter(x=>this.exclNodes.includes(x))
      if (intercept.length>0){
        childs=childs.filter(x=>intercept.includes(x.tytle  ))
      }
      parents = childs
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
