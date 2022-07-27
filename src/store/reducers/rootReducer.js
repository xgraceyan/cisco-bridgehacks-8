import authReducer from "./authReducer";

import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import teamReducer from "./teamReducer";
import taskReducer from "./taskReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
  task: taskReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
