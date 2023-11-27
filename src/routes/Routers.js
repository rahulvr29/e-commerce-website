import React from 'react'
import { Home, Cart, Shop, Checkout, SignUp, ProductDetails, Login } from '../pages'
import { Routes, Route } from 'react-router-dom'

const Routers = () => {
  return (
    <Routes>

      <Route path="/home" element={<Home/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/shop/:id" element={<ProductDetails/>} />
      <Route path="/checkout" element={<Checkout/>} />

    </Routes>
    
  )
}

export default Routers