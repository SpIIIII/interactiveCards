import React from "react";

function NodeResp() {
  return (
    <div className="nodeResponse">
      <h6>Приветствие</h6>
      <span>
        Здравствуйте это компания Feonet, оператор _____ чем могу помочь
      </span>
    </div>
  );
}
function NodeReq() {
  return (
    <div className="nodeRequest">
      <span>состояние счета</span>
    </div>
  );
}

function Node() {
  return (
    <div className="col-sm-2">
      <NodeResp />
      <NodeReq />
    </div>
  );
}

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