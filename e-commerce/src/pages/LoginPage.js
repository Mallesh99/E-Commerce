import "../css/LoginPage.css";
import React, { useState } from "react";
import bgimg from "../images/91fa59e6781adbdced82e349bb595d99 1.svg";
import or from "../images/Frame 18.svg";
import goog from "../images/Google.svg";
import micr from "../images/Microsoft.svg";
// import rec2 from "../images/Rectangle 2@2x.svg";

import { Link } from "react-router-dom";
import { AxiosConfigWithoutInterceptor } from "../axiosConfig";

const LoginPage = () => {
  //start

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("Submitted!!");
    console.log("hi");
    AxiosConfigWithoutInterceptor.post("/users/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res);
        setLogin(true);
        // alert("Logged In!!");
        window.localStorage.setItem("user", JSON.stringify(res?.data));
        window.location.reload(false);
        if (
          JSON.parse(
            window.localStorage.getItem(
              JSON.parse(window.localStorage.getItem("user"))?.id
            )
          ) === null
        ) {
          window.localStorage.setItem(
            JSON.parse(window.localStorage.getItem("user"))?.id,
            JSON.stringify({
              cart: [],
              bill: 0,
              _persist: { version: -1, rehydrated: true },
            })
          );
        }
        // window.localStorage.setItem(
        //   "persist:root",

        //   window.localStorage.getItem(
        //     JSON.parse(window.localStorage.getItem("user"))?.id
        //   )
        // );
      })
      .catch((err) => {
        // alert(err.response.data.message);
        alert("Wrong Credentials");
        err = new Error();
      });
  };

  //end

  return (
    <div className="page ">
      <div className="info ">
        <div id="welcome">
          <h1>Hey</h1>
          <h1>Welcome Back!</h1>
          <p>We are very happy to see you back!</p>
        </div>
        <div className="hello">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div
              className="form-control"
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
              className="form-control"
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
                Login
              </button>
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
                width: "420px",
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

            <p className="mt-2">
              Don’t have account? <Link to="/register">Sign Up here!</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-img">
        <img src={bgimg} alt="background" width={"100%"} height={"100%"} />
      </div>
    </div>
  );
};

export default LoginPage;
