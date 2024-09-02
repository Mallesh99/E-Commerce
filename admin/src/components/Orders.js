import React, { useEffect, useState } from "react";

import "./Products.css";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { AxiosConfig } from "../axiosConfig";

import delicon from "../images/delicon.svg";
import editicon from "../images/edit.png";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  async function fetchData() {
    try {
      const res = await AxiosConfig.get("/orders/getAll");
      console.log(res.data);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  //pagination code
  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage] = useState(5);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(orders.length / recordsPerPage);

  const deleteorder = (order) => {
    // e.preventDefault();
    // console.log(order);

    AxiosConfig.delete(`/orders/${order._id}`)
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
      className="fontsato"
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
            <th>Items Ordered</th>
            <th>Grand Total</th>
            <th>Status</th>
            <th>Address</th>
            <th>Payment Status</th>
            <th>Mobile Number</th>
            {/* <th>Image</th> */}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.slice(indexOfFirstRecord, indexOfLastRecord).map((order) => {
            // console.log(typeof []);
            return (
              <tr>
                {/* <td>{order._id}</td> */}
                <td>{order.ownerName}</td>
                {/* <td>{JSON.stringify(order.items)}</td> */}
                <td>
                  {[
                    order.items.map((item) =>
                      [item.name, item.size, item.color].join("->")
                    ),
                  ].join(",")}
                </td>
                <td>{order.grandTotal}</td>
                <td>{order.status}</td>
                <td className="single-line" style={{ maxWidth: "10vw" }}>
                  {order.address}
                </td>
                <td>{order.paymentStatus}</td>
                <td>{order.mobileNumber}</td>
                {/* <td>{order.img}</td> */}
                <td>
                  <img
                    className="icon"
                    src={editicon}
                    alt="editicon"
                    onClick={() => {
                      navigate("/updateorder", { state: order });
                    }}
                  />
                  {/* <Button
                    variant="success"
                    type="submit"
                    onClick={() => {
                      navigate("/updateorder", { state: order });
                    }}
                  >
                    Update order
                  </Button> */}
                </td>
                <td>
                  <img
                    className="icon"
                    src={delicon}
                    alt="delicon"
                    onClick={(e) => deleteorder(order)}
                  />
                  {/* <Button
                    variant="danger"
                    type="submit"
                    onClick={(e) => deleteorder(order)}
                  >
                    Delete order
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
    </div>
  );
};

export default Orders;
