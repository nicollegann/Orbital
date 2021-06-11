import React from "react"
import CreateTutorAccount from "./CreateTutorAccount"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Profile from "./Profile"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import ChangePassword from "./ChangePassword"
import ContactAdmin from "./ContactAdmin"
import UpdateProfile from "./UpdateProfile"
import MarkAttendance from "./Attendance/MarkAttendance"
import ViewAttendance from "./Attendance/ViewAttendance"
import Observation from "./Observation"
import Schedule from "./Schedule"
import Feedback from "./Feedback"
import CreateTuteeProfile from "./CreateTuteeProfile"

function App() {
  return (
      <>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component = {Dashboard} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/change-password" component={ChangePassword} />
              <PrivateRoute path="/create-tutor-account" component={CreateTutorAccount} />
              <PrivateRoute path="/create-tutee-profile" component={CreateTuteeProfile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/mark-attendance" component={MarkAttendance} />
              <PrivateRoute path="/view-attendance" component={ViewAttendance} />
              <PrivateRoute path="/tutee-observation" component={Observation} />
              <PrivateRoute path="/schedule" component={Schedule} />
              <PrivateRoute path="/feedback" component={Feedback} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/contact-admin" component={ContactAdmin} />
            </Switch>
          </AuthProvider>
        </Router>
      </>
  );
}

export default App;
