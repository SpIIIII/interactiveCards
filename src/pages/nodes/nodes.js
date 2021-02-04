import React, { useRef, useState } from "react";



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

  const clearPaths = ()=>{
    const svgLeash = document.getElementById("svgLeash");
    while (svgLeash.firstChild){
      svgLeash.removeChild(svgLeash.firstChild)
    } 
  }

  const findParentCenter = (titles = ["Приветствие"]) => {
    // console.log(titles)
    const nodes = titles.map((x) => document.getElementById(x));
    console.log(nodes);
    const centers = nodes.map((x) => [
      x.offsetLeft + x.offsetWidth / 2,
      x.offsetTop + x.offsetHeight 
    ]);

    const relativeCenterCords = centers.map((x) => [x[0], x[1]]);
    return relativeCenterCords;
  };
  if (thisElRef.current) {
    const svgLeash = document.getElementById("svgLeash");
    const pathLeash = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathLeash.classList.add("path_leash");
    var currentX =
      thisElRef.current.offsetLeft + thisElRef.current.offsetWidth / 2;
    var currentY =
      thisElRef.current.offsetTop;
    const relativeParentCenters = findParentCenter(props.parents);
    for (let x of relativeParentCenters) {
      pathLeash.setAttributeNS(
        null,
        "d",
        `M ${currentX} ${currentY} C ${currentX} ${currentY * 0.8}, ${x[0]} ${
          x[1] / 0.8
        }, ${x[0]} ${x[1]}`
      );
      svgLeash.appendChild(pathLeash);
    }
  }

  return (
    <div
      id={props.title}
      className={classes}
      onMouseEnter={hoveredOn}
      onMouseLeave={hoveredOff}
      onClick={(x) => {
        props.exNode(x);
        props.upd();
        findParentCenter(props.parents);
        clearPaths();
      }}
      ref={(r) => (thisElRef.current = r)}
    >
      <span className=" header_style node_header_color">{props.title}</span>
      <div className="node_text_color text_style">{props.text}</div>
      <svg calssName="node_leash">{pathes}</svg>
    </div>
  );
}

export default Node;
