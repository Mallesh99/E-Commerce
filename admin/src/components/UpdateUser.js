import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useLocation, useNavigate } from "react-router-dom";
import { AxiosConfig } from "../axiosConfig";

const UpdateUser = () => {
  const location = useLocation();
  const user = location.state;

  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();

    AxiosConfig.patch(`/users/${user._id}`, {
      email,
    })
      .then((res) => {
        // console.log(res.data);
        // alert("User Updated");
        navigate("/users");
      })
      .catch((err) => {
        // console.log(err);
        alert("Item not Updated");
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
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update User Email
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
