import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";
import { AxiosConfig } from "../axiosConfig";

import { toast } from "react-toastify";
import { style } from "@mui/system";

const AddCoupon = () => {
  const [couponCode, setCouponCode] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [discount, setDiscount] = useState();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!couponCode) {
      newErrors.couponCode = "Coupon Code is required";
      isValid = false;
    }
    if (!discount) {
      newErrors.discount = "Discount is required";
      isValid = false;
    } else if (discount <= 0 || discount > 100) {
      newErrors.discount = "Enter valid discount";
      isValid = false;
    }
    if (!startDate) {
      newErrors.startDate = "Start Date is required";
      isValid = false;
    }
    if (!endDate) {
      newErrors.endDate = "End Date is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    e.preventDefault();

    if (validateForm()) {
      try {
        await AxiosConfig.post("/coupons/addCoupon", {
          couponCode,
          startDate,
          endDate,
          discount,
        });
        navigate("/coupons");
        toast("Coupon Added", {
          style: { background: "#fff2df" },
        });
        //   alert("Coupon Added");
        // console.log(data);
      } catch (err) {
        // console.log(err);
        if (err.response.data.message) {
          toast(err.response.data.message, {
            style: { background: "#fff2df" },
          });
        }
      }
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
          {errors.couponCode && (
            <div className="validationError">{errors.couponCode}</div>
          )}
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
          {errors.startDate && (
            <div className="validationError">{errors.startDate}</div>
          )}
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
          {errors.endDate && (
            <div className="validationError">{errors.endDate}</div>
          )}
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
          {errors.discount && (
            <div className="validationError">{errors.discount}</div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Coupon
        </Button>
      </Form>
    </div>
  );
};

export default AddCoupon;
