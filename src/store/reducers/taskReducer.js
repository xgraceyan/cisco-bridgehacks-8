const initState = {};

const taskReducer = (state = initState, action) => {
  switch (action.type) {
    case "TASK_CREATE_SUCCESS":
      return {
        ...state,
        newTaskId: action.taskId,
      };

    default:
      return state;
  }
};

export default taskReducer;
