import React, { useState } from "react";
import Node from "./nodes/nodes";
import { allNodes } from "../backend/nodes";
import {  Graph } from "../backend/graphs";

let ecxlNodes = ["Приветствие"];

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

function MainCard() {
  let rows = [];
  const forceUpdate = useForceUpdate();

  function excludeNodes(node) {
    let n = node.target.textContent;
    if (ecxlNodes.includes(n)) {
      ecxlNodes = ecxlNodes.filter((x) => x !== n);
    } else ecxlNodes.push(n);
  }
  const graph_ = new Graph(allNodes);
  for (let r of graph_.represente(ecxlNodes)) {
    let nods = [];
    for (let i of r) {
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

export { MainCard };
