import React, { Fragment } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "components/Home";
import ProductsPage from "components/ProductsPage";
import CategoryPage from "components/CategoryPage";
import ProductDetailPage from "components/ProductDetailPage";
import CreateProductPage from "components/CreateProductPage";
import CreateCategoryPage from "components/CreateCategoryPage";
import CategoryDetailPage from "components/CategoryDetailPage";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<ProductsPage />} path="/products" />
        <Route element={<CategoryPage />} path="/categories" />
        <Route element={<ProductDetailPage />} path="/products/:id" />
        <Route element={<CategoryDetailPage />} path="/categories/:id" />
        <Route element={<CreateProductPage />} path="/products/create" />
        <Route element={<CreateCategoryPage />} path="/categories/create" />
      </Routes>
    </Fragment>
  );
}

export default App;
