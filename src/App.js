import React, {useState} from "react";
import "./styles.css";
import SideBar from "./pages/sideBar";
import {MainCard,} from "./pages/mainCard";
import { allNodes } from "./backend/nodes";
import {  Graph } from "./backend/graphs";

const settings = require("./backend/settings.json")
const graph = new Graph(allNodes);
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

export default function App() {
  const upd = useForceUpdate()
  return (
    <div className="App">
      <div className="row cont">
        <SideBar graph={graph}  upd={upd} set={settings}/>
        <MainCard graph={graph} set={settings}/>
      </div>
    </div>
  );
}