import { useState } from "react";
import allNodes from "./nodes";

const copyNodes = { ...allNodes };

function makeGraph(allNodes, nodes, tree) {
  const chNodes = [];
  for (let node of nodes) {
    let tempNodes = allNodes[node].child;
    chNodes.push(...tempNodes);
  }
  if(chNodes.length === 0) return tree;
  tree.push(chNodes);
  return makeGraph(allNodes, chNodes, tree);
}
const graph = [];
let resultGraph = makeGraph(copyNodes,["Приветствие"], graph)

export default allNodes;
