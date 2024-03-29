import React from "react";
import { submitTask } from "../store/actions/taskActions";
import { connect } from "react-redux";
var moment = require("moment");
var sortJsonArray = require("sort-json-array");

function ActiveTaskCard(props) {
  const { tasks, owner, users } = props;

  if (tasks.length > 0) {
    const orderedTasks = sortJsonArray(tasks, "dueDate", "asc");
    return (
      <div>
        <h3>Active Tasks {"(" + orderedTasks.length + ")"}</h3>
        <div className="row">
          {orderedTasks.map((task) => {
            return (
              <div className="col-lg-3 col-sm-6" key={task.taskId}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Due: {moment(task.dueDate.toDate()).calendar()}
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
                    <a href={"/task/" + task.taskId} className="card-link">
                      View Task
                    </a>
                    {owner === 1 ? null : (
                      <a
                        href="#"
                        className="card-link"
                        onClick={(e) => {
                          e.preventDefault();
                          props.submitTask(task.taskId);
                        }}
                      >
                        Mark as Complete
                      </a>
                    )}
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
        <h3>Active Tasks (0)</h3>
        <p>You have no active tasks.</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitTask: (taskId) => dispatch(submitTask(taskId)),
  };
};

export default connect(null, mapDispatchToProps)(ActiveTaskCard);
