import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import Node from "./nodes/nodes";

let ecxlNodes = ["Приветствие"];
let leashes = [];

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

function GraphWrapper(props) {
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

    for (let i of node) {
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
    rows.push(<div className={classes}>{nodes}</div>);
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
  const findParentCenter = (titles = ["Приветствие"]) => {
    let nodes = titles.map((x) => document.getElementById(x));
    nodes = nodes.filter((x) => x !== null);
    const centers = nodes.map((x) => [
      x.offsetLeft + x.offsetWidth / 2,
      x.offsetTop + x.offsetHeight - 10
    ]);
    const relativeCenterCords = centers.map((x) => [x[0], x[1]]);
    return relativeCenterCords;
  };
  const findChildCenter = (titles = "Приветствие") => {
    const node = document.getElementById(titles);
    const center = [(node.offsetLeft + node.offsetWidth / 2 )+10, node.offsetTop];
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
      const relativeParentCenters = findParentCenter(pair[1]);
      for (let parentCenter of relativeParentCenters) {
        let pathLeash = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        //color leashes
        if ([pair[0],...pair[1]].every(x=>ecxlNodes.includes(x))){
          pathLeash.classList.add("select_leash")
        }else if(pair[1].every(x=>ecxlNodes.includes(x))){
          console.log("start", pair[0])
          console.log([...pair[1]], ecxlNodes)
          pathLeash.classList.add("pre_select_leash");
        }

          pathLeash.classList.add("path_leash");
        

        //plase leashes
        for (let x of relativeParentCenters) {
          pathLeash.setAttributeNS(
            null,
            "d",
            `M ${[xy[0]]} ${xy[1]} C ${xy[0]} ${xy[1] * 0.8}, ${
              parentCenter[0]
            } ${parentCenter[1] / 0.8}, ${parentCenter[0]} ${parentCenter[1]}`
          );
          svgLeash.appendChild(pathLeash);
        }
      }
    }
  });

  return <svg className="node_leash" id="svgLeash"></svg>;
}

function MainCard(props) {
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
