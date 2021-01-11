import React from "react";
import "./styles.css";
import SideBar from "./pages/sideBar";
import {MainCard} from "./pages/mainCard";

export default function App() {
  
  return (
    <div className="App">
      <div className="row cont">
        <SideBar />
        <MainCard />
      </div>
    </div>
  );
}