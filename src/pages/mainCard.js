import React from "react";



function MainCard() {
  return (
    <div className="mainCard col-sm-10">
      {/* <div className="mainCard col-sm-10"> */}
      <div className="row justify-content-center">
        <Node />
      </div>
      <div className="row justify-content-center">
        <NodeResp />
        <NodeResp />
      </div>
    </div>
  );
}

export default MainCard;