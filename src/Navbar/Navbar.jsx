import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>

      <Link to={"/about"}>About Us</Link>

      <Link to={"/contact"}>Contact Us</Link>
    </div>
  );
};

export default Navbar;
