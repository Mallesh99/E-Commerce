import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import { AxiosConfig } from "../axiosConfig";

//for bar graph
import { BarChart } from "@mui/x-charts/BarChart";

const Home = () => {
  const [monthorders, setmonthOrders] = useState([]);

  async function fetchData() {
    try {
      const res = await AxiosConfig.get("/orders/today");
      // console.log(typeof res.data[0].createdAt);
      setmonthOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const data = [];
  for (var i = 0; i <= 31; i++) {
    data[i] = 0;
  }

  for (var i = 0; i < monthorders.length; i++) {
    const day = monthorders[i]?.createdAt.substring(8, 10);
    // console.log(monthorders[i]?.createdAt, "mon");
    // console.log(day);

    data[Number(day)]++;
  }

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
      {/* <p
        style={{ fontSize: "350px", textAlign: "center" }}
        className="fontIntegral700"
      >
        {monthorders.length}
      </p> */}
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
          },
        ]}
        series={[{ data: data.splice(1) }]}
        width={1100}
        height={400}
      />
    </div>
  );
};

export default Home;
