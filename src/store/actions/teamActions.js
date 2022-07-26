export const joinTeam = (userId, teamId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .firestore()
      .collection("teams")
      .doc(teamId)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(userId),
        points: firebase.firestore.FieldValue.arrayUnion({
          id: userId,
          points: 0,
        }),
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(userId)
          .update({
            teams: firebase.firestore.FieldValue.arrayUnion(teamId),
          })
          .then(() => {
            dispatch({ type: "TEAM_JOIN_SUCCESS" });
          })
          .catch((err) => {
            dispatch({ type: "TEAM_JOIN_FAILURE", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "TEAM_JOIN_FAILURE", err });
        console.log(err);
      });
  };
};

export const leaveTeam = (userId, teamId, points) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .firestore()
      .collection("teams")
      .doc(teamId)
      .update({
        members: firebase.firestore.FieldValue.arrayRemove(points),
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(userId)
          .update({
            teams: firebase.firestore.FieldValue.arrayRemove(teamId),
          });
      });
  };
};

export const deleteTeam = (userId, teamId, teamMembers) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    // remove team document
    firebase
      .firestore()
      .collection("teams")
      .doc(teamId)
      .delete()
      .then(() => {
        // remove team from owner
        firestore
          .collection("users")
          .doc(userId)
          .update({
            teams: firebase.firestore.FieldValue.arrayRemove(teamId),
          })
          .then(() => {
            teamMembers &&
              teamMembers.map((teamMember) => {
                firestore
                  .collection("users")
                  .doc(teamMember)
                  .update({
                    teams: firebase.firestore.FieldValue.arrayRemove(teamId),
                  });
              });
          });
      });
  };
};

export const createTeam = (userId, teamInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .firestore()
      .collection("teams")
      .add({
        name: teamInfo.name,
        members: [],
        points: [],
        owner: userId,
        pointWeeks: parseInt(teamInfo.pointWeeks),
      })
      .then((docRef) => {
        firestore
          .collection("users")
          .doc(userId)
          .update({
            teams: firebase.firestore.FieldValue.arrayUnion(docRef.id),
          })
          .then(() => {
            dispatch({ type: "TEAM_CREATE_SUCCESS", teamId: docRef.id });
          })
          .catch((err) => {
            dispatch({ type: "TEAM_CREATE_FAILURE", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "TEAM_CREATE_FAILURE", err });
        console.log(err);
      });
  };
};
