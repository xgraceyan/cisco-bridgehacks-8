import authReducer from "./authReducer";

import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import teamReducer from "./teamReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
