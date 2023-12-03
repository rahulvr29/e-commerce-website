import React from "react";
import { Container, Row, Col } from "reactstrap";
import '../style/dashboars.css'
import useGetData from "../custom/hooks/useGetData";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const {data: products} =useGetData('products');
  const {data: users} =useGetData('users');
  const navigate = useNavigate()


  const handleAddProduct = ()=>{
    navigate('/dashboard/add-product')
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="3">
            <div className="revenue__box">
              <h5>Total Sales</h5>
              <span>$567</span>
            </div>
          </Col>
          <Col lg="3">
          <div className="order__box">
              <h5>Orders</h5>
              <span>567</span>
            </div>
          </Col>
          <Col lg="3">
          <div className="product__box">
              <h5>Total Product</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col lg="3">
          <div className="users__box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>

            <div>
              <button className="shop__btn addBTn" onClick={handleAddProduct}> 
              Add Product
              </button>
            </div>
          </Col>
          
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
