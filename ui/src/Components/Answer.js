import React from "react";
import { Card } from "react-bootstrap";

class Answer extends React.Component {
  render() {
    return (
      <Card style={{ margin: "7%" }}>
        <Card.Body>
          <Card.Text>{this.props.answer}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Answer;
