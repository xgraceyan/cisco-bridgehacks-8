import React from "react";
import { connect } from "react-redux";
import SignedInNav from "./SignedInNav";
import SignedOutNav from "./SignedOutNav";

class Navbar extends React.Component {
  render() {
    const { auth, profile } = this.props;
    const navLinks = auth.uid ? (
      <SignedInNav profile={profile} />
    ) : (
      <SignedOutNav />
    );

    return (
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Educated Brainstorm
          </a>
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
