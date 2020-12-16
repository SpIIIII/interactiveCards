import React from "react";
import "./styles.css";
import SideBar from "./pages/sideBar";

export default function App() {
  return (
    <div className="App row">
      {/* <div clssName="header"></div> */}
      <div className="mainCard col"></div>
      <SideBar />
    </div>
  );
}
