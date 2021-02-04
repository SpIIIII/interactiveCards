import React, { useState } from "react";
import Node from "./nodes/nodes";

let ecxlNodes = ["Приветствие"];
const leases = []

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

function GraphWrapper(props) {
  const rows = [];
  const forceUpdate = useForceUpdate();

  function excludeNodes(node) {
    const n = node.target.textContent;
    if (ecxlNodes.includes(n)) {
      ecxlNodes = ecxlNodes.filter((x) => x !== n);
    } else ecxlNodes.push(n);
    props.graph.excludeNodes(ecxlNodes);
  }
  for (let pair of props.graph.represente()) {
    const node = pair[0];
    const nodes = [];
    
    for (let i of node) {
      nodes.push(
        <Node
          title={i.tytle}
          type={i.type}
          text={i.text}
          excl={i.excluded}
          exNode={excludeNodes}
          upd={forceUpdate}
          parents={i.parents.map((x) => x.tytle)}
        />
      )
      leases.push([i.tytle, i.parents.map((x) => x.tytle)])
    }
    const classes = "row justify-content-center rowModule ";
    rows.push(<div className={classes}>{nodes}</div>);
  }
  return (
    <>
      <div className=" col-sm-10 mainCard" id="mainC">
        {rows}
      </div>
    </>
  );
}

function MainCard(props) {
  const paths = []
  const findParentCenter = (titles = ["Приветствие"]) => {
    // console.log(titles)
    const nodes = titles.map((x) => document.getElementById(x));
    const centers = nodes.map((x) => [
      x.offsetLeft + x.offsetWidth / 2,
      x.offsetTop + x.offsetHeight 
    ]);

    const relativeCenterCords = centers.map((x) => [x[0], x[1]]);
    return relativeCenterCords;
  };
  const findChildCenter = (titles = "Приветствие") => {
    const node = document.getElementById(titles)
    const center = [
      node.offsetLeft + node.offsetWidth / 2,
      node.offsetTop 
    ]
    return center;
  };
  for(let pair of leases){
    console.log("pair 0 ", pair[0])
    x = findChildCenter(pair[0])
    const relativeParentCenters = findParentCenter(pair[1]);
    for (let parentCenter of relativeParentCenters) {
      paths.push(<path d={ `M ${x} ${y} C ${x} ${y * 0.8}, ${parentCenter[0]} ${
        parentCenter[1] / 0.8}, ${parentCenter[0]} ${parentCenter[1]}`}></path>)
    }
  }
  return (
    <>
      <GraphWrapper graph={props.graph} />
      <svg className="node_leash" id="svgLeash"></svg>
    </>
  )
}

export { MainCard, useForceUpdate };
