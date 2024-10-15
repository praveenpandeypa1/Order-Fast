import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import Badge from "react-bootstrap/Badge";
import { useCart } from "./ContextReducer";

function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <div
              className="mx-3 fs-2  fs-italic  "
              style={{ color: "#FE8C00" }}
            >
              <Link className="navbar-brand  " to="/">
                OrderFast
              </Link>
            </div>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 fs-5 text-white">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li>
                  <Link to="/myOrder" className="nav-link px-2 fs-5 text-white ">
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="text-end">
                <Link to="/login">
                  <button type="button" className="btn btn-outline-light me-2">
                    Login
                  </button>
                </Link>
                <Link to="/createuser">
                  <button type="button" className="btn btn-warning">
                    Sign-up
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn  btn-warning mx-2"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Modal>
                ) : (
                  ""
                )}
                <div className="btn btn-danger mx-2" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
