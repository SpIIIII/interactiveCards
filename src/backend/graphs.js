import allNodes from "./nodes";

const copyNodes = { ...allNodes };


function makeGraph(allNodes, nodes, tree, excl = []) {
  let chNodes = [];  
  for (let e of excl){
    if (nodes.includes(e)){
      nodes = nodes.filter(x => excl.includes(x))
    }
  }

  for (let node of nodes) {
    let tempNodes = []
      tempNodes = allNodes[node].child
    chNodes.push(...tempNodes);
  }
  if (chNodes.length === 0) return tree;

  tree.push(chNodes);
  return makeGraph(allNodes, chNodes, tree, excl);
}
// const graph = [];
// graph.push(["Приветствие"]);
// let resultGraph = makeGraph(copyNodes, ["Приветствие"], graph, ecxlNodes);

export {makeGraph};