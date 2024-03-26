import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import FormSelect from "react-bootstrap/esm/FormSelect";
import Select from "react-select";
import { AxiosConfig } from "../axiosConfig";
import { toast } from "react-toastify";

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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!image) {
      newErrors.image = "Image is required";
      isValid = false;
    }
    if (!category) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    if (!price) {
      newErrors.price = "Price is required";
      isValid = false;
    }
    if (sizes.length === 0) {
      newErrors.sizes = "Size is required";
      isValid = false;
    }
    if (colors.length === 0) {
      newErrors.colors = "Color is required";
      isValid = false;
    }
    if (!discount) {
      newErrors.discount = "Discount is required";
      isValid = false;
    } else if (discount <= 0 || discount > 100) {
      newErrors.discount = "Enter valid discount";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("Submitted!!");

    if (validateForm()) {
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
        await AxiosConfig.post("/products/addProduct", formData, config).then(
          (res) => {
            alert("Item Added");
          }
        );
        // console.log(data);
      } catch (err) {
        // console.log(err.response.data.errors);
        if (err.response.data.errors) {
          err.response.data.errors.forEach((element) =>
            toast(element.msg, { style: { background: "#fff2df" } })
          );
        }
      }
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
          {errors.name && <div className="validationError">{errors.name}</div>}
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
          {errors.description && (
            <div className="validationError">{errors.description}</div>
          )}
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
          {errors.image && (
            <div className="validationError">{errors.image}</div>
          )}
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
          {errors.category && (
            <div className="validationError">{errors.category}</div>
          )}
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
          {errors.price && (
            <div className="validationError">{errors.price}</div>
          )}
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
          {errors.sizes && (
            <div className="validationError">{errors.sizes}</div>
          )}
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
          {errors.colors && (
            <div className="validationError">{errors.colors}</div>
          )}
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
          {errors.discount && (
            <div className="validationError">{errors.discount}</div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
    </div>
  );
};

export default AddItem;
