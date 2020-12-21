import React, { useEffect } from "react";
import Node from "./nodes/nodes";
import allNodes from "../backend/nodes";
import resultGraph from "../backend/graphs";

function MainCard() {
  let rows = [];
  for (let r of resultGraph) {
    let nods = [];
    for (let i of r) {
      nods.push(
        <Node title={i} type={allNodes[i].type} text={allNodes[i].text} />
      );
    }
    rows.push(<div className="row justify-content-center rowModule">{nods}</div>);
  }
  return <div className=" col-sm-10 mainCard">{rows}</div>;
}

export default MainCard;