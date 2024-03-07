import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const configuration = {
    method: "get",
    url: "http://localhost:8000/items",
  };

  async function fetchData() {
    try {
      const res = await axios(configuration);
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
    const config = {
      method: "delete",
      url: `http://localhost:8000/items/${item._id}`,
    };
    axios(config)
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
      style={{
        width: "100%",
        padding: "2rem",
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
                  <td>{item.price}</td>
                  <td>{item.colors}</td>
                  <td className="single-line" style={{ maxWidth: "10vw" }}>
                    {item.sizes}
                  </td>
                  <td>{item.discount}</td>
                  {/* <td>{item.img}</td> */}
                  <td>
                    <Button variant="success" type="submit">
                      <Link
                        to="/updateitem"
                        state={item}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Update Item
                      </Link>
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      type="submit"
                      onClick={(e) => deleteItem(item)}
                    >
                      Delete Item
                    </Button>
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
        className="mt-3"
        onClick={() => navigate("/additem")}
      >
        Add Item
      </Button>
    </div>
  );
};

export default Products;
