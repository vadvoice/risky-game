import React from "react";
import ReactDOM from "react-dom";

import { Scene } from "./scene";

import "./styles.scss";

class App extends React.Component {
  render() {
    return <Scene />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
