import React, { useRef } from "react";

function Node(props) {
  const thisElRef = useRef();
  const hoveredOn = (x) => {
    x.currentTarget.classList.add("nodeHovered")
  };

  const hoveredOff = (x) => {
    x.currentTarget.classList.remove("nodeHovered")
  };

  const cl = ["nodeResponse", "nodeFact", "nodeАсt", "nodeReq"];
  let sel = props.excl ? " nodeSelected" : " ";
  let classes = "col-md-auto node " + cl[props.type - 1] + sel;

  return (
    <div
      className={classes}
      onMouseEnter={hoveredOn}
      onMouseLeave={hoveredOff}
      onClick={(x) => {
        props.exNode(x);
        props.upd();
      }}
      ref={thisElRef}
    >
      <span className=" header_style node_header_color">{props.title}</span>
      <div className="node_text_color text_style">{props.text}</div>
    </div>
  );
}

export default Node;
