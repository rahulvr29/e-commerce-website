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
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
