import React from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import ActiveTaskCard from "../ActiveTaskCard";
import WaitingTaskCard from "../WaitingTaskCard";
import CompletedTaskCard from "../CompletedTaskCard";
import TeamCodeModal from "../../team/TeamCodeModal";
var jsonQuery = require("json-query");

function OwnerTasksMenu(props) {
  const { team, teamId, users } = props;
  console.log(">>>>", props);

  useFirestoreConnect([
    {
      collection: "tasks",
      where: ["teamId", "==", teamId],
    },
  ]);

  const data = useSelector(
    (state) => state.firestore.data && state.firestore.data
  );

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
      <TeamCodeModal teamName={team.name} code={teamId} />
      <div className="text-center pb-5">
        <h1 className="text-center">Tasks for {team.name}</h1>
        <p className="text-center">
          Manage and add members' tasks (owner view)
        </p>
        <a
          className="text-center"
          href=""
          data-bs-toggle="modal"
          data-bs-target="#teamCodeModal"
        >
          <h5>Show code</h5>
        </a>
        <a className="text-center" href={"/createtask/" + teamId}>
          <h4>Create a Task</h4>
        </a>
      </div>
      <section id="waiting-tasks">
        <WaitingTaskCard tasks={waitingTasks} owner={1} users={users} />
      </section>
      <section id="current-tasks">
        <ActiveTaskCard tasks={activeTasks} owner={1} users={users} />
      </section>
      <section id="completed-tasks">
        <CompletedTaskCard tasks={completedTasks} owner={1} users={users} />
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(OwnerTasksMenu);
