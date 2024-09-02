// CategoryContext.js
import React, { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState("Top-Selling");
  const [search, setSearch] = useState("");

  return (
    <CategoryContext.Provider
      value={{ category, setCategory, search, setSearch }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
