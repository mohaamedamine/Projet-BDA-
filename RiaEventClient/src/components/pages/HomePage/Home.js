import React from "react";
import EventSection from "../../EvenSection/EventSection";
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from "./Data";
import Plans from "../../Plans/Plans";
import Navbar from "../../NavBar.js/Navbar";
function Home() {
  return (
    <>
      <Navbar />
      <EventSection {...homeObjOne} />
      <EventSection {...homeObjThree} />
      <EventSection {...homeObjTwo} />
      <Plans />

      <EventSection {...homeObjFour} />
    </>
  );
}

export default Home;
