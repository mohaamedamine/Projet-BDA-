import React, { useState, useEffect, useContext } from "react";
import { Button } from "../../Button.js/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { BsFillPersonFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useHistory } from "react-router-dom";

//import Modal from "react-responsive-modal";
import { AuthContext } from "../../../context/authContext";
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  //const [login,register] = useState(false);
  /* function onOpenModel  (){
    this.setState(true) ;
  }
  function onOpenModalRegister(){
    this.setState(true);
  }
  function onCloseModal(){
    this.setState(false);
  }
  function onCloseModalRegister(){
    this.setState(false);
  }
*/
  const { user, logout } = useContext(AuthContext);
  const userLogout = () => {
    logout();
    history.push("/");
  };
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const history = useHistory();
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return window.removeEventListener("resize", showButton);
  }, []);
  //const [openPopupSignIn, setOpenPopupSignIn] = useState(false);

  const navBar = (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link
              to="/Profile"
              className="navbar-logo"
              onClick={closeMobileMenu}
            >
              <BsFillPersonFill className="navbar-icon" />
              {user.firstName} {user.lastName}
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  to="/Events"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Guests"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Guests
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Check"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Check
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Stats"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Stats
                </Link>
              </li>
              <li className="nav-btn">
                {button ? (
                  <Button buttonStyle="btn--outline" onClick={userLogout}>
                    Log Out
                  </Button>
                ) : (
                  <Button
                    buttonStyle="btn--outline"
                    onClick={userLogout}
                    //onClick={closeMobileMenu}
                  >
                    LOG OUT
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );

  return navBar;
}

export default Navbar;
