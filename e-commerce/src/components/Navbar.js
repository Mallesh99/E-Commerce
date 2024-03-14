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
import { useSelector } from "react-redux";

function BasicExample() {
  const cart = useSelector((state) => state.cart);
  const { category, setCategory } = useCategory();
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("admin"));
  // console.log(user);

  //addtocart
  // async function addtocart() {
  //   try {
  //     const config = {
  //       owner: JSON.parse(window.localStorage.getItem("admin")).id,
  //       items: cart.cart,
  //       bill: cart.bill,
  //     };
  //     await axios.post("http://localhost:8000/cart", config).then((res) => {
  //       // console.log(res.data);
  //       // alert("Item Added to cart");
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  async function logout() {
    // window.localStorage.setItem("cart", JSON.stringify(cart));

    window.localStorage.setItem(
      JSON.parse(window.localStorage.getItem("admin"))?.id,
      JSON.stringify(cart)
    );

    window.localStorage.removeItem("admin");
    window.localStorage.removeItem("persist:root");
    window.location.reload(false);
  }

  const { search, setSearch } = useCategory();

  return (
    <>
      <div>
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
                  onChange={(e) => {
                    setSearch(e.target.value.toLowerCase());
                  }}
                  onClick={() => {
                    navigate(`/categorypage`);
                  }}
                />

                <img
                  src={cartimg}
                  alt="cart"
                  style={{ marginLeft: "30px", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/cartpage");
                  }}
                />
                <a href="#!">
                  <MDBBadge color="danger" notification pill>
                    {cart.cart?.length}
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
                    logout();
                    // window.localStorage.clear();
                    // window.location.reload(false);
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
