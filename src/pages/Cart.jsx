import React from "react";
import "../style/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount)

  console.log(totalAmount)

  return (
    <Helmet title=" Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">Subtotal
                <span className="fs-4 fw-bold">${totalAmount} </span>
                </h6>
                
              </div>
              <p className="fs-6 mt-2">taxes and shipping will calculate in checkout</p>
              <div>
                <Link to='/checkout'><button className="shop__btn w-100 mt-3">
                  Checkout
                </button></Link>
                <Link to='/shop'><button className="shop__btn w-100">
                  Continue Shopping
                </button></Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const removeProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <motion.td whileHover={{ scale: 1.1 }}>
        <img src={item.imgUrl} alt="" />
      </motion.td>
      <td>{item.productName}</td>
      <td>${item.price} </td>
      <td>{item.quantity} </td>
      <motion.td whileTap={{ scale: 0.95 }} onClick={removeProduct}>
        <i className="ri-delete-bin-line"></i>
      </motion.td>
    </tr>
  );
};
export default Cart;
