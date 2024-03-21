import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import line from "../images/Line 1.svg";
import minus from "../images/Vector.svg";
import plus from "../images/Vector-1.svg";
import {
  addToCart,
  cartDecrement,
  cartIncrement,
} from "../redux/slices/cartSlice";

const SetThings = (prod) => {
  //   console.log(product, "ppp");
  const product = prod.product;
  const colors = product?.colors;
  //   console.log(colors, "col");

  const sizes = product?.sizes;

  const [color, setColor] = useState(colors[0]);
  const [isActive, setIsActive] = useState(colors[0]);

  const [isActiveFilter, setIsActiveFilter] = useState(sizes[0]);
  const [size, setSize] = useState(sizes[0]);

  const dispatch = useDispatch();
  const usercart = useSelector((state) => state);

  const discprice = Math.round(
    (product?.price * (100 - product?.discount)) / 100
  );
  // console.log(usercart);

  const existincart = usercart?.cart.cart?.find(
    (prod) =>
      product?._id === prod.id && size === prod.size && color === prod.color
  );
  const [count, setCount] = useState(!existincart ? 1 : existincart.quantity);

  return (
    <div>
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
              key={size}
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
  );
};

export default SetThings;
