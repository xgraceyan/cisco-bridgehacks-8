import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";
import { NavLink } from "react-router-dom";
import React from "react";

const SignedInNav = (props) => {
  const profile = props.profile;
  return (
    <div className="navbar-nav ms-auto" id="signed-in-nav">
      <span className="navbar-text text-muted">
        &nbsp; &nbsp; (Signed in as {profile.firstName} {profile.lastName})
      </span>
      <a className="nav-link" onClick={props.logOut} href="/">
        Log Out
      </a>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInNav);
