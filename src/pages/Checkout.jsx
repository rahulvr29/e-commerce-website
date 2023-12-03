import React from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../UI/CommonSection'
import '../style/checkout.css'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const Checkout = () => {

  const totalQty = useSelector(state=> state.cart.totalQuantity);
  const totalAmount = useSelector(state=> state.cart.totalAmount);


  return (
    <Helmet title=' Checkout'>
      <CommonSection title='Checkout'/> 
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className="mb-4 fw-bold">Billing Infomation</h6>
              <Form className='billing__form'>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Enter Your Name' required/>
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="email" placeholder='Enter Your Email' required/>
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="number" placeholder='Enter Your Number' required/>
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Enter Your Street Address' required/>
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Enter Your City Name' required/>
                </FormGroup>
              </Form>
            </Col>
            <Col lg='4'>
              <div className="checkout__cart">
                <h6>Total Qty : <span>{totalQty}</span></h6>
                <h6>Subtotal : <span>$ {totalAmount}</span></h6>
                <h6><span>Shipping : <br /> free shipping</span> <span>$ 0</span></h6>
                <h4>Total Cost : <span>$ {totalAmount}</span></h4>
                <motion.button whileTap={{scale:0.9}} className="shop__btn auth__btn">Place an Order</motion.button>
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout