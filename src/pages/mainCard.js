import React, { useState } from "react";
import Node from "./nodes/nodes";
// import { allNodes } from "../backend/nodes";
// import {  Graph } from "../backend/graphs";

let ecxlNodes = ["Приветствие"];

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

function GraphWrapper(props){
  let rows = [];
  const forceUpdate = useForceUpdate();

  function excludeNodes(node) {
    let n = node.target.textContent;
    if (ecxlNodes.includes(n)) {
      ecxlNodes = ecxlNodes.filter((x) => x !== n);
    } else ecxlNodes.push(n);
    props.graph.excludeNodes(ecxlNodes)
  }
  for (let node of props.graph.represente()) {
    let nods = [];
    for (let i of node) {
      nods.push(
        <Node
          title={i.tytle}
          type={i.type}
          text={i.text}
          exNode={excludeNodes}
          upd={forceUpdate}
        />
      );
    }
    rows.push(
      <div className="row justify-content-center rowModule">{nods}</div>
    );
  }
  return <div className=" col-sm-10 mainCard" id="mainC">{rows}</div>;

}

function MainCard(props) {
  return (
    <>
    <GraphWrapper graph={props.graph}/>
    </>
  )
}

export { MainCard };
