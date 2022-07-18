import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { $, jQuery } from "jquery";
import Popper from "popper.js";

import { Provider } from "react-redux";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

import configureStore from "./store/configureStore";

const store = configureStore();

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

// function AuthIsLoaded({ children }) {
//   const auth = useSelector((state) => state.firebase.auth);
//   if (!isLoaded(auth)) {
//     return <div>Loading...</div>;
//   }
//   return children;
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReactReduxFirebaseProvider>
  </Provider>
);
