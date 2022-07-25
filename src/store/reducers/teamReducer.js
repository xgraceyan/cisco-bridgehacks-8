const initState = {};

const teamReducer = (state = initState, action) => {
  switch (action.type) {
    case "TEAM_CREATE_SUCCESS":
      return {
        ...state,
        newTeamId: action.teamId,
      };

    default:
      return state;
  }
};

export default teamReducer;
