import React from "react";
import "./styles.css";
import SideBar from "./pages/sideBar";
import MainCard from "./pages/mainCard";

export default function App() {
  return (
    <div className="App row">
      <SideBar />
      <MainCard />
    </div>
  );
}
