import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class LoadedBody extends React.Component {
  render() {
    return (
      <Container className="body-content">
        <Row className="justify-content-center" style={{ paddingTop: "8%" }}>
          <Col className="align-self-center text-center">
            <h1 className="display-4">Top Relevant Answers</h1>
            {this.props.answerlst}
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ paddingTop: "8%" }}>
          <Col className="align-self-center text-center">
            <h1 className="display-4">Other possible Answers</h1>
            {this.props.noScoreAns}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoadedBody;
