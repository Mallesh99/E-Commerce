import React, { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import "../css/CartPage.css";
import line6 from "../images/Line 6.svg";

import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllFromCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { AxiosConfig } from "../axiosConfig";
import { toast } from "react-toastify";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);

  const [selectedOption, setSelectedOption] = useState("Online Payment");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [address, setAddress] = useState("");
  const [mobno, setMobno] = useState();
  const [discount, setDiscount] = useState(0);
  const [searchCoupon, setSearchCoupon] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateCoupon = () => {
    let isValid = true;
    const newErrors = {};
    if (!searchCoupon) {
      newErrors.searchCoupon = "Enter Coupon Code";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!address) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (!mobno) {
      newErrors.mobno = "Mobile number is required";
      isValid = false;
    } else if (mobno.length !== 10) {
      newErrors.mobno = "Enter valid Mobile number";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  //for razorpay
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    if (validateForm()) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // creating a new order
      const result = await AxiosConfig.post("/orders/payment", {
        amount:
          (cart.bill -
            Math.round(0.01 * discount * cart.bill) +
            15 +
            Math.round(0.02 * cart.bill)) *
          100,
      });

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      console.log(result.data, "frontend");

      // Getting the order details back
      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_test_NRbhnPD8h5jnEC",
        amount: amount.toString(),
        currency: currency,
        name: "E-Commerce Website",
        description: "Test Transaction",
        // image: { logo },
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await AxiosConfig.post(
            "/orders/payment/success",
            data
          );

          console.log(result.data, "success res");

          // toast(result.data.msg, { style: { background: "#fff2df" } });
          if (result.data.msg === "Payment Successful") {
            setPaymentStatus("Paid");
          }
        },
        prefill: {
          name: "Mallesh",
          email: "mallesh@ecommercewebsite.com",
          contact: "9999999999",
        },
        notes: {
          address: "E-commerce Website Testing",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }

  async function searchcoupon() {
    if (validateCoupon()) {
      try {
        await AxiosConfig.get(`/coupons/getcoupon/${searchCoupon}`).then(
          (res) => {
            setDiscount(res?.data.discount);
            toast("Coupon Applied", { style: { background: "#fff2df" } });
          }
        );
      } catch (err) {
        console.log(err.response, "er");
        toast(err.response.data, { style: { background: "#fff2df" } });
      }
    }
  }

  const dispatch = useDispatch();

  //apis
  function placeorder() {
    if (validateForm()) {
      try {
        AxiosConfig.post("/orders/create", {
          ownerName: JSON.parse(window.localStorage.getItem("user")).fullName,
          owner: JSON.parse(window.localStorage.getItem("user")).id,
          items: cart.cart,
          subTotal: cart.bill,
          tax: Math.round(0.02 * cart.bill),
          discount: Math.round(0.01 * discount * cart.bill),
          grandTotal:
            cart.bill -
            Math.round(0.01 * discount * cart.bill) +
            15 +
            Math.round(0.02 * cart.bill),
          address: address,
          paymentType: selectedOption,
          paymentStatus: paymentStatus,
          mobileNumber: mobno,
        }).then((res) => {
          console.log(res);
          dispatch(deleteAllFromCart());
          navigate("/");

          window.scroll(0, 0);
          toast("Order Placed", { style: { background: "#fff2df" } });
          console.log(res);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  console.log(searchCoupon, "searchcoup");
  useEffect(() => {
    if (paymentStatus === "Paid") {
      placeorder();
    }
  }, [paymentStatus]);

  const imgUrl = process.env.REACT_APP_API_END_POINT;
  return (
    cart != null && (
      <div className="container cartpage fontsato mb-4">
        <h1 className="mt-4 mb-4 fontIntegral700">YOUR CART</h1>
        <div className="cartitems">
          <div className="border2px citems">
            {cart.cart?.map((item) => {
              return (
                <CartCard
                  img={imgUrl + item.image.substring(26)}
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
            {errors.searchCoupon && (
              <div className="validationError">{errors.searchCoupon}</div>
            )}
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
                placeholder="Enter delivery address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              {errors.address && (
                <div className="validationError">{errors.address}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter mobile number"
                name="mobno"
                value={mobno}
                onChange={(e) => setMobno(e.target.value)}
                required
              />
              {errors.mobno && (
                <div className="validationError">{errors.mobno}</div>
              )}
            </Form.Group>
            <button
              id="cartbtn"
              style={{ width: "100%" }}
              className="mt-3 "
              onClick={() =>
                selectedOption === "Online Payment"
                  ? displayRazorpay()
                  : placeorder()
              }
            >
              {selectedOption === "Online Payment"
                ? "Proceed to Payment & Place Order"
                : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CartPage;
