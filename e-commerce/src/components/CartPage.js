import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import "../css/CartPage.css";
import line6 from "../images/Line 6.svg";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllFromCart } from "../redux/slices/cartSlice";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);

  const [selectedOption, setSelectedOption] = useState("Online Payment");
  const [address, setAddress] = useState("");
  const [mobno, setMobno] = useState();
  const [discount, setDiscount] = useState(0);
  const [searchCoupon, setSearchCoupon] = useState("");

  async function searchcoupon() {
    try {
      await axios
        .get(`http://localhost:8000/getcoupon/${searchCoupon}`)
        .then((res) => {
          console.log(res, "malsh");
          console.log(res, "cartpage");
          setDiscount(res?.data.discount);
        });
    } catch (err) {
      console.log(err);
    }
  }

  const dispatch = useDispatch();

  //apis
  function placeorder() {
    try {
      axios
        .post("http://localhost:8000/orders", {
          ownerName: JSON.parse(window.localStorage.getItem("admin")).fullname,
          owner: JSON.parse(window.localStorage.getItem("admin")).id,
          items: cart.cart,
          subtotal: cart.bill,
          tax: Math.round(0.02 * cart.bill),
          discount: Math.round(0.01 * discount * cart.bill),
          grandtotal:
            cart.bill -
            Math.round(0.01 * discount * cart.bill) +
            15 +
            Math.round(0.02 * cart.bill),
          status: "New",
          address: address,
          paymentType: selectedOption,
          paymentStatus: "Pending",
          mobilenumber: mobno,
        })
        .then((res) => {
          dispatch(deleteAllFromCart());
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  }

  console.log(searchCoupon, "searchcoup");

  return (
    cart != null && (
      <div className="container cartpage fontsato mb-4">
        <h1 className="mt-4 mb-4 fontIntegral700">YOUR CART</h1>
        <div className="cartitems">
          <div className="border2px citems">
            {cart.cart?.map((item) => {
              return (
                <CartCard
                  img={item.image}
                  title={item.name}
                  cost={item.price}
                  id={item.id}
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
            {discount > 0 ? (
              <>
                <p style={{ float: "right", color: "red" }}>
                  -${Math.round(0.01 * discount * cart.bill)}
                </p>
                <p>Discount(-{discount}%)</p>
              </>
            ) : (
              ""
            )}

            <p style={{ float: "right" }}>$15</p>
            <p>Delivery Fee</p>
            <p style={{ float: "right" }}>${Math.round(0.02 * cart.bill)}</p>
            <p>Tax</p>
            <img src={line6} alt="lineimg" />
            <p className="mt-3" style={{ float: "right" }}>
              $
              {cart.bill -
                Math.round(0.01 * discount * cart.bill) +
                15 +
                Math.round(0.02 * cart.bill)}
            </p>
            <p className="mt-3">Total</p>

            <button
              id="applybtn"
              style={{ float: "right" }}
              onClick={(e) => searchcoupon()}
            >
              Apply
            </button>
            <Form.Control
              type="search"
              placeholder="Add promo code"
              className="me-2 promocodesearch"
              aria-label="Search"
              style={{ borderRadius: "62px" }}
              name="searchCoupon"
              value={searchCoupon}
              onChange={(e) => setSearchCoupon(e.target.value)}
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
              <Form.Control
                type="email"
                placeholder="Enter delivery address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter mobile number"
                name="mobno"
                value={mobno}
                onChange={(e) => setMobno(e.target.value)}
              />
            </Form.Group>
            <button
              id="cartbtn"
              style={{ width: "100%" }}
              className="mt-3"
              onClick={placeorder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CartPage;
