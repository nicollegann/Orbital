import React from "react"
import CreateTutorAccount from "./CreateTutorAccount"
import { AuthProvider } from "../contexts/AuthContext"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard/Dashboard"
import Profile from "./Profile"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import ChangePassword from "./ChangePassword"
import UpdateProfile from "./UpdateProfile"
import CreateTuteeProfile from "./TuteeTutorProfile/CreateTuteeProfile"
import ViewTuteeProfile from "./TuteeTutorProfile/ViewTuteeProfile"
import MarkAttendance from "./Attendance/MarkAttendance"
import ViewAttendance from "./Attendance/ViewAttendance"
import TuteeObservation from "./Observation/TuteeObservation"
import ViewObservation from "./Observation/ViewObservation"
import ViewUpcomingLesson from "./Schedule/ViewUpcomingLesson"
import ScheduleLesson from "./Schedule/ScheduleLesson"
import TuteeAvailability from "./Schedule/TuteeAvailability"
import AdminSetSlot from "./Schedule/AdminSetSlot"
import CancelLesson from "./Schedule/CancelLesson"
import TuteeVerificationCode from "./Schedule/TuteeVerificationCode"
import Feedback from "./Feedback/Feedback"
import ViewFeedback from "./Feedback/ViewFeedback"
import ViewTutorProfile from "./TuteeTutorProfile/ViewTutorProfile"
import EditProfile from "./TuteeTutorProfile/EditProfile"
import TutorVerificationCode from "./TuteeTutorProfile/TutorVerificationCode"

function App() {
  return (
      <>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component = {Dashboard} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/change-password" component={ChangePassword} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/mark-attendance" component={MarkAttendance} />
              <PrivateRoute path="/view-attendance" component={ViewAttendance} />
              <PrivateRoute path="/tutee-observation" component={TuteeObservation} />
              <PrivateRoute path="/view-observation" component={ViewObservation} />
              <PrivateRoute path="/view-upcoming-lesson" component={ViewUpcomingLesson} />
              <PrivateRoute path="/schedule-lesson" component={ScheduleLesson} />
              <PrivateRoute path="/set-slot" component={AdminSetSlot}/>
              <PrivateRoute path="/cancel-lesson" component={CancelLesson}/>
              <PrivateRoute path="/tutee-verification-code" component={TuteeVerificationCode}/>
              <PrivateRoute path="/feedback" component={Feedback} />
              <PrivateRoute path="/view-feedback" component={ViewFeedback} />
              <PrivateRoute path="/view-tutor-profile" component={ViewTutorProfile} />
              <PrivateRoute path="/tutor-verification-code" component={TutorVerificationCode} />
              <PrivateRoute path="/tutee-profile" component={ViewTuteeProfile} />
              <PrivateRoute path="/create-tutee-profile" component={CreateTuteeProfile} />
              <PrivateRoute path="/edit-profile" component={EditProfile} />
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