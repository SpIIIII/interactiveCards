import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";
import { faSlidersH, faRedoAlt } from "@fortawesome/free-solid-svg-icons";

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
const third = (
  <span className="sideBarPunktIcon">
    <FontAwesomeIcon icon={faSlidersH} />
  </span>
);
const redo = (
  <span className="sideBarPunktIcon">
    <FontAwesomeIcon icon={faRedoAlt} />
  </span>
);

function SideBarSubPunct(props) {
  const makeHovered = (x) => {
    x.currentTarget.classList.add("barTextPreSelect");
  };
  const makeUnHovered = (x) => {
    x.currentTarget.classList.remove("barTextPreSelect");
  };
  const subPunktEffect = () => {
    props.effect();
  };
  return (
    <li
      className="sideBarSubPunkt"
      onMouseEnter={makeHovered}
      onMouseLeave={makeUnHovered}
      onClick={subPunktEffect}
    >
      {props.name}
    </li>
  );
}

function SideBarPunkt(props) {
  const [selected, togSelect] = useState(false);
  const subPunktsRef = useRef(null);
  const arrowRef = useRef(null);
  let sideBarPunktName;
  let sideBarrArrow;
  const subPunktsDone = [];

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

  if (props.size === 1) {
    sideBarPunktName = "smallSideBarPunktName";
    sideBarrArrow = "sideBarArrow smallSideBarArrow";
  } else {
    sideBarPunktName = "";
    sideBarrArrow = "sideBarArrow";
  }

  for (let punkt in props.sub) {
    subPunktsDone.push(
      <SideBarSubPunct name={punkt} effect={props.sub[punkt]} />
    );
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
        {subPunktsDone}
      </ul>
    </li>
  );
}

function MACVendor(props) {
  useEffect(() => {
    const Http = new XMLHttpRequest();
    const url = "https://api.macvendors.com/FC:FB:FB:01:FA:21";
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
      console.log(Http.responseType);
    };
  }, []);
  const test = () => {
    console.log(test);
  };

  return (
    <>
      <input
        className="macVenderInput"
        type="text"
        placeholder="test"
        maxlength="17"
      />
    </>
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

  const punktsList = {
    Шаблоны: {
      icon: first,
      sub: {
        "Общая проблема": () => {
          props.graph.excludeNodes([
            "Приветствие",
            "Нет интернета",
            "Нет сессии",
            "Нет линка",
            "Такиеже проблемы у соседей",
            "Передать информацию диспеnчеру"
          ]);
          props.upd();
        }
      }
    },
    Настройки: {
      icon: third,
      sub: {
        "plase holder": () => {
          console.log("don't do a thing");
        }
      }
    }
  };

  const punktsListDone = [];
  // useEffect(() => {
  for (let punkt in punktsList) {
    punktsListDone.push(
      <SideBarPunkt
        name={punkt}
        icon={punktsList[punkt].icon}
        size={barPunctSize}
        sub={punktsList[punkt].sub}
      />
    );
  }
  // },[]);
  const clear = () => {
    props.graph.excludeNodes(["Приветствие"]);
    props.upd();
  };
  const makeHovered = (x) => {
    x.currentTarget.classList.add("barTextPreSelect");
  };
  const makeUnHovered = (x) => {
    x.currentTarget.classList.remove("barTextPreSelect");
  };
  return (
    <>
      <div className="fakeBar col-sm-2"></div>
      <ul className={classNmaes} ref={thisElemRef} id={"sideList"}>
        <div
          className={"sideBarRedo"}
          onMouseEnter={makeHovered}
          onMouseLeave={makeUnHovered}
          onClick={clear}
        >
          {redo}
        </div>
        {punktsListDone}
        <MACVendor />
      </ul>
      {/* <div>test</div> */}
    </>
  );
}

export default SideBar;
