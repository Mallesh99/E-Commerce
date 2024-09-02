import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Home from "./Home";
import { useNavigate } from "react-router-dom";
import log from "../images/power-off.png";
import { AxiosConfigWithoutInterceptor } from "../axiosConfig";
import "../css/LoginPage.css";
// import bgimg from "../images/bgimg.png";
// import bgimg from "../images/bgimg.webp";
import bgimg from "../images/vecteezy_office_508710.jpg";
import or from "../images/Frame 18.svg";
import goog from "../images/Google.svg";
import micr from "../images/Microsoft.svg";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("Submitted!!");

    if (validateForm()) {
      AxiosConfigWithoutInterceptor.post("/admin/loginAdmin", {
        email,
        password,
      })
        .then((res) => {
          console.log(res.data);
          window.localStorage.setItem("admin", JSON.stringify(res?.data));
          navigate("/");
          window.location.reload(false);
        })
        .catch((err) => {
          // console.log(err);
          // alert("Wrong Credentials");
          toast("Wrong Credentials", { style: { background: "#fff2df" } });
          err = new Error();
        });
    }
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = pattern.test(email);
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail) {
      newErrors.email = "Enter correct Email";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="page ">
      <div className="info">
        <div id="welcome">
          <h1>Hi there, Admin</h1>

          <p>Happy to see you back!</p>
        </div>
        <div className="hello">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="validationError">{errors.email}</div>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="validationError">{errors.password}</div>
                )}
              </Form.Group>
            </div>

            <div
              className="form-control"
              style={{ border: "none", padding: "0" }}
            >
              <label></label>
              <button type="submit">Login</button>
            </div>

            {/* {register ? (
              <p className="text-success">You Are Registered Successfully</p>
            ) : (
              <p className="text-danger">You Are Not Registered</p>
            )} */}
          </form>
          <div className="fromor">
            <img
              src={or}
              alt="or"
              style={{
                width: "350px",
              }}
            />

            <div id="orlogins" className=" mt-1">
              <button id="g" style={{ fontSize: "13px" }}>
                <div>
                  <img
                    src={goog}
                    alt="google"
                    style={{
                      width: "30.4px",
                      height: "30.4",
                      radius: "15.9px",
                    }}
                  />
                </div>
                Login with Google
              </button>
              <button id="m" style={{ fontSize: "13px" }}>
                <div>
                  <img
                    src={micr}
                    alt="microsoft"
                    style={{
                      width: "30.4px",
                      height: "30.4",
                      radius: "15.9px",
                    }}
                  />
                </div>
                Login with Microsoft
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-img">
        <img src={bgimg} alt="background" width={"100%"} height={"100%"} />
      </div>
    </div>
  );
};

export default Login;
