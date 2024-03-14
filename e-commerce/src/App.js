import "./App.css";
import React from "react";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProductPage from "./components/ProductPage";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import CategoryPage from "./components/CategoryPage";
import CartPage from "./components/CartPage";
import { CategoryProvider } from "./components/CategoryContext";
import Cart from "./components/Cart";

function App() {
  const isAuthenticated = window.localStorage.getItem("admin") != null;
  console.log(window.localStorage.getItem("admin"));
  return (
    <CategoryProvider>
      {" "}
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
              {["/:id", "/categorypage/:id"].map((path, index) => (
                <Route path={path} element={<ProductPage />} />
              ))}
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
