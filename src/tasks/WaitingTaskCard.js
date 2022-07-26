import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
var moment = require("moment");

export default function WaitingTaskCard(props) {
  const { teamId, userId } = props;

  useFirestoreConnect([
    {
      collection: "tasks",
      where: ["teamId", "==", teamId],
      where: ["userId", "==", userId],
      where: ["status", "==", 1],
      orderBy: ["submitDate", "desc"],
    },
  ]);

  const tasks = useSelector(
    (state) => state.firestore.data.tasks && state.firestore.data.tasks
  );

  if (tasks) {
    return (
      <div className="col-lg-3 col-sm-6">
        {tasks.tasks &&
          tasks.tasks.map((task) => {
            return (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{task.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Submitted: {moment(task.submitDate.toDate()).calendar()}
                  </h6>
                  <p className="card-text">
                    {task.description.length > 90
                      ? task.description.substring(0, 90) + "..."
                      : task.description}
                  </p>
                  <a href="#" className="card-link">
                    Waiting for Approval
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    );
  } else {
    return <p>No tasks waiting for approval.</p>;
  }
}
