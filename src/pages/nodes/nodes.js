import React, {useRef} from "react";
import {excludeNodes} from "../../backend/graphs"


function Node(props) {
  const thisElRef = useRef()
  const hovered = ()=>{
    if (thisElRef.current.classList.contains("nodeHovered"))  thisElRef.current.classList.remove("nodeHovered")
    else thisElRef.current.classList.add("nodeHovered")
  }
  const selected = (x)=>{
    console.log(x.target.textContent)
    if (thisElRef.current.classList.contains("nodeSelected"))  {
      
      thisElRef.current.classList.remove("nodeSelected")
    }
    else {
      thisElRef.current.classList.add("nodeSelected")
    } 
    excludeNodes(x.target.textContent)
  }
  const cl = ["nodeResponse", "nodeFact", "nodeАсt", "nodeReq" ]
  let classes = "col-md-auto node " + cl[props.type-1]

  return (
    <div className={classes} onMouseEnter={hovered} onClick={selected} onMouseLeave={hovered} ref={thisElRef}>
      <span className=" header_style node_header_color">{props.title}</span>
      <span className="node_text_color text_style">{props.text}</span>
    </div>
  );
}

export default Node;
