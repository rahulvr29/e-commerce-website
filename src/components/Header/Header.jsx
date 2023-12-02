import React, { useRef, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { motion } from "framer-motion";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from "../../custom/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [toggle, setToggle] = useState(false);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const stickyHeaderfunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out Successfully");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderfunc();

    return () => window.removeEventListener("scroll", stickyHeaderfunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

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
                {nav__links.map((item, index) => (
                  <motion.li
                    whileTap={{ scale: 0.9 }}
                    className="nav__item"
                    key={index}
                  >
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              {/* <span className="fav_icon">
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span> */}
              <span className="cart_icon" onClick={navigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 0.7 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt="userIcon"
                  onClick={handleToggle}
                />

                <div
                  className={
                    toggle ? "show__profile_Action" : "profile__action"
                  }
                >
                  {currentUser ? (
                    <span onClick={logOut}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column SL">
                      <motion.span whileTap={{ scale: 0.9 }}>
                        <Link to="/signup">Signup</Link>
                      </motion.span>
                      <motion.span whileTap={{ scale: 0.9 }}>
                        <Link to="/login">Login</Link>
                      </motion.span>
                      <motion.span whileTap={{ scale: 0.9 }}>
                        <Link to="/dashboard">Dashboard</Link>
                      </motion.span>
                    </div>
                  )}
                </div>
              </div>
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
};

export default Header;
