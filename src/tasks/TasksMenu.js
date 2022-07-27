import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ActiveTaskCard from "./ActiveTaskCard";
import WaitingTaskCard from "./WaitingTaskCard";
import CompletedTaskCard from "./CompletedTaskCard";
import OwnerTasksMenu from "./owner/OwnerTasksMenu";
var jsonQuery = require("json-query");

function TasksMenu(props) {
  const navigate = useNavigate();

  const { teamId } = useParams();
  const userId = props.auth.uid;

  useFirestoreConnect([
    {
      collection: "teams",
    },
    {
      collection: "tasks",
      where: ["teamId", "==", teamId],
      where: ["userId", "==", userId],
    },
    {
      collection: "users",
      where: ["teams", "array-contains", teamId],
    },
  ]);

  const data = useSelector(
    (state) => state.firestore.data && state.firestore.data
  );

  const { teams, users } = data;

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

  if (teams && users) {
    if (teams[teamId].owner === userId) {
      // owner task page
      return (
        <OwnerTasksMenu team={teams[teamId]} teamId={teamId} users={users} />
      );
    } else {
      // member task page
      const activeTasks = jsonQuery("tasks[**][*status=0]", {
        data: data,
      }).value;

      const waitingTasks = jsonQuery("tasks[**][*status=1]", {
        data: data,
      }).value;

      const completedTasks = jsonQuery("tasks[**][*status=2]", {
        data: data,
      }).value;

      return (
        <div className="container" id="tasks-menu">
          <h1 className="text-center">Tasks for {teams[teamId].name}</h1>
          <p className="text-center">
            Hello! Here are the tasks you have been assigned to do.
          </p>
          <section id="current-tasks">
            <ActiveTaskCard tasks={activeTasks} />
          </section>
          <section id="waiting-tasks">
            <WaitingTaskCard tasks={waitingTasks} />
          </section>
          <section id="completed-tasks">
            <CompletedTaskCard tasks={completedTasks} />
          </section>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(TasksMenu);
