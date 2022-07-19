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
      <NavLink to="/signup" className="nav-link">
        {profile.firstName} {profile.lastName}
      </NavLink>
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
