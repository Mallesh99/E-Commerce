import React, { useEffect, useState } from "react";
import line from "../images/Line 9.svg";
import "../css/CategoryPage.css";
import Circle from "../components/Circle";
import ProductCard from "../components/Productcard";
import Pagination from "../components/Pagination";
import { useCategory } from "../components/CategoryContext";
import { AxiosConfig } from "../axiosConfig";
import Loader from "../components/Loader";

const CategoryPage = () => {
  const { category, setCategory, search } = useCategory();
  console.log(search, "catsearch");
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
  }, [products]);

  var colors = [
    "#393E41",
    "#E94F37",
    "#1C89BF",
    "#A1D363",
    "#85FFC7",
    "#297373",
    "#FF8552",
    "#A40E4C",
  ];

  var renderData = [];

  for (var i = 0; i < colors.length; i++) {
    var color = colors[i];
    renderData.push(<Circle key={i + color} bgColor={color} />);
  }

  //pagination code
  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage] = useState(6);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const data = products?.filter((product) => {
    if (search === "") {
      return product.category === category;
    } else if (
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    ) {
      return product;
    }
  });
  const nPages = Math.ceil(data.length / recordsPerPage);

  const setCategoryCasual = () => {
    setCategory("Casual");
    return window.scrollTo(0, 0);
  };
  const setCategoryFormal = () => {
    setCategory("Formal");
    return window.scrollTo(0, 0);
  };
  const setCategoryParty = () => {
    setCategory("Party");
    return window.scrollTo(0, 0);
  };
  const setCategoryGym = () => {
    setCategory("Gym");
    return window.scrollTo(0, 0);
  };

  if (products.length === 0) {
    return <Loader />;
  }

  console.log("products", products);

  const imgUrl = process.env.REACT_APP_API_END_POINT;
  return (
    <div className="container category-page">
      <div className="forfont mt-3 mb-3 filterbox">
        <div>
          <h3>Filters</h3>
          <img src={line} alt="lineimg" />
          <div>
            <p>T-shirts</p>
            <p>Shorts</p>
            <p>Shirts</p>
            <p>Hoodie</p>
            <p>Jeans</p>
          </div>
          <img src={line} alt="lineimg" />
          <div>
            <h3>Price</h3>
          </div>
          <div>
            <h3>Colors</h3>
            <div className="colors" style={{ maxWidth: "100%" }}>
              {renderData}
            </div>
          </div>
          <img src={line} alt="lineimg" />
          <div>
            <h3>Size</h3>
            <div className="mt-1">
              <button id="catbutton" className="mt-2">
                XX-Small
              </button>
              <button id="catbutton" className="mt-2">
                X-Small
              </button>
              <button id="catbutton" className="mt-2">
                Small
              </button>
              <button id="catbutton" className="mt-2">
                Medium
              </button>
              <button id="catbutton" className="mt-2">
                Large
              </button>
              <button id="catbutton" className="mt-2">
                X-Large
              </button>
              <button id="catbutton" className="mt-2">
                XX-Large
              </button>
              <button id="catbutton" className="mt-2">
                3X-Large
              </button>
              <button id="catbutton" className="mt-2">
                4X-Large
              </button>
            </div>
            <img src={line} alt="lineimg" />
          </div>

          <h3>Dress Style</h3>

          <div>
            <p style={{ cursor: "pointer" }} onClick={setCategoryCasual}>
              Casual
            </p>

            <p style={{ cursor: "pointer" }} onClick={setCategoryFormal}>
              Formal
            </p>

            <p style={{ cursor: "pointer" }} onClick={setCategoryParty}>
              Party
            </p>

            <p style={{ cursor: "pointer" }} onClick={setCategoryGym}>
              Gym
            </p>
          </div>
          <button id="cartbtn" style={{ width: "100%" }}>
            Apply Filter
          </button>
        </div>
      </div>

      <div className="categorydiv">
        <h1 className="mb-4" style={{ fontFamily: "Sato", fontWeight: "700" }}>
          {search === ""
            ? category
            : data.length === 0
            ? "No such products available"
            : "Search Results..."}
        </h1>
        <div className="center-all products-line categoryprod">
          {data.slice(indexOfFirstRecord, indexOfLastRecord).map((item) => {
            return (
              <ProductCard
                img={imgUrl + item.image.substring(26)}
                title={item.name}
                cost={item.price}
                id={item._id}
              />
            );
          })}
        </div>
        {data.length > 0 ? (
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
