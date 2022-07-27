import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createTask } from "../../store/actions/taskActions";

function CreateTask(props) {
  const { teamId } = useParams();
  const userId = props.auth.uid;
  const { newTaskId } = props;

  const [formState, setFormState] = useState({
    taskName: "",
    description: "",
    userId: "",
    points: 0,
    dueDate: "",
  });

  const [formError, setFormError] = useState("");

  function handleChange(e) {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  }

  // creates task when form submitted
  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(formState).includes("")) {
      setFormError("One or more fields are empty. All fields are required");
    } else {
      props.createTask(formState, teamId);
    }
  }

  useFirestoreConnect([
    {
      collection: "teams",
      doc: teamId,
    },
    {
      collection: "users",
      where: ["teams", "array-contains", teamId],
    },
  ]);

  const { teams, users } = useSelector(
    (state) => state.firestore.data && state.firestore.data
  );

  if (teams && users) {
    if (teams[teamId].owner === userId) {
      if (newTaskId) {
        // task created page
        return (
          <div className="container" id="task-created">
            <div className="text-center">
              <h1>Your task was created</h1>
              <a href={"/task/" + newTaskId}>
                <h5>Go to task</h5>
              </a>
              <a href={"/tasks/" + teamId}>
                <h5>Back to team tasks</h5>
              </a>
            </div>
          </div>
        );
      } else {
        // task creation form
        return (
          <div className="container" id="create-task-form">
            <div className="text-center">
              <h1>Create a Task</h1>
              <h5 className="text-muted">{teams[teamId].name}</h5>
            </div>
            {formError === "" ? null : (
              <div className="alert alert-danger" role="alert">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="taskName" className="form-label">
                  Task name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="taskName"
                  placeholder="Task name"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Task description"
                  onChange={handleChange}
                  rows="4"
                  cols="10"
                ></textarea>
              </div>

              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <label htmlFor="userId" className="form-label">
                      Select a Member
                    </label>
                    <select
                      className="form-select"
                      defaultValue=""
                      id="userId"
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {teams[teamId].members.length > 0 &&
                        teams[teamId].members.map((member) => {
                          return (
                            <option value={member} key={member}>
                              {users[member].firstName} {users[member].lastName}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="col">
                    <label htmlFor="points" className="form-label">
                      Points
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="points"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="dueDate" className="form-label">
                      Due Date
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="dueDate"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    newTaskId: state.task.newTaskId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (data, teamId) => dispatch(createTask(data, teamId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
