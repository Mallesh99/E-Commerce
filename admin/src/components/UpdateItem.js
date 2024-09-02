import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { AxiosConfig } from "../axiosConfig";

const sizeoptions = [
  { value: "XX-Small", label: "XX-Small" },
  { value: "X-Small", label: "X-Small" },
  { value: "Small", label: "Small" },
  { value: "Medium", label: "Medium" },
  { value: "Large", label: "Large" },
  { value: "X-Large", label: "X-Large" },
  { value: "XX-Large", label: "XX-Large" },
  { value: "3X-Large", label: "3X-Large" },
  { value: "4X-Large", label: "4X-Large" },
];
const coloroptions = [
  { value: "Orange", label: "Orange" },
  { value: "Black", label: "Black" },
  { value: "Red", label: "Red" },
  { value: "Blue", label: "Blue" },
];

const UpdateItem = () => {
  const location = useLocation();
  const item = location.state;
  const navigate = useNavigate();

  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState(item.price);

  const [sizes, setSizes] = useState(item.sizes);
  const [colors, setColors] = useState(item.colors);
  const [discount, setDiscount] = useState(item.discount);

  const handleSubmit = (e) => {
    const parsercolors = colors.map((color) => color.value);
    const parsersizes = sizes.map((size) => size.value);
    e.preventDefault();

    AxiosConfig.patch(`/products/${item._id}`, {
      name,
      description,
      category,
      price,
      sizes: parsersizes,
      colors: parsercolors,
      discount,
    })
      .then((res) => {
        // console.log(res.data);
        navigate("/products");
        // alert("Item Updated");
      })
      .catch((err) => {
        // console.log(err);
        alert("Item not Updated");
        err = new Error();
      });
  };
  return (
    <div
      className="mt-5"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          width: "60%",
          borderStyle: "solid",
          borderWidth: "2.5px",
          borderRadius: "30px",
          padding: "20px",
          borderColor: "#F0F0F0",
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Choose Sizes</Form.Label>
          <Select
            options={sizeoptions}
            onChange={(sizes) => {
              setSizes(sizes || []);
              // console.log(sizes);
            }}
            value={sizes}
            isMulti
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Choose Colors</Form.Label>
          <Select
            options={coloroptions}
            onChange={(colors) => {
              setColors(colors || []);
              console.log(colors);
            }}
            value={colors}
            isMulti
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter discount on the product"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Item
        </Button>
      </Form>
    </div>
  );
};

export default UpdateItem;
