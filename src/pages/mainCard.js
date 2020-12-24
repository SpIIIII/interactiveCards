import React, { useState } from "react";
import Node from "./nodes/nodes";
import allNodes from "../backend/nodes";
import {makeGraph } from "../backend/graphs";


let ecxlNodes = []

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}


function MainCard() {
  let rows = [];
  const graph = [];
  graph.push(["Приветствие"]);
  const forceUpdate = useForceUpdate();
  
  function excludeNodes(node){
    let n = node.target.textContent
    if (ecxlNodes.includes(n)) {
      ecxlNodes = ecxlNodes.filter(x => x!==n)
    } 
    else ecxlNodes.push(n)
  }

  
  for (let r of makeGraph(allNodes, ["Приветствие"], graph, ecxlNodes)) {
    let nods = [];
    for (let i of r) {
      nods.push(
        <Node title={i} type={allNodes[i].type} text={allNodes[i].text} exNode={excludeNodes} upd={forceUpdate} />
      );
    }
    rows.push(<div className="row justify-content-center rowModule">{nods}</div>);
  }
  return <div className=" col-sm-10 mainCard">{rows}</div>;
}

export {MainCard};