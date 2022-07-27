import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router";
var moment = require("moment");

function TaskPage(props) {
  const { taskId } = useParams();

  useFirestoreConnect([
    {
      collection: "tasks",
      doc: taskId,
    },
  ]);

  const tasks = useSelector(
    (state) => state.firestore.data.tasks && state.firestore.data.tasks
  );

  console.log(tasks);

  if (tasks) {
    const task = tasks[taskId];

    function getStatus(status) {
      if (status === 0) return "Active";
      if (status === 1) return "Waiting for Approval";
      if (status === 2) return "Completed";
      return "N/A";
    }

    return (
      <div className="container" id="tasks-page">
        <div className="text-center mb-3">
          <h1>{task.name}</h1>
          <h5 className="text-muted">Task info</h5>
        </div>

        <div className="mb-3">
          <p>
            <strong>Description: </strong> {task.description}
          </p>
          <p>
            <strong>Points: </strong> {task.points}
          </p>
          <p>
            <strong>Status: </strong> {getStatus(task.status)}
          </p>
          <p>
            <strong>Date assigned: </strong>{" "}
            {moment(task.assignDate.toDate()).calendar()}
          </p>
          <p>
            <strong>Date due: </strong>{" "}
            {moment(task.dueDate.toDate()).calendar()}
          </p>
          <p>
            <strong>Date submitted: </strong>{" "}
            {task.submitDate
              ? moment(task.dueDate.toDate()).calendar()
              : "Not submitted yet"}
          </p>
          <p>
            <strong>Date approved: </strong>{" "}
            {task.approvalDate
              ? moment(task.approvalDate.toDate()).calendar()
              : "Not approved yet"}
          </p>
        </div>
      </div>
    );
  }
}

export default TaskPage;
