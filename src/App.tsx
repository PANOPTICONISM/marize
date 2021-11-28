import React from "react";
import logo from "./logo.svg";
import style from "./App.module.css";

function App() {
  return (
    <div className={style.app}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
