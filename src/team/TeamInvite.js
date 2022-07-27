import { Link } from "react-router-dom";
import React from "react";

const TeamInvite = (props) => {
  return (
    <div className="container text-center" id="team-created-page">
      <h1>Your team {props.teamName} was created!</h1>
      <p>Invite users to join with the code</p>
      <h1>
        <code>{props.teamId}</code>
      </h1>
      <p>Or join using the link:</p>
      <h5>
        <Link to={"/jointeam/" + props.teamId} target="_blank">
          {"https://main--melodic-swan-71c046.netlify.app/jointeam/" +
            props.teamId}
        </Link>
      </h5>
      <a href="/teams">
        <button type="submit" className="btn btn-primary">
          Back to Teams
        </button>
      </a>
    </div>
  );
};

export default TeamInvite;
