import React, { useCallback, memo } from "react";
import { connect } from "react-redux";
import { getFirebase } from "react-redux-firebase";
import { useParams, Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { joinTeam } from "../store/actions/teamActions";

function JoinTeam(props) {
  const [message, setMessage] = React.useState();

  useFirestoreConnect([
    {
      collection: "teams",
    },
  ]);
  const teams = useSelector(
    (state) => state.firestore.data.teams && state.firestore.data.teams
  );

  // const teamId = this.props.match.params.teamId;
  const { teamId } = useParams();
  const userId = props.auth.uid;

  console.log("render");

  const joinTeamCallback = useCallback(() => {
    props.joinTeam(userId, teamId);
  });

  React.useEffect(() => {
    if (!teamId) {
      // teamId doesn't exist
      setMessage("Error: No team code specified");
    } else if (props.profile.teams && props.profile.teams.includes(teamId)) {
      // user already in team
      setMessage("Error: User already in team");
    } else if (teams) {
      var keys = Object.keys(teams);
      if (keys.includes(teamId)) {
        joinTeamCallback();
        setMessage("Success! Joined " + teams[teamId].name);
      } else {
        setMessage("Error: Team doesn't exist");
      }
    }
  }, []);

  return (
    <div className="container text-center">
      <h1 className="text-center">{message}</h1>
      <a href="/teams">
        <button type="button" className="btn btn-primary">
          Go to Teams
        </button>
      </a>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinTeam: (userId, teamId) => dispatch(joinTeam(userId, teamId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(JoinTeam);
