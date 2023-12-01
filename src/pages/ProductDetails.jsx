import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import ProductsList from "../UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import "../style/product-details.css";

const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products.find((item) => item.id === id);
  const {
    imgUrl,
    productName,
    avgRating,
    reviews,
    description,
    price,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj ={
      userName: reviewUserName,
      text: reviewUserMsg,
      rating:rating,
    }
    console.log(reviewObj)
    toast.success("Product Review Submitted");
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItems({
        id,
        imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product added to cart successfully");
  };

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [product]);
  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6" >
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-fill"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span> Category: {category} </span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="shop__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" md='4'>
              <div className="tab_wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab " : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab " : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description} </p>
                </div>
              ) : (
                <div className="product__review">
                  <div className="review__wrapper">
                    <ul>
                      {reviews.map((item, index) => (
                        <li key={index} className="mt-4">
                          <h6>Sam Vishal</h6>
                          <span>{item.rating}(Rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <h4>Leave Your Experience</h4>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form__group d-flex align-items-center gap-4 ">
                          <motion.span
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setRating(2)}
                          >
                            2<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setRating(3)}
                          >
                            3<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setRating(4)}
                          >
                            4<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setRating(5)}
                          >
                            5<i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>

                        <div className="form__group" >
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Enter Review Message"
                            required
                          />
                        </div>
                        <button type="submit" className="shop__btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
