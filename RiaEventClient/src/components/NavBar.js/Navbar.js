import React, { useState, useEffect } from "react";
import { Button } from "../Button.js/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { MdEvent } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import Popup from "./Popup";
//import SignUp from "./SignUp";
import SignIn from "./SignIn";
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
  /*const handleClickOut = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };*/
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupSignIn, setOpenPopupSignIn] = useState(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <MdEvent className="navbar-icon" />
              RiaEvent
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  className="nav-links"
                  onClick={() => {
                    window.scrollTo(450, 0);
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-links"
                  onClick={() => {
                    window.scrollTo(0, 2030);
                  }}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-links"
                  onClick={() => {
                    window.scrollTo(0, 50000);
                  }}
                >
                  About
                </Link>
              </li>
              <li className="nav-btn">
                {button ? (
                  <Button
                    buttonStyle="btn--outline"
                    onClick={() => setOpenPopup(true)}
                  >
                    SIGN UP
                  </Button>
                ) : (
                  <Button
                    buttonStyle="btn--outline"
                    onClick={() => setOpenPopup(true)}
                    //onClick={closeMobileMenu}
                  >
                    SIGN UP
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <SignIn />
      </Popup>
      <Popup openPopup={openPopupSignIn} setOpenPopup={setOpenPopupSignIn}>
        <SignIn />
      </Popup>
    </>
  );
}

export default Navbar;
