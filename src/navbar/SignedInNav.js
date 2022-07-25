import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";
import { NavLink } from "react-router-dom";

const SignedInNav = (props) => {
  const profile = props.profile;
  return (
    <div className="navbar-nav" id="signed-out-nav">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/teams" className="nav-link">
        My Teams
      </NavLink>
      <a className="nav-link" onClick={props.logOut} href="/">
        Log Out
      </a>
      <span className="navbar-text text-muted ms-auto">
        &nbsp; &nbsp; (Signed in as {profile.firstName} {profile.lastName})
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInNav);
