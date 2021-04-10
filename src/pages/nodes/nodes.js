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
  const extraList = [];
  const extraOpen = (x) => {
    console.log("popped")
    if(props.text){   
      const parent = document.getElementById("mainC");
      const popover = document.createElement("div");
      popover.classList.add("popover");
      popover.appendChild(document.createTextNode(props.text))
      popover.style.top = `${(x.clientY + window.pageYOffset) -45}px`;
      popover.style.left = `${x.clientX-5}px`;
      popover.onmouseout = function(event) {
        extraClose()   
      }
      popover.onclick = function(event) {
        extraClose()   
      }
      popover.onmouseenter = function(event) {
        popover.style.opacity = "1"
      }
      parent.append(popover);
      extraList.push(popover);
    }
  };
  const extraClose = (x) => {
    for (let element of extraList) {
      element.remove();
    }
    extraList.length = 0;
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
      <div className="extra" onClick={extraOpen} onMouseLeave={extraClose}>
        <FontAwesomeIcon className="FAextra" icon={faEllipsisV} />
      </div>

      {/* <div className="node_text_color text_style">{props.text}</div> */}
    </div>
  );
}

export default Node;
