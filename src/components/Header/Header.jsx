import React, { useRef, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import "./header.css"
import  { motion }  from 'framer-motion'
import logo from "../../assets/images/eco-logo.png"
import userIcon from '../../assets/images/user-icon.png'
import { Container, Row } from "reactstrap"


const nav__links = [
  {
    path:'home',
    display: "Home"
  },
  {
    path:'shop',
    display: "Shop"
  },
  {
    path:'cart',
    display: "Cart"
  },
]


const Header = () => {

  const headerRef = useRef(null);
  const  menuRef = useRef(null);


  const stickyHeaderfunc = ()=>{
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header');
      }else{
        headerRef.current.classList.remove('sticky__header');
      }
    });
  }

  useEffect(()=>{
    stickyHeaderfunc()

    return()=> window.removeEventListener("scroll", stickyHeaderfunc);
  })

  const menuToggle = ()=> menuRef.current.classList.toggle('active__menu')

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <h1>Multimart</h1>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {
                  nav__links.map((item, key) =>(
                    <motion.li whileTap={{scale:0.9}}className="nav__item" key={key.i}>
                    <NavLink to={item.path} className={(navClass)=> navClass.isActive ? "nav__active" : ""}>{item.display}</NavLink>
                  </motion.li>
                  ))
                }
              </ul>
            </div>
            <div className="nav__icons">
            <span className="fav_icon">
                  <i class="ri-heart-line"></i>
                    <span className="badge">1</span>
            </span>
            <span className="cart_icon">
                  <i class="ri-shopping-bag-line"></i>
                    <span className="badge">4</span>
            </span>
            <span>
                <motion.img
                whileTap={{scale:0.7}}
                src={userIcon} alt="userIcon" />
              </span>
              <div className="mobile__menu">
              <span onClick={menuToggle}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default Header