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

  const findParentCenter = (titles = ["Приветствие"]) => {
    // console.log(titles)
    const nodes = titles.map((x) => document.getElementById(x));
    console.log(nodes)
    const centers = nodes.map((x) => [
      x.offsetLeft + x.offsetWidth / 2,
      x.offsetTop + x.offsetHeight / 2
    ]);

    const relativeCenterCords = centers.map((x) => [
      x[0],
      x[1]
    ]);
    return relativeCenterCords;
  };
  if(thisElRef.current){
    const mainCard = document.getElementById("mainC")
    const svgLeash = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const pathLeash = document.createElementNS("http://www.w3.org/2000/svg", "path")
    // console.log(props.parents)
    const relativeParentCenters = findParentCenter(props.parents);
    // console.log(relativeParentCenters);
    for(let x of relativeParentCenters){
      pathLeash.setAttributeNS(null, "d", `M 0 0 C 20 20,  ${x[0] / 2} ${x[1] / 2}, ${x[0]} ${x[1]}`)
      svgLeash.appendChild(pathLeash)
      mainCard.appendChild(svgLeash)
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
      }}
      ref={thisElRef}
    >
      <span className=" header_style node_header_color">{props.title}</span>
      <div className="node_text_color text_style">{props.text}</div>
      <svg calssName="node_leash">{pathes}</svg>
    </div>
  );
}

export default Node;
