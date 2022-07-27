import React from "react";

import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

import "@firebase/firestore";

import Navbar from "./navbar/Navbar";
import LogIn from "./auth/LogIn";
import SignUp from "./auth/SignUp";
import Dashboard from "./dashboard/Dashboard";
import TeamMenu from "./team/TeamMenu";
import JoinTeam from "./team/JoinTeam";
import LeaveTeam from "./team/LeaveTeam";
import CreateTeam from "./team/CreateTeam";
import TasksMenu from "./tasks/TasksMenu";
import CreateTask from "./tasks/owner/CreateTask";
import TaskPage from "./tasks/TaskPage";
import Leaderboard from "./competition/Leaderboard";

class App extends React.Component {
  render() {
    const checkIsLoaded = function (firestore) {
      return !Object.values(firestore.status.requesting).find(
        (isRequesting) => isRequesting
      );
    };

    function AuthIsLoaded() {
      const auth = useSelector((state) => state.firebase.auth);
      if (checkIsLoaded) {
        if (isLoaded(auth)) {
          return <Outlet />;
        }
      } else {
        return <Navigate to="/login" />;
      }
    }

    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/teams" element={<TeamMenu />} />
          <Route path="/jointeam/:teamId" element={<JoinTeam />} />
          <Route path="/leaveteam/:teamId" element={<LeaveTeam />} />
          <Route path="/createteam" element={<CreateTeam />} />

          <Route element={<AuthIsLoaded />}>
            <Route path="/tasks/:teamId" element={<TasksMenu />} />
          </Route>

          <Route element={<AuthIsLoaded />}>
            <Route path="/createtask/:teamId" element={<CreateTask />} />
          </Route>

          <Route element={<AuthIsLoaded />}>
            <Route path="/task/:taskId" element={<TaskPage />} />
          </Route>

          <Route element={<AuthIsLoaded />}>
            <Route path="/leaderboard/:teamId" element={<Leaderboard />} />
          </Route>

          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
