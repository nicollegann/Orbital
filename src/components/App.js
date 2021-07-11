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
import UpdateProfile from "./UpdateProfile"
import CreateTuteeProfile from "./TuteeProfile/CreateTuteeProfile"
import ViewTuteeProfile from "./TuteeProfile/ViewTuteeProfile"
import MarkAttendance from "./Attendance/MarkAttendance"
import ViewAttendance from "./Attendance/ViewAttendance"
import TuteeObservation from "./Observation/TuteeObservation"
import ViewObservation from "./Observation/ViewObservation"
import Schedule from "./Schedule"
import Feedback from "./Feedback"
import ViewFeedback from "./ViewFeedback"


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
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/tutee-profile" component={ViewTuteeProfile} />
              <PrivateRoute path="/mark-attendance" component={MarkAttendance} />
              <PrivateRoute path="/view-attendance" component={ViewAttendance} />
              <PrivateRoute path="/tutee-observation" component={TuteeObservation} />
              <PrivateRoute path="/view-observation" component={ViewObservation} />
              <PrivateRoute path="/schedule" component={Schedule} />
              <PrivateRoute path="/feedback" component={Feedback} />
              <PrivateRoute path="/view-feedback" component={ViewFeedback} />
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