import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisV } from "@fortawesome/free-regular-svg-icons";
// import { faEllipsisV } from "@fortawesome/free-brands-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function Node(props) {
  const thisElRef = useRef();
  const hoveredOn = (x) => {
    x.currentTarget.classList.add("nodeHovered");
  };
  let pathes = [];
  const hoveredOff = (x) => {
    x.currentTarget.classList.remove("nodeHovered");
  };

  const cl = ["nodeResponse", "nodeFact", "nodeАсt", "nodeReq"];
  let sel = props.excl ? " nodeSelected" : " ";
  let classes = "col-md-auto node " + cl[props.type - 1] + sel;

  const findParentCenter = (titles = ["Приветствие"]) => {
    let nodes = titles.map((x) => document.getElementById(x));
    nodes = nodes.fill((x) => x !== null);
    const centers = nodes.map((x) => [
      x.offsetLeft + x.offsetWidth / 2,
      x.offsetTop + x.offsetHeight
    ]);

    const relativeCenterCords = centers.map((x) => [x[0], x[1]]);
    return relativeCenterCords;
  };

  const extraOpen = () => {
    console.log("extra test");
  };

  return (
    <div
      id={props.title}
      className={classes}
      onMouseEnter={hoveredOn}
      onMouseLeave={hoveredOff}
      onClick={(x) => {
        props.exNode(x);
        props.upd();
      }}
      ref={(r) => (thisElRef.current = r)}
    >
      <div className="header_style node_header_color">{props.title}</div>
      <div className="extra" onMouseEnter={extraOpen}>
        <FontAwesomeIcon className="FAextra" icon={faEllipsisV} />
      </div>


      {/* <div className="node_text_color text_style">{props.text}</div> */}
    </div>
  );
}

export default Node;
