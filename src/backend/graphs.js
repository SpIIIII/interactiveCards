import { Node } from "./nodes";

class Graph {
  constructor(nodes) {
    this.nodes = nodes;
    this.depth = 0;
    this.root = new Node(
      "Приветствие",
      'Сначала представьтесь и поприветствуйте абонента "Здравствуйте это компания Feonet, оператор _____ чем могу помочь"'
    );
    this.exclNodes = ["Приветствие"];
    this.cash = {"Приветствие": this.root}
    this.populating();
  }

  nodefy(node, parentNode) {
    let newNode
    if(this.findNodeByTytle(node, parentNode)!==undefined){
      newNode = this.findNodeByTytle(node, parentNode)      
    }else{
      newNode = new Node(node);
      this.addChilds(newNode);
      this.cash[node] = newNode
    }
    
    newNode.addParent(parentNode)
    return newNode
  }

  addChilds(parentNode) {
    let tempChilds = this.nodes[parentNode.tytle].child;
    parentNode.type = this.nodes[parentNode.tytle].type;
    parentNode.text = this.nodes[parentNode.tytle].text
    parentNode.neseccParent = this.nodes[parentNode.tytle].neseccParent
    for (let child of tempChilds) {
        parentNode.addChild(this.nodefy(child, parentNode));
    }
  }

  populating() {
    this.addChilds(this.root);
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

  resetNodesAd(){
    for (let node of Object.values(this.cash)){
      node.added = false
    }
  }

  isNodAdded(node){
    if (node.added){
      return true
    }
    else{
      node.added = true
      return false
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
        if (!this.isNodAdded(nod)) floor.push(nod);
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
        if (!this.isNodAdded(nod)) childs.push(nod);
      }
      return childs
  }

  *represente() {
    this.resetNodesAd() 
    let parents = [this.root]
    let childs = []
    let selected = false
    yield [parents, selected]
    while(parents.length>0){
      childs = this.getFloor(parents)
      childs=childs.filter(x=>x.isAllParents(this.exclNodes))
      yield [childs, selected]
      selected = false
      let intercept = childs.map(x=>x.tytle).filter(x=>this.exclNodes.includes(x))
      if (intercept.length>0){
        selected=true
        childs=childs.filter(x=>intercept.includes(x.tytle))
      }
      parents = childs
      
    }
  }

  excludeNodes(exclNodes = []) {
    for (let nod of Object.values(this.cash)) {
      if (exclNodes.includes(nod.tytle)) {
        nod.excluded = true;
      } else {
        nod.excluded = false;
      }
    }
    this.exclNodes = exclNodes;
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
