import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import "../css/CartPage.css";
import line6 from "../images/Line 6.svg";
import axios from "axios";
import Form from "react-bootstrap/Form";

const CartPage = () => {
  const [selectedOption, setSelectedOption] = useState("Online Payment");
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
          // console.log(res.data);
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
            {cart.items?.map((item) => {
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
            <p>Discount(-10%)</p>
            <p style={{ float: "right" }}>$15</p>
            <p>Delivery Fee</p>
            <img src={line6} alt="lineimg" />
            <p className="mt-3" style={{ float: "right" }}>
              ${cart.bill - Math.round(0.1 * cart.bill) + 15}
            </p>
            <p className="mt-3">Total</p>

            <button id="applybtn" style={{ float: "right" }}>
              Apply
            </button>
            <Form.Control
              type="search"
              placeholder="Add promo code"
              className="me-2 promocodesearch"
              aria-label="Search"
              style={{ borderRadius: "62px" }}
            />
            <div className="mt-3 radio">
              <label>
                <input
                  type="radio"
                  value="COD"
                  checked={selectedOption === "COD"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                COD
              </label>
              <label className="ms-4">
                <input
                  type="radio"
                  value="Online Payment"
                  checked={selectedOption === "Online Payment"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                Online Payment
              </label>
            </div>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="email" placeholder="Enter delivery address" />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="number" placeholder="Enter mobile number" />
            </Form.Group>
            <button id="cartbtn" style={{ width: "100%" }} className="mt-3">
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CartPage;
