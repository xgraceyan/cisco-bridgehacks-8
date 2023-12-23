import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { isLoaded } from "react-redux-firebase";
import TeamCard from "./TeamCard";
import { Link } from "react-router-dom";
import TeamCodeModal from "./TeamCodeModal";

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
    console.log(this.props);

    if (isLoaded(auth)) {
      if (auth.uid) {
        return (
          <div className="container" id="teams-menu">
            <div className="text-center pb-5">
              <h1>Welcome, {profile.firstName}!</h1>
              <p>
                <em>{profile.email}</em>
              </p>
            </div>
            <section id="team-actions" className="pb-5">
              <div className="row text-center">
                <div className="col-lg-2 col-sm-0"></div>
                <div className="col-lg-3 col-sm-6">
                  <h1>Join a Team</h1>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="joinCode" className="form-label">
                        Enter your Team Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="joinCode"
                        placeholder="Team Code"
                        onChange={this.handleJoinChange}
                      />
                    </div>
                    <a href={"/jointeam/" + this.state.joinCode}>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </a>
                  </form>
                </div>

                <div className="col-lg-2 col-sm-0"></div>

                <div className="col-lg-3 col-sm-6">
                  <h1>Create a Team</h1>
                  <a href="/createteam">
                    <button type="submit" className="btn btn-primary">
                      Create Team
                    </button>
                  </a>
                </div>
                <div className="col-lg-2 col-sm-0"></div>
              </div>
            </section>
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
