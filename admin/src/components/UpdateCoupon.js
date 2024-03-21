import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useNavigate, useLocation } from "react-router-dom";
import { AxiosConfig } from "../axiosConfig";

const UpdateCoupon = () => {
  const location = useLocation();
  const coupon = location.state;
  const [couponCode, setCouponCode] = useState(coupon.couponCode);
  const [startDate, setStartDate] = useState(coupon.startDate);
  const [endDate, setEndDate] = useState(coupon.endDate);
  const [discount, setDiscount] = useState(coupon.discount);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();

    e.preventDefault();

    try {
      await AxiosConfig.patch(`/coupons/${coupon._id}`, {
        couponCode,
        startDate,
        endDate,
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
            name="couponCode"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Select Coupon Start Date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Select Coupon End Date"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
          Update Coupon
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCoupon;
