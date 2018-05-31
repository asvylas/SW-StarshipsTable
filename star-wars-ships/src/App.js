import React, { Component } from "react";
import Header from "./components/Header";
import Starships from "./components/Starships";
import "./styles/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Starships />
      </div>
    );
  }
}

export default App;
