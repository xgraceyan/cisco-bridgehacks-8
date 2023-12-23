import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { leaveTeam, deleteTeam } from "../store/actions/teamActions";
var jsonQuery = require("json-query");

function LeaveTeam(props) {
  const [action, setAction] = React.useState();
  const [teamName, setTeamName] = React.useState();

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

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!teamId) {
      // teamId doesn't exist
      navigate("/teams");
    } else if (
      teams &&
      props.profile.teams &&
      props.profile.teams.includes(teamId)
    ) {
      // user in team
      var keys = Object.keys(teams);
      if (keys.includes(teamId)) {
        setTeamName(teams[teamId].name);
        if (teams[teamId].owner === userId) {
          setAction("deleted");
          // owner -> use deleteTeam()
          props.deleteTeam(userId, teamId, teams.members);
        } else {
          setAction("left");
          const points = jsonQuery("points[id=" + userId + "]", {
            data: teams[teamId],
          }).value;
          props.leaveTeam(userId, teamId, points);
        }
      } else navigate("/teams");
    }
  }, []);

  return (
    <div className="container text-center">
      <h1 className="text-center">Successfully removed {teamName}</h1>
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
    leaveTeam: (userId, teamId) => dispatch(leaveTeam(userId, teamId)),
    deleteTeam: (userId, teamId) => dispatch(deleteTeam(userId, teamId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaveTeam);
