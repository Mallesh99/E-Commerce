import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { AxiosConfig } from "../axiosConfig";

const statusOptions = [
  { value: "New", label: "New" },
  { value: "Shipped", label: "Shipped" },
  { value: "Out for Delivery", label: "Out for Delivery" },
  { value: "Delivered", label: "Delivered" },
];

const UpdateOrder = () => {
  const location = useLocation();
  const order = location.state;
  console.log(location, "order");
  const navigate = useNavigate();

  const [status, setStatus] = useState(order.status);

  const handleSubmit = (e) => {
    e.preventDefault();

    AxiosConfig.patch(`/orders/${order._id}`, {
      status,
    })
      .then((res) => {
        // console.log(res.data);
        navigate("/orders");
        // alert("order Updated");
      })
      .catch((err) => {
        console.log(err);
        alert("order not Updated");
        err = new Error();
      });
  };
  return (
    <div
      className="mt-5"
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
          <Form.Label>Choose Order Status</Form.Label>
          <Select
            options={statusOptions}
            onChange={(status) => {
              setStatus(status.value);
              //   console.log(status.value, "status");
            }}
            value={status.value}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update order
        </Button>
      </Form>
    </div>
  );
};

export default UpdateOrder;
