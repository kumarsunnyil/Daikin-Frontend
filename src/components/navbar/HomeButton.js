import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/daikin-logo.png"; 
import "./homeButton.css"

const HomeButton = () => {
  return (
    <Link to="/" className="home-button">
      <img src={homeIcon} alt="Home" className="home-icon" />
    </Link>
  );
};

export default HomeButton;
