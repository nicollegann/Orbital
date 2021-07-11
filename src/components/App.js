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
import ViewUpcomingLesson from "./Schedule/ViewUpcomingLesson"
import ScheduleLesson from "./Schedule/ScheduleLesson"
import TuteeAvailability from "./Schedule/TuteeAvailability"
import AdminSetSlot from "./Schedule/AdminSetSlot"
import CancelLesson from "./Schedule/CancelLesson"
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
              <PrivateRoute path="/view-upcoming-lesson" component={ViewUpcomingLesson} />
              <PrivateRoute path="/schedule-lesson" component={ScheduleLesson} />
              <PrivateRoute path="/set-slot" component={AdminSetSlot}/>
              <PrivateRoute path="/cancel-lesson" component={CancelLesson}/>
              <PrivateRoute path="/feedback" component={Feedback} />
              <PrivateRoute path="/view-feedback" component={ViewFeedback} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/create-account" component={CreateTutorAccount} />
              <Route path="/tutee-schedule-lesson" component={TuteeAvailability} />
            </Switch>
          </AuthProvider>
        </Router>
      </>
  );
}

export default App;