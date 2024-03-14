import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const Coupons = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const configuration = {
    method: "get",
    url: "http://localhost:8000/coupons",
  };

  async function fetchData() {
    try {
      const res = await axios(configuration);
      console.log(res.data);
      setCoupons(res.data);
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
  const nPages = Math.ceil(coupons.length / recordsPerPage);

  const deleteCoupon = (coupon) => {
    // e.preventDefault();
    // console.log(item);
    const config = {
      method: "delete",
      url: `http://localhost:8000/coupons/${coupon._id}`,
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
      className="fontsato"
      style={{
        width: "100%",
        padding: "7rem",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <table className="mb-3 " style={{ marginLeft: "12rem" }}>
        <thead>
          <tr>
            {/* <th>Product-ID</th> */}
            <th>Coupon Code</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Discount</th>

            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coupons
            ?.slice(indexOfFirstRecord, indexOfLastRecord)
            .map((coupon) => {
              console.log(typeof []);
              return (
                <tr>
                  <td>{coupon.couponcode}</td>
                  <td>{coupon.startdate.toString().substring(0, 10)}</td>
                  <td>{coupon.enddate.toString().substring(0, 10)}</td>
                  <td>{coupon.discount}</td>

                  <td>
                    <Button variant="success" type="submit">
                      <Link
                        to="/updatecoupon"
                        state={coupon}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Update Coupon
                      </Link>
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      type="submit"
                      onClick={(e) => deleteCoupon(coupon)}
                    >
                      Delete Coupon
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
        onClick={() => navigate("/addcoupon")}
      >
        Add Coupon
      </Button>
    </div>
  );
};

export default Coupons;
