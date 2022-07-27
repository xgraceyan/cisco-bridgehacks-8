import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { logOut } from "../store/actions/authActions";

class Dashboard extends React.Component {
  handleLogOut = (e) => {
    e.preventDefault();
    this.props.logOut();
  };

  render() {
    const { auth } = this.props;

    if (auth.uid) {
      return <Navigate to="/teams" />;
    } else {
      return (
        <div className="text-center">
          You are not logged in. Please log in to access Educated Brainstorm.
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
