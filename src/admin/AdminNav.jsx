import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import useAuth from "../custom/hooks/useAuth";
import "../style/admin-nav.css";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All-Products",
    path: "/dashboard/all-product",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
];

const AdminNav = () => {
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const [toggle, setToggle] = useState(false);

  const { currentUser } = useAuth();
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top nav__icons">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2>Multimart</h2>
              </div>
              <div className="search__box">
                <input type="text" placeholder="Search..." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                <div className="profile" >
                <img src={currentUser && currentUser.photoURL} className="profile" onClick={handleToggle} />
                <div
                  className={
                    toggle ? "show__profile_Action" : "profile__action"
                  } 
                >
                  {currentUser ? (
                    <div className="d-flex align-items-center justify-content-center flex-column SL">
                      <span >Logout</span>
                    <motion.span whileTap={{ scale: 0.9 }}>
                        <Link to="/home">Home</Link>
                      </motion.span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column SL">
                      <motion.span whileTap={{ scale: 0.9 }}>
                        <Link to="/signup">Signup</Link>
                      </motion.span>
                      <motion.span whileTap={{ scale: 0.9 }}>
                        <Link to="/login">Login</Link>
                      </motion.span>
                    </div>
                  )}
              </div>
                </div>
              </div>
              
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <Col lg='12' >
            <div className="admin__navigation ">
              <ul className="admin__menu-list">
                {admin__nav.map((e, i) => (
                  <li className="admin__menu-item" key={i}>
                    <NavLink
                      to={e.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                    >
                      {e.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
