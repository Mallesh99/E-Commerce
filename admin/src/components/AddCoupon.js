import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const [couponcode, setCouponcode] = useState("");
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();
  const [discount, setDiscount] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();

    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/coupons", {
        couponcode,
        startdate,
        enddate,
        discount,
      });
      navigate("/coupons");
      //   alert("Coupon Added");
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="mt-1"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          width: "60%",
          borderStyle: "solid",
          borderWidth: "2.5px",
          borderRadius: "30px",
          padding: "20px",
          borderColor: "#F0F0F0",
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Coupon Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Coupon Code"
            name="couponcode"
            value={couponcode}
            onChange={(e) => setCouponcode(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Select Coupon Start Date"
            name="startdate"
            value={startdate}
            onChange={(e) => setStartdate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Select Coupon End Date"
            name="enddate"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter discount "
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Coupon
        </Button>
      </Form>
    </div>
  );
};

export default AddCoupon;
