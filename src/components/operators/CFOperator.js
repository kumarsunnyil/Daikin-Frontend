import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import React from "react";
import Menu from "../navbar/Menu";
import Footer from "../footer/Footer";
import Compressors from "../compressors/Compressors";
import ChillFTabs from "./ChillFTabs";


const CFOperator = () => {
  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  let operatorMenu;
  if (storedAuth?.roleName === "comfoperator") {
    operatorMenu = (
      <Tab eventKey="compressors" title="Compressor">
        <Compressors />
      </Tab>
    );
  } else if (storedAuth?.roleName === "chilloperator") {
    operatorMenu = (
      <Tab eventKey="mypicklist" title="Chill Operators">
        <ChillFTabs />
      </Tab>
    );
  }
  return (
    <>
      <Menu />

      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-2"
        justify
      >
        {operatorMenu}
      </Tabs>
      <Footer />
    </>
  );
};

export default CFOperator;
