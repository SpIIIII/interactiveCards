import React, { useRef, useState } from "react";

function SideBarPunct() {
  const [selected, tagSelect] = useState(false);
  const thisElRef = useRef(null);
  const makeSelect = () => {
    tagSelect(true);
    thisElRef.current.className = "barTextSelect";
  };
  const makePreSelect = () => {
    if (!selected) {
      thisElRef.current.className = "barTextPreSelect";
    }
  };
  const makeUnSelect = () => {
    if (!selected) {
      thisElRef.current.className = "barText";
    }
  };

  return (
    <div
      onClick={makeSelect}
      onMouseEnter={makePreSelect}
      onMouseLeave={makeUnSelect}
      ref={thisElRef}
    >
      тест 1
    </div>
  );
}

function SideBar() {
  return (
    <>
    <div className="fakeBar col-sm-2"></div>
    <div className="sideBar sideBarFixed col-sm-2">
      <ul className="barText header_style">
        <li>
          <SideBarPunct />
        </li>
        <li>
          <SideBarPunct />
        </li>
        <li>
          <SideBarPunct />
        </li>
        <li>
          <SideBarPunct />
        </li>
        <li>
          <SideBarPunct />
        </li>
        <li>
          <SideBarPunct />
        </li>
      </ul>
    </div>
    </>
  );
}

export default SideBar;