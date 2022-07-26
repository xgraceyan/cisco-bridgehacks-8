import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
var moment = require("moment");

export default function ActiveTaskCard(props) {
  const { teamId, userId } = props;

  useFirestoreConnect([
    {
      collection: "tasks",
      where: ["teamId", "==", teamId],
      where: ["userId", "==", userId],
      where: ["status", "==", 0],
      orderBy: ["dueDate", "asc"],
    },
  ]);

  const tasks = useSelector(
    (state) => state.firestore.data.tasks && state.firestore.data.tasks
  );

  console.log(tasks);

  if (tasks) {
    return (
      <div className="row">
        {Object.keys(tasks).map((key, index) => {
          const task = tasks[key];
          return (
            <div className="col-lg-3 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{task.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Due: {moment(task.dueDate.toDate()).calendar()}
                  </h6>
                  <p className="card-text">
                    {task.description.length > 90
                      ? task.description.substring(0, 90) + "..."
                      : task.description}
                  </p>
                  <a href="#" className="card-link">
                    View Task
                  </a>
                  <a href="#" className="card-link">
                    Mark as Complete
                  </a>
                </div>
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
