import React, { useEffect } from "react";
import Node from "./nodes/nodes"
import allNodes from "../backend/graphs"



function MainCard() {
  return (
    <div className=" col-sm-10 mainCard">
      {/* <div className="mainCard col-sm-10"> */}
      <div className="row justify-content-center">
        <Node />
      </div>
      <div className="row justify-content-center">
        {/* <NodeResp />
        <NodeResp /> */}
      </div>
    </div>
  );
}

export default MainCard;