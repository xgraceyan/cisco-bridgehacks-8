import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

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
    return (
      <div className="col-lg-3 col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{teams.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{teamRole}</h6>
            <p className="card-text">
              {teams.members.length + 1} people in team
            </p>
            <a href="#" className="card-link">
              View Tasks
            </a>
            <a href="#" className="card-link">
              Leave Team
            </a>
          </div>
        </div>
      </div>
    );
  }
}
