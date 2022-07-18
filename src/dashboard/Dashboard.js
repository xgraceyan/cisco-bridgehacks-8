import React from "react";
import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";

class Dashboard extends React.Component {
  handleLogOut = (e) => {
    e.preventDefault();
    this.props.logOut();
  };

  render() {
    const { auth } = this.props;

    if (auth.uid) {
      return (
        <div className="dashboard container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleLogOut}
          >
            Log Out
          </button>
        </div>
      );
    } else {
      return <div>Not logged in</div>;
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
