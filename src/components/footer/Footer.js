import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        <p className="mb-1">&copy; {new Date().getFullYear()} Daikin</p>
        <p className="mb-0">
          <a href="/privacy" className="text-white text-decoration-underline">Privacy Policy</a> | 
          <a href="/terms" className="text-white text-decoration-underline ms-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
