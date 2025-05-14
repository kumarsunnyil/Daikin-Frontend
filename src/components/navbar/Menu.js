import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import "./menu.css";
import HomeButton from "./HomeButton";
import ProfileImage from "../profile/Profile";
// import homeIcon from "../assets/home-icon.png";

const ADMINROLES = {
  User: 2001,
  Admin: 5150,
};
const USERROLES = {
  Editor: 2001,
  User: 1984,
};

const Menu = () => {
  const { setAuth } = useContext(AuthContext);
  const storedAuth = JSON.parse(localStorage.getItem("auth"));

  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    localStorage.removeItem("auth");
    navigate("/login");
    // navigate('/linkpage');
  };

  let menu;
  if (storedAuth?.roles?.includes(ADMINROLES.Admin)) {
    menu = (
      <ul className="nav-links">
        <li>
          <NavLink to="/" activeclassname="active">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin" activeclassname="active">
            Dashboard
          </NavLink>
        </li>

        <li>
          <a className="nav-button" onClick={logout}>
            Sign Out
          </a>
        </li>
        <li>
          <ProfileImage />
        </li>
      </ul>
    );
  } else {
    menu = (
      <ul className="nav-links">
        <li>
          <NavLink to="/" activeclassname="active">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/cfoperator" activeclassname="active">
            Operator Tab
          </NavLink>
        </li>

        <li>
          <a className="nav-button" onClick={logout}>
            Sign Out
          </a>
        </li>
        <li>
          <ProfileImage />
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar">
      {/* <div className="logo">MyApp</div> */}
      {console.log("User Object", storedAuth)}
      <HomeButton />
      {menu}
    </nav>
  );
};

export default Menu;
