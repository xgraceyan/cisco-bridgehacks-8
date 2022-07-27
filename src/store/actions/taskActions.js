export const submitTask = (taskId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .firestore()
      .collection("tasks")
      .doc(taskId)
      .update({
        status: 1,
        submitDate: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        dispatch({ type: "TASK_SUBMIT_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "TASK_SUBMIT_FAILURE" });
        console.log(err);
      });
  };
};

export const approveTask = (taskId, teamId, userId, points) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .firestore()
      .collection("tasks")
      .doc(taskId)
      .update({
        status: 2,
        approvalDate: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        firebase
          .firestore()
          .collection("teams")
          .doc(teamId)
          .get()
          .then((doc) => {
            const pointsData = doc
              .data()
              .points.find(({ id }) => id === userId).points;
            firestore
              .collection("teams")
              .doc(teamId)
              .update({
                points: firebase.firestore.FieldValue.arrayRemove({
                  id: userId,
                  points: pointsData,
                }),
              })
              .then(() => {
                firestore
                  .collection("teams")
                  .doc(teamId)
                  .update({
                    points: firebase.firestore.FieldValue.arrayUnion({
                      id: userId,
                      points: pointsData + points,
                    }),
                  });
              });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      });
    //   .then(() => {
    //     dispatch({ type: "TASK_APPROVE_SUCCESS" });
    //   })
    //   .catch((err) => {
    //     dispatch({ type: "TASK_APPROVE_FAILURE" });
    //     console.log(err);
    //   });
  };
};

export const createTask = (data, teamId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .firestore()
      .collection("tasks")
      .add({
        name: data.taskName,
        description: data.description,
        points: data.points,
        userId: data.userId,
        dueDate: firebase.firestore.Timestamp.fromDate(new Date(data.dueDate)),
        teamId: teamId,
        status: 0,
        assignDate: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then((docRef) => {
        firestore
          .collection("tasks")
          .doc(docRef.id)
          .update({
            taskId: docRef.id,
          })
          .then(() => {
            dispatch({
              type: "TASK_CREATE_SUCCESS",
              taskId: docRef.id,
            });
          })
          .catch((err) => {
            dispatch({ type: "TASK_CREATE_FAILURE", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "TASK_CREATE_FAILURE", err });
      });
  };
};

export const deleteTask = (taskId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .firestore()
      .collection("tasks")
      .doc(taskId)
      .delete()
      .then(() => {
        dispatch({ type: "TASK_DELETE_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "TASK_DELETE_FAILURE" });
        console.log(err);
      });
  };
};
