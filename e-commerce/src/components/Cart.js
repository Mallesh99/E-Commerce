import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const usercart = useSelector((state) => state);
  //   const total = usercart.cart.items.reduce((a, b) => a + b.price, 0);
  console.log("Itemsm", usercart);
  return (
    <div className="alert alert-success">
      <h3>Total to pay: Rs. {usercart.cart.bill}/-</h3>
    </div>
  );
};

export default Cart;
