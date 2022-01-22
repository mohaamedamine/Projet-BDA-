import React, { useState } from "react";
import { Button } from "../Button.js/Button";
import "./Plans.css";
import { TiDeviceLaptop } from "react-icons/ti";
import { TiGroup } from "react-icons/ti";
import { BsCameraVideo } from "react-icons/bs";
//import { GiCrystalize } from 'react-icons/gi';
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import Popup from "../panel/guest/GuestListView/Popup";
//import GuestPlans from "./GuestPlans";
function Plans(props) {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff", size: 64 }}>
        <div className="plan__section">
          <div className="plan__wrapper">
            <h1 className="plan__heading">Plans</h1>
            <div className="plan__container">
              <Link to="" className="plan__container-card">
                <div className="plan__container-cardInfo">
                  <div className="icon">
                    <TiDeviceLaptop />
                  </div>
                  <h3>Virtual</h3>
                  <h4>..</h4>
                  <p>Pick a date</p>
                  <ul className="plan__container-features">
                    <li>Invite guests</li>
                    <li>Start the meeting</li>
                    <li>Enjoy!</li>
                  </ul>
                  <Button buttonSize="btn--wide" buttonColor="primary">
                    Choose Plan
                  </Button>
                </div>
              </Link>
              <Link to="/" className="plan__container-card">
                <div className="plan__container-cardInfo">
                  <div className="icon">
                    <TiGroup />
                  </div>
                  <h3>In-Person</h3>
                  <h4>..</h4>
                  <p>Pick a date</p>
                  <ul className="plan__container-features">
                    <li>Locate </li>
                    <li>Invite guests</li>
                    <li>Check Qr code</li>
                  </ul>
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    Choose Plan
                  </Button>
                </div>
              </Link>
              <Link to="" className="plan__container-card">
                <div className="plan__container-cardInfo">
                  <div className="icon">
                    <BsCameraVideo />
                  </div>
                  <h3>Assist</h3>
                  <h4>..</h4>
                  <p>Guest</p>
                  <ul className="plan__container-features">
                    <li>Choose Plan</li>
                    <li>Enter your information</li>
                    <li>Join the meeting!</li>
                  </ul>
                  <Button
                    onClick={() => {
                      setOpenPopup(true);
                    }}
                    buttonSize="btn--wide"
                    buttonColor="primary"
                  >
                    Choose Plan
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </IconContext.Provider>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <Authentication setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
}

export default Plans;
