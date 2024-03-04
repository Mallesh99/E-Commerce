import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import cartimg from "../images/Frame.svg";
import profileimg from "../images/Vector (2).svg";
import lensimg from "../images/Vector (3).svg";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "./CategoryContext";
import Button from "react-bootstrap/esm/Button";

function BasicExample() {
  const { category, setCategory } = useCategory();
  const navigate = useNavigate();
  return (
    <>
      <div style={{ display: "inline" }}>
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
                {/* <Button variant="outline-success">Search</Button> */}
                <img
                  src={cartimg}
                  alt="cart"
                  style={{ marginLeft: "30px", cursor: "pointer" }}
                  onClick={() => navigate("/cartpage")}
                />

                <img
                  src={profileimg}
                  alt="profile"
                  style={{ marginLeft: "9px" }}
                />
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default BasicExample;
