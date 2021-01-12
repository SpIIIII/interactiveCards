import React from "react";
import "./styles.css";
import SideBar from "./pages/sideBar";
import {MainCard} from "./pages/mainCard";
import { allNodes } from "./backend/nodes";
import {  Graph } from "./backend/graphs";


export default function App() {
  const graph = new Graph(allNodes);
  return (
    <div className="App">
      <div className="row cont">
        <SideBar />
        <MainCard graph={graph} />
      </div>
    </div>
  );
}