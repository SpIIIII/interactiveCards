import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";

const first = (
  <span className="sideBarPunktIcon">
    <FontAwesomeIcon icon={faBookmark} />
  </span>
);
const second = (
  <span className="sideBarPunktIcon">
    <FontAwesomeIcon icon={faBuffer} />
  </span>
);

function SideBarPunct(props) {
  const [selected, togSelect] = useState(false);
  const subPunktsRef = useRef(null);
  const arrowRef = useRef(null);

  const makeHovered = (x) => {
    x.currentTarget.classList.add("barTextPreSelect");
  };
  const makeUnHovered = (x) => {
    x.currentTarget.classList.remove("barTextPreSelect");
  };

  const makeSelected = (x) => {
    if (selected) {
      arrowRef.current.childNodes[0].classList.remove("sideBarArrowSelected");
      subPunktsRef.current.style.display = "none";
      x.currentTarget.classList.remove("barTextSelect");
    } else {
      arrowRef.current.childNodes[0].classList.add("sideBarArrowSelected");
      subPunktsRef.current.style.display = "block";
      x.currentTarget.classList.add("barTextSelect");
    }
    togSelect(!selected);
  };

  const subPunktClick = () => {
    props.graph.excludeNodes( [ "Приветствие", "Нет интернета", "Нет сессии", "Нет линка", "Такиеже проблемы у соседей", "Передать информацию диспеnчеру" ]);
    props.upd();
  };
  
  let sideBarPunktName
  let sideBarrArrow

  if(props.size===1){
    sideBarPunktName = "smallSideBarPunktName"
    sideBarrArrow = "sideBarArrow smallSideBarArrow"
    
  }else{

    sideBarPunktName = ""
    sideBarrArrow = "sideBarArrow"
  }


  return (
    <li className="sideBarPunkts">
      <div
        className="sideBarPunkt dont_select_text"
        onClick={makeSelected}
        onMouseEnter={makeHovered}
        onMouseLeave={makeUnHovered}
      >
        {props.icon}
        <span className={sideBarPunktName}>{props.name}</span>
        <div className={sideBarrArrow} ref={arrowRef}>
          <FontAwesomeIcon className="FAArrow" icon={faChevronRight} />
        </div>
      </div>
      <ul className="sideBarSubPunkts dont_select_text" ref={subPunktsRef}>
        <li
          className="sideBarSubPunkt"
          onMouseEnter={makeHovered}
          onMouseLeave={makeUnHovered}
          onClick={subPunktClick}
        >
          Общаяя проблема
        </li>
      </ul>
    </li>
  );
}

function SideBar(props) {
  const thisElemRef = useRef();
  
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  const barSize = useWindowSize()[0] > 880 ? "sideBarOrdinar" : "sideBarSmall";
  const barPunctSize = useWindowSize()[0] > 880 ? 0 : 1;
  const classNmaes = " barText header_style sideBarFixed sideBar " + barSize;
  return (
    <>
      <div className="fakeBar col-sm-2"></div>
      <ul className={classNmaes} ref={thisElemRef}>
        <SideBarPunct
          name={"Шаблоны"}
          icon={first}
          graph={props.graph}
          upd={props.upd}
          size = {barPunctSize}
        />
        <SideBarPunct
          name={"Другое"}
          icon={second}
          graph={props.graph}
          upd={() => {
            console.log("don't do a thing");
          }}
          size={barPunctSize}
        />
        {/* <SideBarPunct />        
          <SideBarPunct />        
          <SideBarPunct />        
          <SideBarPunct /> */}
      </ul>
    </>
  );
}

export default SideBar;
