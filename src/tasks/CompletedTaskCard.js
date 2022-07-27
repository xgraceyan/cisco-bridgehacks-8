import React from "react";
var moment = require("moment");
var sortJsonArray = require("sort-json-array");

export default function CompletedTaskCard(props) {
  const { tasks, users, owner } = props;

  if (tasks.length > 0) {
    const orderedTasks = sortJsonArray(tasks, "approvalDate", "des");
    return (
      <div>
        <h3>Completed Tasks {"(" + orderedTasks.length + ")"}</h3>
        <div className="row">
          {orderedTasks.map((task) => {
            return (
              <div className="col-lg-3 col-sm-6" key={task.taskId}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                    <p className="card-subtitle text-success">
                      Completed & Approved
                    </p>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Approved: {moment(task.approvalDate.toDate()).calendar()}
                    </h6>
                    {owner === 1 && users ? (
                      <p className="card-subtitle mb-2 text-muted">
                        Assigned to: {users[task.userId].firstName}{" "}
                        {users[task.userId].lastName}
                      </p>
                    ) : null}
                    <p className="card-subtitle mb-2 text-muted">
                      Points: {task.points}
                    </p>
                    <p className="card-text">
                      {task.description.length > 90
                        ? task.description.substring(0, 90) + "..."
                        : task.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Completed Tasks (0)</h3>
        <p>You have no completed tasks.</p>
      </div>
    );
  }
}
