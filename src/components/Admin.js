import { Link } from "react-router-dom";
import Users from "./Users";
import Menu from "./navbar/Menu";
import Footer from "./footer/Footer";
import ControlledDashboard from "./dashboard/ControlledDashboard";

const Admin = () => {
  return (
    <>
      <Menu />
      <ControlledDashboard />
      <Footer />
    </>
  );
};

export default Admin;
