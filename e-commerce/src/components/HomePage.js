import React, { useState, useEffect, useContext } from "react";
import "../css/HomePage.css";
import { useNavigate } from "react-router-dom";

import bgimg from "../images/bgimg.png";
import brandimg1 from "../images/Group (1).svg";
import brandimg2 from "../images/zara-logo-1 1.svg";
import brandimg3 from "../images/gucci-logo-1 1.svg";
import brandimg4 from "../images/prada-logo-1 1.svg";
import brandimg5 from "../images/Group (2).svg";
import ProductCard from "./Productcard";
import ReviewCard from "./ReviewCard";
import line from "../images/Line.svg";
import casual from "../images/Frame 61.svg";
import formal from "../images/Frame 62.svg";
import gym from "../images/Frame 63.svg";
import party from "../images/Frame 64.svg";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";

import { useCategory } from "./CategoryContext";

const HomePage = () => {
  const { category, setCategory } = useCategory();

  const navigate = useNavigate();
  //start
  const [products, setProducts] = useState([]);

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:8000/items");
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  //end

  console.log(
    window.localStorage.getItem(
      JSON.parse(window.localStorage.getItem("admin"))?.id
    ),
    "console"
  );

  return (
    <div className=" home-page ">
      <div className="content">
        <div className="matter fontsato">
          <h1 id="matterh1">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
          <p id="matterp" className="mt-4 fontsato">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button
            id="matterbutton"
            onClick={() => {
              navigate("/categorypage");
              setCategory("New-Arrivals");
            }}
          >
            Shop Now
          </button>
          <div className="count">
            <div className="count-1">
              <h1>200+</h1>
              <p>International Brands</p>
            </div>
            <div className="count-1">
              <h1>2,000+</h1>
              <p>High-Quality Products</p>
            </div>
            <div className="count-1">
              <h1>30,000+</h1>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>
        <div className="divimg">
          <img
            src={bgimg}
            alt="bgimg"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
      <div className="brandimg center-all">
        <img
          src={brandimg1}
          alt="brandimg"
          style={{ width: "9rem", margin: "0.45rem" }}
        />
        <img
          src={brandimg2}
          alt="brandimg"
          style={{ width: "5rem", margin: "0.45rem" }}
        />
        <img
          src={brandimg3}
          alt="brandimg"
          style={{ width: "7rem", margin: "0.45rem" }}
        />
        <img
          src={brandimg4}
          alt="brandimg"
          style={{ width: "7rem", margin: "0.45rem" }}
        />
        <img
          src={brandimg5}
          alt="brandimg"
          style={{ width: "9rem", margin: "0.45rem" }}
        />
      </div>

      <div className="newarrivals">
        {/* <h1 className="center-all mt-5 mb-5">NEW ARRIVALS</h1>
        <div className="center-all products-line">
          {products
            ?.filter((item) => {
              return item.category === "New-Arrivals";
            })
            .slice(0, 4)
            .map((item) => {
              return (
                <ProductCard
                  img={item.image}
                  title={item.name}
                  cost={item.price}
                  id={item._id}
                />
              );
            })}
        </div> */}
        <h1 className="center-all mt-5 mb-5">NEW ARRIVALS</h1>
        <div className="center-all container" style={{ width: "80%" }}>
          <Swiper
            // slidesPerView={4}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },

              760: {
                slidesPerView: 2,
              },

              900: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {products
              ?.filter((item) => {
                return item.category === "New-Arrivals";
              })
              .slice(0, 4)
              .map((item) => {
                return (
                  <SwiperSlide>
                    <ProductCard
                      img={item.image}
                      title={item.name}
                      cost={item.price}
                      id={item._id}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className="center-all mt-4 mb-4">
          <button
            className="view-all-btn"
            onClick={() => {
              navigate("/categorypage");

              setCategory("New-Arrivals");
            }}
          >
            View All
          </button>
        </div>
      </div>
      <div className="center-all mt-5 mb-5">
        <img src={line} alt="lineimg" />
      </div>
      <div className="topselling container " style={{ width: "80%" }}>
        <h1 className="center-all mt-5 mb-5">TOP SELLING</h1>
        <div className="center-all products-line">
          <Swiper
            // slidesPerView={4}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },

              760: {
                slidesPerView: 2,
              },

              900: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {products
              ?.filter((item) => {
                return item.category === "Top-Selling";
              })
              .slice(0, 4)
              .map((item) => {
                return (
                  <SwiperSlide>
                    <ProductCard
                      img={item.image}
                      title={item.name}
                      cost={item.price}
                      id={item._id}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className="center-all mt-4 mb-4">
          <button
            className="view-all-btn"
            onClick={() => {
              navigate("/categorypage");

              setCategory("Top-Selling");
            }}
          >
            View All
          </button>
        </div>
      </div>
      <div className="browsebydiv center-all">
        <div className="browsebybox">
          <h1 style={{ margin: "50px 0 40px 0", fontWeight: "700" }}>
            BROWSE BY DRESS STYLE
          </h1>
          <div className="browseby">
            <div>
              <img
                className="curp casualimg"
                src={casual}
                alt="casualimg"
                onClick={() => {
                  navigate("/categorypage");
                  setCategory("Casual");
                }}
              />

              <img
                src={formal}
                className="curp formalimg"
                alt="formalimg"
                onClick={() => {
                  navigate("/categorypage");
                  setCategory("Formal");
                }}
              />

              <img
                src={party}
                className="curp partyimg"
                alt="partyimg"
                onClick={() => {
                  navigate("/categorypage");
                  setCategory("Party");
                }}
              />

              <img
                src={gym}
                className="curp gymimg"
                alt="gymimg"
                onClick={() => {
                  navigate("/categorypage");
                  setCategory("Gym");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="reviewdiv mb-5">
        <h1 className=" mt-5 mb-5" style={{ marginLeft: "10vw" }}>
          OUR HAPPY CUSTOMERS
        </h1>
        <div className="reviews-line container">
          <Swiper
            // slidesPerView={4}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },

              1200: {
                slidesPerView: 2,
              },
            }}
          >
            {
              <>
                <SwiperSlide>
                  <ReviewCard
                    name="Sarah M."
                    review="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ReviewCard
                    name="Sarah M."
                    review="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ReviewCard
                    name="Sarah M."
                    review="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
                  />
                </SwiperSlide>
              </>
            }
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
