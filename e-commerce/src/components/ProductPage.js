import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import p1 from "../images/image 1.svg";
import p2 from "../images/image 2.svg";
import p3 from "../images/image 5.svg";
import p4 from "../images/image 6.svg";
import "../css/ProductPage.css";
import line from "../images/Line 1.svg";
import minus from "../images/Vector.svg";
import plus from "../images/Vector-1.svg";
import ProductCard from "./Productcard";
import a1 from "../images/a1.svg";
import a2 from "../images/a2.svg";
import a3 from "../images/a3.svg";
import a4 from "../images/a4.svg";
import axios from "axios";

import Circle from "./Circle";
import ReviewCard from "./ReviewCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";

const ProductPage = () => {
  const [count, setCount] = useState(1);
  const [color, setColor] = useState("White");
  const [size, setSize] = useState("Medium");
  // console.log(typeof count);
  const location = useLocation();
  // console.log(location);
  const id = location.pathname;
  const [product, setProduct] = useState();
  const [products, setProducts] = useState();

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:8000/items");
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchProduct() {
    try {
      await axios.get(`http://localhost:8000${id}`).then((res) => {
        console.log(res.data);
        setProduct(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchProduct();
    fetchData();
  }, [id]);

  var colors = [
    "#393E41",
    "#E94F37",
    "#1C89BF",
    // "#A1D363",
    // "#85FFC7",
    // "#297373",
    // "#FF8552",
    // "#A40E4C",
  ];

  var renderData = [];

  // for (var i = 0; i < colors.length; i++) {
  //   var color = colors[i];
  //   renderData.push(<Circle key={i + color} bgColor={color} />);
  // }

  //axios calls

  // const a = JSON.parse(window.localStorage.getItem("admin"));
  // // console.log(JSON.parse(a), "hello");
  // console.log(a?.id);

  async function addtocart() {
    try {
      const config = {
        owner: JSON.parse(window.localStorage.getItem("admin")).id,
        itemId: product._id,
        quantity: count,
        color: color,
        size: size,
      };
      await axios.post("http://localhost:8000/cart", config).then((res) => {
        console.log(res.data);
        alert("Item Added to cart");
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    product != null && (
      <div className="product-page container">
        <div className="container pcontent">
          <div className="divimg" style={{ display: "flex" }}>
            {/* <div style={{ display: "inline-grid" }} className="mt-4">
              <img src={p2} alt="bgimg" />
              <img src={p3} alt="bgimg" />
              <img src={p4} alt="bgimg " />
            </div> */}
            <div
              style={{
                padding: "70px 20px 40px 40px",
              }}
            >
              <img className="pimg" src={product.image} alt="bgimg" />
            </div>
          </div>
          <div className="pmatter">
            <h1 id="pmatterh1" className="mt-4">
              {product.name}
            </h1>
            <h1>${product.price}</h1>
            <p id="pmatterp">{product.description}</p>
            <img src={line} alt="lineimg" />
            <div>
              <p>Select Colors</p>
              {/* <div className="colors">{renderData}</div> */}
              <div className="colors">
                <button
                  className="active"
                  onClick={() => {
                    setColor("Black");
                  }}
                  style={{ backgroundColor: "white", border: "none" }}
                >
                  <Circle key={colors[0]} bgColor={colors[0]} />
                </button>
                <button
                  onClick={() => {
                    setColor("Red");
                  }}
                  style={{ backgroundColor: "white", border: "none" }}
                >
                  <Circle key={1 + colors[1]} bgColor={colors[1]} />
                </button>
                <button
                  onClick={() => {
                    setColor("Blue");
                  }}
                  style={{ backgroundColor: "white", border: "none" }}
                >
                  <Circle key={2 + colors[2]} bgColor={colors[2]} />
                </button>
              </div>
            </div>
            <img src={line} alt="lineimg" className="mb-3" />
            <div>
              <p>Choose Size</p>
              <div className="sizes ">
                <button
                  id="sizebutton"
                  onClick={() => {
                    setSize("Small");
                  }}
                >
                  Small
                </button>
                <button
                  id="sizebutton"
                  onClick={() => {
                    setSize("Medium");
                  }}
                >
                  Medium
                </button>
                <button
                  id="sizebutton"
                  onClick={() => {
                    setSize("Large");
                  }}
                >
                  Large
                </button>
                <button
                  id="sizebutton"
                  onClick={() => {
                    setSize("X-Large");
                  }}
                >
                  X-Large
                </button>
              </div>
            </div>
            <img src={line} alt="lineimg" />
            <div style={{ display: "flex" }} className="mt-3">
              <div className="pquantity">
                <img
                  src={minus}
                  alt="minusimg"
                  width={"18px"}
                  onClick={() => {
                    setCount(count - 1);
                  }}
                />
                <p style={{ padding: "13px 0 0px 0" }}>{count}</p>
                <img
                  src={plus}
                  alt="plusimg"
                  width={"18px"}
                  onClick={() => {
                    setCount(count + 1);
                  }}
                />
              </div>
              <button id="cartbtn" onClick={addtocart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <p style={{ fontSize: "24px", fontWeight: "700" }}>All Reviews</p>
          <div className="previews-line">
            <ReviewCard
              name="Sarah M."
              review="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
            />
            <ReviewCard
              name="Alex K."
              review="Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
            />
            <ReviewCard
              name="James L."
              review="As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
            />
            <ReviewCard
              name="Sarah M."
              review="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
            />
            <ReviewCard
              name="Alex K."
              review="Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
            />
            <ReviewCard
              name="James L."
              review="As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
            />
          </div>
          <div className="center-all mt-4 mb-4">
            <button className="view-all-btn">Load More Reviews</button>
          </div>
        </div>

        <div className="youmightalsolike">
          <h1 className="center-all mt-5 mb-5">YOU MIGHT ALSO LIKE</h1>
          <div className="center-all products-line">
            {/* <ProductCard
              img={a1}
              title="Polo with Contrast Trims"
              cost="$212"
            />
            <ProductCard
              img={a2}
              title="Gradient Graphic T-shirt"
              cost="$145"
            />
            <ProductCard
              img={a3}
              title="Polo with Tipping Details"
              cost="$180"
            />
            <ProductCard img={a4} title="Black Striped T-shirt" cost="$120" /> */}

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
                  return item.category === "you-might-also-like";
                })
                .slice(0, 9)
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
        </div>
      </div>
    )
  );
};

export default ProductPage;

// var destination = document.querySelector("#container");

// ReactDOM.render(<div>{renderData}</div>, destination);
