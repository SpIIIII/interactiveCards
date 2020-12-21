import React from "react";

function NodeResp(props) {
  return (
    <div className="col-md-auto nodeResponse node">
      <h6 className="header_style node_header_color">{props.title}</h6>
      <span className="node_text_color text_style">{props.text}</span>
    </div>
  );
}
function NodeReq(props) {
  return (
    <div className="nodeReq col-md-auto node">
      <span className=" header_style node_header_color">{props.title}</span>
    </div>
  );
}
function NodeFact(props) {
  return (
    <div className="col-md-auto nodeFact node">
      <span className="header_style node_header_color">{props.title}</span>
    </div>
  );
}
function NodeАсt(props) {
  return (
    <div className="nodeАсt col-md-auto node">
      <span className=" header_style node_header_color">{props.title}</span>
    </div>
  );
}

function Node(props) {
  if (props.type === 1) {
    return <NodeResp title={props.title} text={props.text} />;
  } else if (props.type === 2) {
    return <NodeFact title={props.title} />;
  } else if (props.type === 3) {
    return <NodeАсt title={props.title} />;
  } else if (props.type === 4) {
    return <NodeReq title={props.title} />;
  }
}

export default Node;
