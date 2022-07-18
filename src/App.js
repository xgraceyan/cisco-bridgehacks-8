import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LogIn from "./auth/LogIn";
import SignUp from "./auth/SignUp";

import Dashboard from "./dashboard/Dashboard";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
