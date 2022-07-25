import React from "react";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { createTeam } from "../store/actions/teamActions";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import TeamInvite from "./TeamInvite";

class CreateTeam extends React.Component {
  state = {
    name: "",
    pointWeeks: "",
    formError: "",
  };

  // updates state every time inputs change
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // creates team when form submitted
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name === "") {
      this.setState({ formError: "Team name required" });
    } else {
      this.props.createTeam(this.props.auth.uid, this.state);
    }
  };

  render() {
    const { auth, newTeamId } = this.props;

    console.log(this.props);

    if (isLoaded(auth)) {
      if (auth.uid) {
        if (newTeamId) {
          // team created page
          return <TeamInvite teamName={this.state.name} teamId={newTeamId} />;
        } else {
          // team create form
          return (
            <div className="container" id="create-team-form">
              {this.state.formError === "" ? null : (
                <div className="alert alert-danger" role="alert">
                  Team name required
                </div>
              )}
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Team Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Team name"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pointWeeks" className="form-label">
                    Point Refresh Weeks
                  </label>
                  <select
                    className="form-select"
                    size="3"
                    id="pointWeeks"
                    defaultValue={"1"}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          );
        }
      } else {
        return <Navigate to="/" />;
      }
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    newTeamId: state.team.newTeamId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTeam: (userId, teamInfo) => dispatch(createTeam(userId, teamInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
