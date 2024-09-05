import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import a1 from "../images/a1.svg";
import delicon from "../images/delicon.svg";
import minus from "../images/Vector.svg";
import plus from "../images/Vector-1.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  cartDecrement,
  cartIncrement,
  removeFromCart,
} from "../redux/slices/cartSlice";

const CartCard = (props) => {
  // async function deleteitem() {
  //   try {
  //     await axios
  //       .delete(
  //         `http://localhost:8000/cart/${
  //           JSON.parse(window.localStorage.getItem("user")).id
  //         }?itemId=${props.id}`
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //         // alert("item deleted");
  //         res.status(200).send(res.data);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //     // alert("item not deleted from cart");
  //   }
  // }

  const dispatch = useDispatch();

  const usercart = useSelector((state) => state);
  // console.log(usercart);

  const existincart = usercart?.cart.cart?.find(
    (prod) =>
      props.id === prod.id &&
      props.size === prod.size &&
      props.color === prod.color
  );

  // async function addtocart() {
  //   try {
  //     const config = {
  //       owner: JSON.parse(window.localStorage.getItem("user")).id,
  //       itemId: props.id,
  //       quantity: count,
  //       color: props.color,
  //       size: props.size,
  //     };
  //     await axios.post("http://localhost:8000/cart", config).then((res) => {
  //       // console.log(res.data);
  //       // alert("Item Added to cart");
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  const increase = () => {
    if (existincart) {
      dispatch(
        cartIncrement({
          id: props.id,
          color: props.color,
          size: props.size,
        })
      );
    }
  };
  const decrease = () => {
    if (existincart) {
      dispatch(
        cartDecrement({
          id: props.id,
          color: props.color,
          size: props.size,
        })
      );
    }
  };
  const remove = () => {
    dispatch(
      removeFromCart({
        id: props.id,
        color: props.color,
        size: props.size,
      })
    );
  };
  return (
    <Card className="cardo">
      <Card.Img className="imgprod" variant="top" src={props.img.substring(0,7)+process.env.REACT_APP_API_SERVER_IP+props.img.substring(21)} />

      <Card.Body className="cardbody">
        <Card.Title className="cardtitle">{props.title}</Card.Title>
        <p>Size: {props.size}</p>
        <p>Color: {props.color}</p>

        <Card.Text>${props.cost}</Card.Text>
      </Card.Body>

      <img className="delicon" src={delicon} alt="delicon" onClick={remove} />
      <div className="quantity">
        <img src={minus} alt="minusimg" width={"10px"} onClick={decrease} />
        <p style={{ padding: "2.5px 0 0px 0" }}>{props.quantity}</p>
        <img src={plus} alt="plusimg" width={"10px"} onClick={increase} />
      </div>
    </Card>
  );
};

export default CartCard;
