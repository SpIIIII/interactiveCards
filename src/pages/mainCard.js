import React, { useState, useEffect } from "react";
// import { useEffect } from "react/cjs/react.development";
import Node from "./nodes/nodes";

let ecxlNodes = ["Приветствие"];
let leashes = [];

function useForceUpdate() {
  console.log("updated")
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

function GraphWrapper(props) {
  let mult = 1;
  let opas = "1"
  const smalence = [0, 0.5]
  const rows = [];
  function excludeNodes(node) {
    const n = node.target.textContent;
    if (ecxlNodes.includes(n)) {
      ecxlNodes = ecxlNodes.filter((x) => x !== n);
    } else ecxlNodes.push(n);
    props.graph.excludeNodes(ecxlNodes);
  }
  for (let pair of props.graph.represente()) {
    const node = pair[0];
    const nodes = [];
    let count_appear = 0
    for (let i of node) {
      if(ecxlNodes.includes(i.tytle)){
        count_appear+=1
      }
      nodes.push(
        <Node
          title={i.tytle}
          type={i.type}
          text={i.text}
          excl={i.excluded}
          exNode={excludeNodes}
          upd={props.upd}
          parents={i.parents.map((x) => x.tytle)}
        />
      );
      leashes.push([i.tytle, i.parents.map((x) => x.tytle)]);
    }
    
    const classes = "row justify-content-center rowModule ";
    if(count_appear>0){
      opas = "1"
    }
    rows.push(<div className={classes} style={{"opacity":opas}} >{nodes}</div>);
    if(count_appear>0){
      opas = "1"
    }else{
      mult /= 2.5
      opas = `${(1*mult)}`
    }
  }
  leashes = [];
  return (
    <>
      <div className=" col-sm-10 mainCard" id="mainC">
        {rows}
      </div>
    </>
  );
}

function Leashes(props) {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  const paths = [];
  const findParentCenter = (titles = "Приветствие") => {
    const node = document.getElementById(titles);
    if (node !== null) {
      const center = [
        node.offsetLeft + node.offsetWidth / 2 - 10,
        node.offsetTop + node.offsetHeight - 10
      ];
      return center;
    }
  };
  const findChildCenter = (titles = "Приветствие") => {
    const node = document.getElementById(titles);
    const center = [
      node.offsetLeft + node.offsetWidth / 2 - 10,
      node.offsetTop + 1
    ];
    return center;
  };

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    const svgLeash = document.getElementById("svgLeash");
    while (svgLeash.firstChild) {
      svgLeash.removeChild(svgLeash.firstChild);
    }
    for (let pair of props.lsh) {
      let xy = findChildCenter(pair[0]);
      for (let pai of pair[1]) {
        const parentCenter = findParentCenter(pai);
        let pathLeash = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        //color leashes
        if (ecxlNodes.includes(pair[0]) && ecxlNodes.includes(pai)) {
          pathLeash.classList.add("select_leash");
        } else if (ecxlNodes.includes(pai)) {
          pathLeash.classList.add("pre_select_leash");
        } else {
          pathLeash.classList.add("path_leash");
        }

        //place leashes
        if (parentCenter !== undefined) {
          pathLeash.setAttributeNS(
            null,
            "d",
            `M ${[xy[0]]} ${xy[1]} C ${xy[0]} ${xy[1] * 0.9}, ${
              parentCenter[0]
            } ${parentCenter[1] / 0.9}, ${parentCenter[0]} ${parentCenter[1]}`
          );
          svgLeash.appendChild(pathLeash);
        }
      }
    }
  });

  return <svg className="node_leash" id="svgLeash"></svg>;
}

function MainCard(props) {
  ecxlNodes = props.graph.exclNodes;
  // console.log(props.graph.exclNodes)
  const forceUpdate = useForceUpdate();
  return (
    <>
      <Leashes lsh={leashes} />
      <GraphWrapper graph={props.graph} upd={forceUpdate} />
      {/* <svg className="node_leash" id="svgLeash"></svg> */}
    </>
  );
}

export { MainCard, useForceUpdate };
