import React from "react";
import { connect } from "react-redux";
import SignedInNav from "./SignedInNav";
import SignedOutNav from "./SignedOutNav";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    const { auth, profile } = this.props;
    const navLinks = auth.uid ? (
      <SignedInNav profile={profile} />
    ) : (
      <SignedOutNav />
    );

    return (
      <nav className="navbar navbar-light navbar-expand-lg ps-3 pe-3">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand fw-bold">
            Educated Brainstorm
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {navLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
