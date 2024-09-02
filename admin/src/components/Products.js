import React, { useEffect, useState } from "react";

import "./Products.css";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { AxiosConfig } from "../axiosConfig";

import delicon from "../images/delicon.svg";
import editicon from "../images/edit.png";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  async function fetchData() {
    try {
      const res = await AxiosConfig.get("/products/getAll");
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  //pagination code
  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(products.length / recordsPerPage);

  const deleteItem = (item) => {
    // e.preventDefault();
    // console.log(item);

    AxiosConfig.delete(`/products/${item._id}`)
      .then((res) => {
        // console.log(res.data);
        fetchData();
      })
      .catch((err) => {
        // console.log(err);
        alert("Not Deleted");
        err = new Error();
      });
  };

  return (
    <div
      className="fontsato "
      style={{
        width: "100%",
        padding: "1.5rem 2rem",
      }}
    >
      <table className="mb-3">
        <thead>
          <tr>
            {/* <th>Product-ID</th> */}
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Colors</th>
            <th>Sizes</th>
            <th>Discount</th>
            {/* <th>Image</th> */}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products
            ?.slice(indexOfFirstRecord, indexOfLastRecord)
            .map((item) => {
              console.log(typeof []);
              return (
                <tr>
                  {/* <td>{item._id}</td> */}
                  <td className="single-line" style={{ maxWidth: "15vw" }}>
                    {item.name}
                  </td>
                  <td className="single-line" style={{ maxWidth: "10vw" }}>
                    {item.description}
                  </td>
                  <td className="single-line" style={{ maxWidth: "8vw" }}>
                    {item.category}
                  </td>
                  <td className="center">{item.price}</td>
                  <td>{item.colors.join(",")}</td>
                  <td className="single-line" style={{ maxWidth: "10vw" }}>
                    {item.sizes.join(",")}
                  </td>
                  <td className="center">{item.discount}</td>
                  {/* <td>{item.img}</td> */}
                  <td>
                    <img
                      className="icon"
                      src={editicon}
                      alt="editicon"
                      onClick={() => {
                        navigate("/updateitem", { state: item });
                      }}
                    />
                    {/* <Button
                      variant="success"
                      type="submit"
                      onClick={() => {
                        navigate("/updateitem", { state: item });
                      }}
                    >
                      Update Item
                    </Button> */}
                  </td>
                  <td>
                    <img
                      className="icon"
                      src={delicon}
                      alt="delicon"
                      onClick={() => deleteItem(item)}
                    />
                    {/* <Button
                      variant="white"
                      type="submit"
                      onClick={(e) => deleteItem(item)}
                    >
                      Delete Item
                    </Button> */}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Button
        variant="primary"
        type="submit"
        // className="mt-2"
        onClick={() => navigate("/additem")}
      >
        Add Item
      </Button>
    </div>
  );
};

export default Products;
