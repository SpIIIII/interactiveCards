import { Node } from "./nodes";

class Graph {
  constructor(nodes) {
    this.nodes = nodes;
    this.depth = 0;
    this.root = new Node(
      "Приветствие",
      "Здравствуйте это компания Feonet, оператор _____ чем могу помочь"
    );
    this.exclNodes = [];
    this.cash = {"Приветствие": this.root}
    this.populating();
  }

  nodefy(node, parentNode) {
    if(this.findNodeByTytle(node, parentNode)!==undefined){
      let newNode = this.findNodeByTytle(node, parentNode)
      newNode.addParent(parentNode)
      return newNode
    }else{
      let newNode = new Node(node);
      newNode.addParent(parentNode);
      this.addChilds(newNode);
      this.cash[node] = newNode
      return newNode; 
    }
      
  }

  addChilds(parentNode) {
    let tempChilds = this.nodes[parentNode.tytle].child;
    parentNode.type = this.nodes[parentNode.tytle].type;
    for (let child of tempChilds) {
        parentNode.addChild(this.nodefy(child, parentNode));
    }
  }

  populating() {
    this.addChilds(this.root);
    return this.root;
  }

  findNodeByTytle(tytle, startNode){
    if (Object.keys(this.cash).includes(tytle)) return this.cash[tytle]
    let parent = startNode
    for (let child of parent.childs){
      if(child.tytle === tytle) {
        return child
      } 
      if (child.childs.length>0) return this.findNodeByTytle(tytle, child)
      else continue
    }    
  }

  isChildAdd(child) {
    if (child.added) return false
    else{
      child.added = true
      return true
    }
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
        if (!this.isChildAdd(nod)) floor.push(nod);
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
        if (this.isChildAdd(nod)) childs.push(nod);
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
      childs=childs.filter(x=>x.isAllParents(this.exclNodes))
      yield childs
      let intercept = childs.map(x=>x.tytle).filter(x=>this.exclNodes.includes(x))
      if (intercept.length>0){
        childs=childs.filter(x=>intercept.includes(x.tytle))
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
