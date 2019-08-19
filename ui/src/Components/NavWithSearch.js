import React from "react";
import { Navbar, InputGroup, FormControl } from "react-bootstrap";

class NavWithSearch extends React.Component {
  render() {
    return (
      <Navbar
        expand="lg"
        style={{
          backgroundColor: "#F48024",
          position: "fixed",
          width: "100%"
        }}
      >
        <Navbar.Brand href="#">
          stack<span style={{ fontWeight: "bold" }}>overflow</span> Searcher
        </Navbar.Brand>
        <InputGroup
          ref="query"
          onKeyPress={this.props.search}
          size="sm"
          style={{ width: "70%", marginLeft: "20px" }}
        >
          <FormControl aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
      </Navbar>
    );
  }
}

export default NavWithSearch;
