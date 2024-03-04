import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import "../css/CartPage.css";
import line6 from "../images/Line 6.svg";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState();
  async function fetch() {
    try {
      await axios
        .get(
          `http://localhost:8000/cart/${
            JSON.parse(window.localStorage.getItem("admin")).id
          }`
        )
        .then((res) => {
          console.log(res.data);
          setCart(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch();
  }, [cart]);

  return (
    cart != null && (
      <div className="container cartpage fontsato mb-4">
        <h1 className="mt-4 mb-4 fontIntegral700">YOUR CART</h1>
        <div className="cartitems">
          <div className="border2px citems">
            {cart.items.map((item) => {
              return (
                <CartCard
                  img={item.image}
                  title={item.name}
                  cost={item.price}
                  id={item.itemId}
                  quantity={item.quantity}
                  size={item.size}
                  color={item.color}
                />
              );
            })}
          </div>
          <div className="border2px ordsum">
            <h2>Order Summary</h2>
            <p style={{ float: "right" }}>${cart.bill}</p>
            <p>Subtotal</p>
            <p style={{ float: "right", color: "red" }}>
              -${Math.round(0.1 * cart.bill)}
            </p>
            <p>Discount</p>
            <p style={{ float: "right" }}>$15</p>
            <p>Delivery Fee</p>
            <img src={line6} alt="lineimg" />
            <p className="mt-3" style={{ float: "right" }}>
              ${cart.bill - Math.round(0.1 * cart.bill) + 15}
            </p>
            <p className="mt-3">Total</p>

            <button id="cartbtn" style={{ width: "100%" }}>
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CartPage;
