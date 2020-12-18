import React from 'react'

function NodeResp() {
    return (
      <div className="nodeResponse node">
        <h6 className="header_style node_header_color">Приветствие</h6>
        <span className="node_text_color text_style">
          Здравствуйте это компания _____, оператор _____ чем могу помочь
        </span>
      </div>
    );
  }
  function NodeReq() {
    return (
      <div className="nodeRequest node">
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

  export default Node