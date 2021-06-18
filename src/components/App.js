import React from "react"
import CreateTutorAccount from "./CreateTutorAccount"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard/Dashboard"
import Profile from "./Profile"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import ChangePassword from "./ChangePassword"
import UpdateTutorProfile from "./UpdateTutorProfile"
import MarkAttendance from "./Attendance/MarkAttendance"
import ViewAttendance from "./Attendance/ViewAttendance"
import TuteeObservation from "./Observation/TuteeObservation"
import ViewObservation from "./Observation/ViewObservation"
import Schedule from "./Schedule"
import Feedback from "./Feedback"
import CreateTuteeProfile from "./CreateTuteeProfile"
import SearchTuteeProfile from "./SearchTuteeProfile"
import UpdateTuteeProfile from "./UpdateTuteeProfile"


function App() {
  return (
      <>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component = {Dashboard} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/change-password" component={ChangePassword} />
              <PrivateRoute path="/create-tutee-profile" component={CreateTuteeProfile} />
              <PrivateRoute path="/update-tutor-profile" component={UpdateTutorProfile} />
              <PrivateRoute path="/update-tutee-profile" component={UpdateTuteeProfile} />
              <PrivateRoute path="/search-tutee-profile" component={SearchTuteeProfile} />
              <PrivateRoute path="/mark-attendance" component={MarkAttendance} />
              <PrivateRoute path="/view-attendance" component={ViewAttendance} />
              <PrivateRoute path="/tutee-observation" component={TuteeObservation} />
              <PrivateRoute path="/view-observation" component={ViewObservation} />
              <PrivateRoute path="/schedule" component={Schedule} />
              <PrivateRoute path="/feedback" component={Feedback} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/create-account" component={CreateTutorAccount} />
            </Switch>
          </AuthProvider>
        </Router>
      </>
  );
}

export default App;
