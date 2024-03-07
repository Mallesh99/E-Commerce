import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import cartimg from "../images/Frame.svg";
import profileimg from "../images/Vector (2).svg";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "./CategoryContext";
import { MDBBadge, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";

function BasicExample() {
  const { category, setCategory } = useCategory();
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("admin"));
  // console.log(user);

  const [cart, setCart] = useState();
  async function fetch() {
    try {
      await axios
        .get(
          `http://localhost:8000/cart/${
            JSON.parse(window.localStorage.getItem("admin")).id
          }`
        )
        .then((res) => {
          // console.log(res.data);
          setCart(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch();
  }, [cart]);

  return (
    <>
      <div style={{ display: "inline", maxHeight: "100%" }}>
        <div id="discount" className="center-all">
          <p>
            Sign up and get 20% off to your first order.{" "}
            <Link to="/register" style={{ color: "white" }}>
              Sign Up Now
            </Link>
          </p>
        </div>

        <Navbar expand="lg" className="bg-body-tertiary fontsato">
          <Container>
            <Navbar.Brand
              id="nav-title"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              SHOP.CO
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() => {
                    navigate("/categorypage");
                    setCategory("Top-Selling");
                  }}
                >
                  Top-Selling
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/categorypage");
                    setCategory("New-Arrivals");
                  }}
                >
                  New Arrivals
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search for products..."
                  className="me-2"
                  aria-label="Search"
                  style={{ borderRadius: "62px" }}
                />

                <img
                  src={cartimg}
                  alt="cart"
                  style={{ marginLeft: "30px", cursor: "pointer" }}
                  onClick={() => navigate("/cartpage")}
                />
                <a href="#!">
                  <MDBBadge color="danger" notification pill>
                    {cart?.items.length}
                  </MDBBadge>
                </a>

                {/* <img
                  src={cartimg}
                  alt="cart"
                  style={{ marginLeft: "30px", cursor: "pointer" }}
                  onClick={() => navigate("/cartpage")}
                /> */}

                <img
                  src={profileimg}
                  alt="profile"
                  style={{ marginLeft: "9px", cursor: "pointer" }}
                  onClick={() => {
                    window.localStorage.clear();
                    window.location.reload(false);
                  }}
                />
              </Form>
              <p className="mt-3 ms-2">Hi, {user.fullname}</p>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default BasicExample;
