import "./App.css";
import React from "react";

import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";

import { CategoryProvider } from "./components/CategoryContext";
import Cart from "./components/Cart";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "./pages/CartPage";

function App() {
  const isAuthenticated = window.localStorage.getItem("user") != null;
  console.log(window.localStorage.getItem("user"));

  return (
    <CategoryProvider>
      {" "}
      <ToastContainer />
      <Routes>
        {!isAuthenticated && (
          <>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        {isAuthenticated && (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              {/* {["/:id", "/categorypage/:id"].map((path, index) => (
                <Route path={path} element={<ProductPage />} />
              ))} */}

              <Route path="/:id" element={<ProductPage />} />
              <Route path="/categorypage" element={<CategoryPage />} />
              <Route path="/cartpage" element={<CartPage />} />
            </Route>
          </>
        )}
      </Routes>
    </CategoryProvider>
  );
}

export default App;
