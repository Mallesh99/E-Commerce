import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <MDBFooter
      style={{ backgroundColor: "#f0f0f0" }}
      className="text-center text-lg-start text-muted"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4"></section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5 border-bottom">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h1
                className="text-uppercase fw-bold mb-4"
                style={{ fontFamily: "Archivo Black", fontWeight: "700" }}
              >
                <MDBIcon icon="gem" className="me-1" />
                SHOP.CO
              </h1>
              <p>
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div>
                <a href="https://www.youtube.com/" className="youtube social">
                  <FontAwesomeIcon icon={faYoutube} size="2x" color="#000000" />
                </a>
                <a href="https://www.facebook.com/" className="facebook social">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    color="#000000"
                  />
                </a>
                <a href="https://www.twitter.com/" className="twitter social">
                  <FontAwesomeIcon icon={faTwitter} size="2x" color="#000000" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  className="instagram social"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    color="#000000"
                  />
                </a>
                <a href="https://www.github.com/" className="instagram social">
                  <FontAwesomeIcon icon={faGithub} size="2x" color="#000000" />
                </a>
              </div>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4 ">
              <h6 className="text-uppercase fw-bold mb-4">COMPANY</h6>
              <p>
                <a
                  href="#!"
                  className="text-reset "
                  style={{ textDecoration: "none" }}
                >
                  About
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ textDecoration: "none" }}
                  className="text-reset"
                >
                  Features
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Works
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Career
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">HELP</h6>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Customer Support
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Delivery Details
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Terms & Conditions
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Privacy Policy
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">FAQ</h6>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Account
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Manage Deliveries
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Orders
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Payments
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">RESOURCES</h6>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Free eBooks
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Development Tutorial
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  How to-Blog
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Youtube Playlist
                </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        style={{
          backgroundColor: "#F0F0F0",
          marginLeft: "6vw",
        }}
        className=" p-4"
      >
        {/* © 2021 Copyright: */}
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          Shop.co © 2000-2023, All Rights Reserved
        </a>
      </div>
    </MDBFooter>
  );
}
