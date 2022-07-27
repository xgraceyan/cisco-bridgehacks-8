import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
var jsonQuery = require("json-query");

export default function TeamCard(props) {
  const { teamId, userId } = props;

  useFirestoreConnect([
    {
      collection: "teams",
      doc: teamId,
    },
  ]);
  const teams = useSelector(
    (state) => state.firestore.data.teams && state.firestore.data.teams[teamId]
  );

  if (teams) {
    const teamRole = teams.owner === userId ? "Owner" : "Member";

    const leaveTeam =
      teams.owner === userId ? (
        <a href={"/leaveteam/" + teamId} className="card-link text-danger">
          Delete Team
        </a>
      ) : (
        <a href={"/leaveteam/" + teamId} className="card-link text-danger">
          Leave Team
        </a>
      );

    var points = jsonQuery("points[id=" + userId + "].points", {
      data: teams,
    }).value;

    const pointsText =
      teams.owner === userId ? null : (
        <p className="card-text">My points: {points}</p>
      );

    return (
      <div className="col-lg-3 col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{teams.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{teamRole}</h6>
            <p className="card-text">
              {teams.members.length + 1} people in team
            </p>
            {pointsText}
            <a href={"/tasks/" + teamId} className="card-link">
              View Tasks
            </a>
            <a href={"/leaderboard/" + teamId} className="card-link">
              Leaderboard
            </a>
            <br />
            {leaveTeam}
          </div>
        </div>
      </div>
    );
  }
}
