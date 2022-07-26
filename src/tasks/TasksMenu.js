import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ActiveTaskCard from "./ActiveTaskCard";
import WaitingTaskCard from "./WaitingTaskCard";

function TasksMenu(props) {
  const navigate = useNavigate();

  const { teamId } = useParams();
  const userId = props.auth.uid;

  useFirestoreConnect([
    {
      collection: "teams",
    },
  ]);
  const teams = useSelector(
    (state) => state.firestore.data.teams && state.firestore.data.teams
  );

  React.useEffect(() => {
    if (teams) {
      if (
        !Object.keys(teams).includes(teamId) ||
        !props.profile.teams.includes(teamId)
      ) {
        navigate("/");
      }
    }
  }, []);

  if (teams) {
    return (
      <div className="container" id="tasks-menu">
        <h1 className="text-center">Tasks for {teams[teamId].name}</h1>
        <section id="current-tasks">
          <h3>Current Tasks</h3>
          <ActiveTaskCard teamId={teamId} userId={userId} />
        </section>
        <section id="waiting-tasks">
          <h3>Waiting for Approval</h3>
          <WaitingTaskCard teamId={teamId} userId={userId} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(TasksMenu);
