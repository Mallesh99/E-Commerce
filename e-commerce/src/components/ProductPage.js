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
import axios from "axios";

import Circle from "./Circle";
import ReviewCard from "./ReviewCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cartDecrement,
  cartIncrement,
} from "../redux/slices/cartSlice";

const ProductPage = () => {
  // console.log(typeof count);
  const location = useLocation();
  // console.log(location);
  const id = location.pathname;
  const [product, setProduct] = useState();
  const [products, setProducts] = useState();
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [cart, setCart] = useState();

  async function fetchProducts() {
    try {
      const res = await axios.get("http://localhost:8000/items");
      // console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchProduct() {
    try {
      await axios.get(`http://localhost:8000${id}`).then((res) => {
        // console.log(res.data);

        setProduct(res.data);
        setColors(res.data.colors);
        setSizes(res.data.sizes);
        setIsActive(res.data.colors[0]);
        setColor(res.data.colors[0]);
        setIsActiveFilter(res.data.sizes[0]);
        setSize(res.data.sizes[0]);
      });
    } catch (err) {
      console.error(err);
    }
  }

  // async function fetchCart() {
  //   try {
  //     await axios
  //       .get(
  //         `http://localhost:8000/cart/${
  //           JSON.parse(window.localStorage.getItem("admin")).id
  //         }`
  //       )
  //       .then((res) => {
  //         // console.log(res.data);
  //         setCart(res.data);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   fetchProducts();
  //   fetchCart();
  // }, []);

  useEffect(() => {
    fetchProducts();
    fetchProduct();

    // fetchCart();
  }, [id]);
  const [colors, setColors] = useState();
  const [sizes, setSizes] = useState();

  // var colors = [
  //   "#393E41",
  //   "#E94F37",
  //   "#1C89BF",
  //   "#A1D363",
  //   "#85FFC7",
  //   "#297373",
  //   "#FF8552",
  //   "#A40E4C",
  // ];

  const [color, setColor] = useState();
  const [isActive, setIsActive] = useState();

  const [isActiveFilter, setIsActiveFilter] = useState();
  const [size, setSize] = useState();

  const discprice = Math.round(
    (product?.price * (100 - product?.discount)) / 100
  );

  const dispatch = useDispatch();
  const usercart = useSelector((state) => state);
  // console.log(usercart);

  const existincart = usercart?.cart.cart?.find(
    (prod) =>
      product?._id === prod.id && size === prod.size && color === prod.color
  );
  const [count, setCount] = useState(!existincart ? 1 : existincart.quantity);

  // console.log(!existincart, "heili");
  return (
    product != null && (
      <div className="product-page">
        <div className="container pcontent fontsato">
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
            <div style={{ display: "flex" }}>
              <h1>${discprice}</h1>
              <h1
                className="ms-3"
                style={{ textDecoration: "line-through", color: "#0000004D" }}
              >
                ${product.price}
              </h1>
              <div className="center-all disc ms-3 mt-1">
                <p className="mt-2">-{product.discount}%</p>
              </div>
            </div>
            <p id="pmatterp">{product.description}</p>
            <img src={line} alt="lineimg" />

            <div>
              <p>Select Colors</p>
              <div className="colors">
                {colors?.map((color) => (
                  <button
                    className={`btn ${isActive === color ? "active" : ""}`}
                    key={color}
                    style={{
                      margin: 10,
                      display: "inline-block",
                      backgroundColor: color,
                      borderRadius: "50%",

                      borderWidth: "3px",
                      width: 30,
                      height: 30,
                    }}
                    onClick={() => {
                      setIsActive(color);
                      setColor(color);
                      setCount(!existincart ? 1 : existincart.quantity);
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <img src={line} alt="lineimg" className="mb-3" />
            <div>
              <p>Choose Size</p>
              <div className="sizes">
                {sizes?.map((size) => (
                  <button
                    className={`mb-2 btn me-3 ${
                      isActiveFilter === size ? "active" : ""
                    }`}
                    key={sizes[0]}
                    id="sizebutton"
                    onClick={() => {
                      setIsActiveFilter(size);
                      setSize(size);
                      setCount(!existincart ? 1 : existincart.quantity);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <img src={line} alt="lineimg" />
            <div style={{ display: "flex" }} className="mt-3">
              <div className="pquantity">
                <img
                  src={minus}
                  alt="minusimg"
                  width={"18px"}
                  onClick={(e) => {
                    setCount(count - 1);

                    if (existincart) {
                      dispatch(
                        cartDecrement({
                          id: product._id,
                          color: color,
                          size: size,
                        })
                      );
                    }
                  }}
                />
                <p style={{ padding: "13px 0 0px 0" }}>
                  {/* {!existincart ? count : existincart.quantity} */}
                  {count}
                </p>
                <img
                  src={plus}
                  alt="plusimg"
                  width={"18px"}
                  onClick={(e) => {
                    setCount(count + 1);

                    if (existincart) {
                      dispatch(
                        cartIncrement({
                          id: product._id,
                          color: color,
                          size: size,
                        })
                      );
                    }
                  }}
                />
              </div>
              {/* <button id="cartbtn" onClick={addtocart}> */}
              <button
                id="cartbtn"
                onClick={(e) => {
                  if (count > 0) {
                    dispatch(
                      addToCart({
                        id: product._id,
                        name: product.name,
                        quantity: count,
                        price: discprice,
                        image: product.image,
                        color: color,
                        size: size,
                      })
                    );
                  }
                }}
              >
                {!existincart ? "Add to Cart" : "Added to Cart"}
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
          <div className="center-all container" style={{ width: "80%" }}>
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
