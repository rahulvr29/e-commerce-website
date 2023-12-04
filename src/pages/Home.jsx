import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
import "../style/home.css";
import product from '../assets/data/products'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
import ProductsList from "../UI/ProductsList";
import counterImg from "../assets/images/counter-timer-img.png"
import Clock from "../UI/Clock";
import useGetData from "../custom/hooks/useGetData";

const Home = () => {
  const {data: products, loading} = useGetData('products')
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobilesProducts, setMobilesProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = product.filter(
      (item) => item.category === "chair"
    );
    const filteredBestSalesProducts = product.filter(
      (item) => item.category === "sofa"
    );
    const filteredMobileProducts = product.filter(
      (item) => item.category === "mobile"
    );
    const filteredWirelessProducts = product.filter(
      (item) => item.category === "wireless"
    );
    const filteredPopularProducts = product.filter(
      (item) => item.category === "watch"
    );


    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobilesProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);


  }, [products]);
  return (
    <Helmet title={" Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Moddern</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                  voluptates error totam nemo, dolorem quibusdam est. Commodi a
                  reprehenderit deserunt?
                </p>

                <Link to="/shop">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="shop__btn"
                  >
                    SHOP NOW
                  </motion.button>
                </Link>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" md="" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {
              loading ? <h5 className="fw-bold text-center ">Loading....</h5> :
              <ProductsList data={trendingProducts} />
            }
            
          </Row>
        </Container>
      </section>
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" md="" className="text-center">
              <h3 className="section__title">Best Sales</h3>
            </Col>
            {
              loading ? <h5 className="fw-bold text-center ">Loading....</h5> :
              <ProductsList data={bestSalesProducts} />
            }
            
          </Row>
        </Container>
      </section>
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg='6' md='12' className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
                <Clock/>
                <motion.button whileTap={{scale:0.8}} className="shop__btn store__btn">
                  <Link to="/shop">Visit Store</Link>
                </motion.button>
            </Col>
            <Col lg='6' md='12' className="text-end counter__img">
                <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new__arrivals ">
      <Container>
          <Row>
            <Col lg="12" md="" className="text-center mb-5">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            {
              loading ? <h5 className="fw-bold text-center ">Loading....</h5> :
              <ProductsList data={mobilesProducts} />
            }
            {
              loading ? <h5 className="fw-bold text-center ">Loading....</h5> :
              <ProductsList data={wirelessProducts} />
            }
          </Row>
        </Container>
      </section>
      <section className="popular__category">
      <Container>
          <Row>
            <Col lg="12" md="" className="text-center mb-5">
              <h3 className="section__title">Popular in Category</h3>
            </Col>
            {
              loading ? <h5 className="fw-bold text-center ">Loading....</h5> :
              <ProductsList data={popularProducts} />
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
