import { NavLink } from "react-router-dom";
import React from "react";

const SignedOutNav = () => {
  return (
    <div className="navbar-nav" id="signed-out-nav">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/signup" className="nav-link">
        Sign Up
      </NavLink>
      <NavLink to="/login" className="nav-link">
        Log In
      </NavLink>
    </div>
  );
};

export default SignedOutNav;
