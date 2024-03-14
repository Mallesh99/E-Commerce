import axios from "axios";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [monthorders, setmonthOrders] = useState([]);
  const configuration = {
    method: "get",
    url: "http://localhost:8000/orders/today",
  };

  async function fetchData() {
    try {
      const res = await axios(configuration);
      console.log(res.data);
      setmonthOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="mt-5"
      style={{
        width: "100%",
        display: "grid",
        justifyContent: "center",
        alignorders: "center",
      }}
    >
      <p className="fontsato" style={{ fontSize: "50px", textAlign: "center" }}>
        The number of orders placed in March are :{" "}
      </p>
      <p
        style={{ fontSize: "350px", textAlign: "center" }}
        className="fontIntegral700"
      >
        {monthorders.length}
      </p>
    </div>
  );
};

export default Home;
