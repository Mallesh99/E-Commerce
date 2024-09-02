import Card from "react-bootstrap/Card";
import React from "react";

const ReviewCard = (props) => {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.review}</Card.Text>
        <Card.Text>Posted on August 14, 2023</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
