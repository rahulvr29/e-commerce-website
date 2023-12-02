import React from "react";
import {
  Home,
  Cart,
  Shop,
  Checkout,
  SignUp,
  ProductDetails,
  Login,
} from "../pages";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AddProducts, AllProducts, Dashboard } from "../admin";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="shop" element={<Shop />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/all-product" element={<AllProducts />} />
        <Route path="dashboard/add-product" element={<AddProducts />} />
      </Route>
    </Routes>
  );
};

export default Routers;
