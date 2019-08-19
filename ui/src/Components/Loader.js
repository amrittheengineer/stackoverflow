import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class Loader extends React.Component {
  render() {
    return (
      <Container style={{ paddingTop: "10%" }}>
        <Row className="justify-content-center">
          <Col className="align-self-center text-center">
            <div className="lds-ring">
              <div> </div>
              <div> </div>
              <div> </div>
              <div> </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Loader;
