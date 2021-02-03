import React, { useState } from "react";
import Node from "./nodes/nodes";

let ecxlNodes = ["Приветствие"];


function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

function GraphWrapper(props){
  const rows = [];
  const forceUpdate = useForceUpdate();

  function excludeNodes(node) {
    const n = node.target.textContent;
    if (ecxlNodes.includes(n)) {
      ecxlNodes = ecxlNodes.filter((x) => x !== n);
    } else ecxlNodes.push(n);
    props.graph.excludeNodes(ecxlNodes)
  }
  for (let pair of props.graph.represente()) {
    const node = pair[0]
    const nods = [];
    for (let i of node) {
      nods.push(
        <Node
          title={i.tytle}
          type={i.type}
          text={i.text}
          excl={i.excluded}
          exNode={excludeNodes}
          upd={forceUpdate}
          parents={i.parents.map((x) => x.tytle)}
        />
      );
    }
    // const selected = pair[1] ? " selectedRowModule" : ""
    const classes = "row justify-content-center rowModule "
    rows.push(
      <div className={classes}>{nods}</div>
    );
  }
  return <>
    <div className=" col-sm-10 mainCard" id="mainC">{rows}</div>;
  </> 

}

function MainCard(props) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "path")    
      svg.setAttributeNS(null, "d", `M 0 0 C 20 20,  100 100, 200 200`)
  return (
    <>
      <GraphWrapper graph={props.graph}/>
      <svg className="node_leash">
        <path d="M 0 0 C 20 20,  100 100, 200 200" fill="black"></path>
      </svg>
    </>
  )
}

export { MainCard, useForceUpdate };
