import React, {useRef, useState} from "react";
// import {excludeNodes} from "../mainCard"


function Node(props) {
  const thisElRef = useRef()
  const hovered = ()=>{
    if (thisElRef.current.classList.contains("nodeHovered"))  thisElRef.current.classList.remove("nodeHovered")
    else thisElRef.current.classList.add("nodeHovered")
  } 
  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const selected = (x)=>{
    if (thisElRef.current.classList.contains("nodeSelected"))  {
      
      thisElRef.current.classList.remove("nodeSelected")
    }
    else {
      thisElRef.current.classList.add("nodeSelected")
    } 
    // excludeNodes(x.target.textContent)
  }
  const cl = ["nodeResponse", "nodeFact", "nodeАсt", "nodeReq" ]
  let classes = "col-md-auto node " + cl[props.type-1]

  return (
    <div className={classes} onMouseEnter={hovered} onClick={x => {props.exNode(x); selected(x); props.upd()}} onMouseLeave={hovered} ref={thisElRef}>
      <span className=" header_style node_header_color">{props.title}</span>
      <div className="node_text_color text_style">{props.text}</div>
    </div>
  );
}

export default Node;
