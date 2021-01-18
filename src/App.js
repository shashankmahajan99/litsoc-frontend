import "./App.css";
import bg from "./photos/Endless-Constellation2.svg";
import React from "react";
import SwipeDrawer from "./components/NavBar/SwipeDrawer";

class App extends React.Component {
  render() {
    return (
      <div
        className="App"
        style={{
          backgroundColor: "#16161a",
          backgroundAttachment: "fixed",
          backgroundImage: `url(${bg})`,
        }}
      >
        <SwipeDrawer />
      </div>
    );
  }
}

export default App;
