import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router";
var sortJsonArray = require("sort-json-array");

function Leaderboard(props) {
  const { teamId } = useParams();

  // const [list, setList] = useState();

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

  if (teams && teams[teamId].points && users) {
    var count = 0;

    const list = [...teams[teamId].points];

    function sortByPoints(a, b) {
      if (a.points < b.points) return 1;
      if (a.points > b.points) return -1;
      if (a.points == b.points) {
        if (list.indexOf(a) > list.indexOf(b)) return -1;
        else return 1;
      }
    }

    if (list) {
      list.sort(sortByPoints);
    }

    if (list && list.length > 0) {
      return (
        <div className="container" id="leaderboard">
          <div className="text-center mb-3">
            <h1>Points Leaderboard</h1>
            <h5 className="text-muted">{teams[teamId].name}</h5>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((member) => {
                  count++;
                  return (
                    <tr key={member.id}>
                      <th scope="row">{count}</th>
                      <td>
                        {users[member.id].firstName} {users[member.id].lastName}
                      </td>
                      <td>{member.points}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <h5 className="text-center">
          You do not have any members on your team.
        </h5>
      );
    }
  }
}

export default Leaderboard;
