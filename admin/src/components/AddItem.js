import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import FormSelect from "react-bootstrap/esm/FormSelect";
import Select from "react-select";

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
const AddItem = () => {
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  // const inputRef = useRef();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // alert("Submitted!!");
    const parsercolors = colors.map((color) => color.value);
    console.log(parsercolors, "bro");
    const parsersizes = sizes.map((size) => size.value);
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    parsersizes.forEach((item) => formData.append("sizes[]", item));
    parsercolors.forEach((item) => formData.append("colors[]", item));
    formData.append("discount", discount);
    formData.append("image", image);
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    try {
      console.log(sizes);
      const data = await axios.post(
        "http://localhost:8000/items",
        formData,
        config
      );
      alert("Item Added");
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="mt-1"
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

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Please add image here</Form.Label>
          <Form.Control
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            name="image"
            type="file"
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
          Add Item
        </Button>
      </Form>
    </div>
  );
};

export default AddItem;
