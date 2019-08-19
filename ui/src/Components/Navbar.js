import React from "react";
import { Navbar } from "react-bootstrap";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar
        expand="lg"
        style={{
          zIndex: "5",
          backgroundColor: "#F48024",
          position: "fixed",
          width: "100%"
        }}
      >
        <Navbar.Brand href="#">
          stack<span style={{ fontWeight: "bold" }}>overflow</span> Searcher
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavBar;
