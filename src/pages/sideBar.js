import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faBuffer } from '@fortawesome/free-brands-svg-icons'




function SideBarPunct(props) {
  const [selected, togSelect] = useState(false)
  const subPunktsRef = useRef(null);
  const arrowRef = useRef(null)

  const makeHovered = (x) => {
      x.currentTarget.classList.add("barTextPreSelect");
  };
  const makeUnHovered = (x) => {
      x.currentTarget.classList.remove("barTextPreSelect");
  };

  const makeSelected = (x) => {
    if (selected) {
      arrowRef.current.childNodes[0].classList.remove("sideBarArrowSelected")
      subPunktsRef.current.style.display = "none"
      x.currentTarget.classList.remove("barTextSelect")
    }
    else{
      arrowRef.current.childNodes[0].classList.add("sideBarArrowSelected")
      subPunktsRef.current.style.display = "block"      
      x.currentTarget.classList.add("barTextSelect")
    }
    togSelect(!selected)
  }

  const subPunktClick = () =>{
    props.graph.excludeNodes([ "Приветствие", "Нет интернета", "Есть сессия", "Нет сессии", "Проверить индикацию роутера", "IPoE абонент", "TEST" ])
    props.upd()
  }

  return (
    <li className="sideBarPunkts">
      <div className="sideBarPunkt dont_select_text" onClick={makeSelected} onMouseEnter={makeHovered}  onMouseLeave={makeUnHovered} >
        {props.icon}
        <span>{props.name}</span>
        <div className="sideBarArrow" ref={arrowRef} >
          <FontAwesomeIcon className="FAArrow" icon={faChevronRight} />
        </div>
      </div>
      <ul className="sideBarSubPunkts dont_select_text" ref={subPunktsRef}>
        <li className="sideBarSubPunkt"
          onMouseEnter={makeHovered}
         onMouseLeave={makeUnHovered}
         onClick={subPunktClick}>Шаблон 1</li>
      </ul>
    </li>
  );
}

function SideBar(props) {
  const first = <span className="sideBarPunktIcon"><FontAwesomeIcon   icon={faBookmark} /></span>
  const second =  <span className="sideBarPunktIcon"><FontAwesomeIcon   icon={faBuffer} /></span>
  return (
    <>
    <div className="fakeBar col-sm-2"></div>
    <ul className=" barText header_style sideBarFixed col-sm-2 sideBar">
          <SideBarPunct name={"Шаблоны"} icon={first} graph={props.graph} upd={props.upd}/>      
          <SideBarPunct name={"Другое"} icon={second} graph={props.graph} upd={()=>{console.log("don't do a thing")}}/>        
          {/* <SideBarPunct />        
          <SideBarPunct />        
          <SideBarPunct />        
          <SideBarPunct /> */}
    </ul>
    </>
  );
}

export default SideBar;