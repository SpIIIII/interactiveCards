import allNodes from "./nodes";

const copyNodes = { ...allNodes };


function makeGraph(allNodes, nodes, tree, excl = []) {
  let chNodes = [];
  // if (nodes.len  gth>0) 
  nodes = nodes.filter(x=>!excl.includes(x))
  for (let node of nodes) {
    let tempNodes = []
    if (node !== excl) {
      tempNodes = allNodes[node].child
    };
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