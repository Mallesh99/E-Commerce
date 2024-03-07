import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import a1 from "../images/a1.svg";
import delicon from "../images/delicon.svg";
import minus from "../images/Vector.svg";
import plus from "../images/Vector-1.svg";
import axios from "axios";

const CartCard = (props) => {
  async function deleteitem() {
    try {
      await axios
        .delete(
          `http://localhost:8000/cart/${
            JSON.parse(window.localStorage.getItem("admin")).id
          }?itemId=${props.id}`
        )
        .then((res) => {
          console.log(res.data);
          // alert("item deleted");
          res.status(200).send(res.data);
        });
    } catch (err) {
      console.log(err);
      // alert("item not deleted from cart");
    }
  }

  const [count, setCount] = useState(props.quantity);

  async function addtocart() {
    try {
      const config = {
        owner: JSON.parse(window.localStorage.getItem("admin")).id,
        itemId: props.id,
        quantity: count,
        color: props.color,
        size: props.size,
      };
      await axios.post("http://localhost:8000/cart", config).then((res) => {
        // console.log(res.data);
        // alert("Item Added to cart");
      });
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Card className="cardo">
      <Card.Img className="imgprod" variant="top" src={props.img} />

      <Card.Body className="cardbody">
        <Card.Title className="cardtitle">{props.title}</Card.Title>
        <p>Size: {props.size}</p>
        <p>Color: {props.color}</p>

        <Card.Text>${props.cost}</Card.Text>
      </Card.Body>

      <img
        className="delicon"
        src={delicon}
        alt="delicon"
        onClick={() => {
          deleteitem();
        }}
      />
      <div className="quantity">
        <img
          src={minus}
          alt="minusimg"
          width={"10px"}
          onClick={() => {
            setCount(count - 1);
          }}
        />
        <p style={{ padding: "2.5px 0 0px 0" }}>{count}</p>
        <img
          src={plus}
          alt="plusimg"
          width={"10px"}
          onClick={() => {
            setCount(count + 1);
            console.log(count);
            addtocart();
          }}
        />
      </div>
    </Card>
  );
};

export default CartCard;
