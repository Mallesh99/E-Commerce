import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Productcard = (props) => {
  const navigate = useNavigate();
  console.log(props.img.substring(0,7)+"192.168.100.88"+props.img.substring(21))
  return (
    <Card
      style={{
        border: "none",
        cursor: "pointer",
      }}
      className="prodcard tsize"
      onClick={() => {
        navigate(`/${props.id}`);
        return window.scrollTo(0, 0);
      }}
    >
      <Card.Img variant="top" src={props.img.substring(0,7)+process.env.REACT_APP_API_SERVER_IP+props.img.substring(21)} className="card-img " />
      <Card.Body>
        <Card.Title
          className="single-line tsize"
          style={{ fontFamily: "Sato", fontWeight: "700" }}
        >
          {props.title}
        </Card.Title>
        <Card.Text style={{ fontFamily: "Sato", fontWeight: "700" }}>
          ${props.cost}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Productcard;
