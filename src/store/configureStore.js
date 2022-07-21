import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";

import { getFirestore, reduxFirestore } from "redux-firestore";

import { getFirebase } from "react-redux-firebase";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase/firebaseConfig";
import rootReducer from "./reducers/rootReducer";

export default function configureStore(preloadedState) {
  const rfConfig = { allowMultipleListeners: true };
  const composedEnhancers = compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, rfConfig)
  );

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
