import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { isLoaded } from "react-redux-firebase";
import TeamCard from "./TeamCard";
import { Link } from "react-router-dom";

class TeamMenu extends React.Component {
  state = {
    joinCode: "",
  };

  handleJoinChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { auth, profile } = this.props;

    if (isLoaded(auth)) {
      if (auth.uid) {
        return (
          <div className="container" id="teams-menu">
            <section id="my-teams">
              <h1>My Teams</h1>
              <div className="row">
                {profile.teams &&
                  profile.teams.map((teamId) => {
                    return (
                      <TeamCard
                        teamId={teamId}
                        userId={auth.uid}
                        key={teamId}
                      />
                    );
                  })}
              </div>
            </section>
            <section id="team-actions">
              <div className="row">
                <div className="col-lg-3 col-sm-6">
                  <h1>Join a Team</h1>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="joinCode" className="form-label">
                        Team Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="joinCode"
                        placeholder="Team Code"
                        onChange={this.handleJoinChange}
                      />
                    </div>
                    <Link to={"/jointeam/" + this.state.joinCode}>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </Link>
                  </form>
                </div>

                <div className="col-lg-3 col-sm-6"></div>

                <div className="col-lg-3 col-sm-6">
                  <h1>Create a Team</h1>
                  <a href="/createteam">
                    <button type="submit" className="btn btn-primary">
                      Create Team
                    </button>
                  </a>
                </div>
              </div>
            </section>
          </div>
        );
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
    teams: state.firestore.data,
  };
};

export default connect(mapStateToProps)(TeamMenu);
