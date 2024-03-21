import "../css/LoginPage.css";
import React, { useState } from "react";
import bgimg from "../images/91fa59e6781adbdced82e349bb595d99 1.svg";
// import rec2 from "../images/Rectangle 2@2x.svg";

import { Link } from "react-router-dom";
import { AxiosConfigWithoutInterceptor } from "../axiosConfig";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    // alert("Submitted!!");

    AxiosConfigWithoutInterceptor.post("/users/register", {
      fullName,
      email,
      password,
    })
      .then((res) => {
        // console.log(res);

        alert("Registered!!");
      })
      .catch((err) => {
        // console.log(err);
        err = new Error();
      });
  };

  return (
    <div className="page">
      <div className="info " style={{ marginTop: "10vh" }}>
        <div id="welcome">
          <h1>Hello there!</h1>
          <h4 style={{ color: "#7e8b9e" }}>Register here using email</h4>
        </div>
        <div className="hello">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div
              className="form-control mt-3"
              style={{ border: "none", padding: "0" }}
            >
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div
              className="form-control mt-3"
              style={{ border: "none", padding: "0" }}
            >
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className="form-control mt-3"
              style={{ border: "none", padding: "0" }}
            >
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div
              className="form-control"
              style={{ border: "none", paddingLeft: "0" }}
            >
              <label className="abc">
                <input type="checkbox" />
                By signing up, you are creating a COMMIT account, and
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you agree to COMMIT’s Term of Use
                and Privacy Policy.
              </label>
              <label className="abc">
                <input type="checkbox" />
                Remember Me as Member of COMMIT Community.
              </label>
            </div>
            <div
              className="form-control"
              style={{ border: "none", padding: "0" }}
            >
              <label></label>
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                Register
              </button>
            </div>
          </form>

          <p className="center-all mt-2">
            Already have an account? <Link to="/login">Sign In here!</Link>{" "}
          </p>
        </div>
      </div>
      <div className="bg-img">
        <img src={bgimg} alt="background" width={"100%"} height={"100%"} />
      </div>
    </div>
  );
};

export default RegisterPage;
