import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useGetCurrUserName, useGetCounter } from "../../hooks/useGetData"
import Attendance from "../images/markAttendance.png"
import AttendanceRecord from "../images/attendanceRecord.png"
import Observation from "../images/tuteeObservation.png"
import ObservationRecord from "../images/observationRecord.png"
import Schedule from "../images/lessonSchedule.png"
import Feedback from "../images/giveFeedback.png"
import TuteeProfile from "../images/tuteeProfile.png"
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import Buttons from "./Buttons"
import "./Dashboard.css"
import "../TutorManager.css"

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(18),
  },
  heading: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2)
  },
  buttonsgrid: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(4)
  },
  buttonsgrid2: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  icons: {
    backgroundColor: "#818e7d !important"
  }
}))

export default function Dashboard() {    
  const classes = useStyles()
  
  const getUserData = useGetCurrUserName()  
  const { getEmail } = useAuth()
  const isAdmin = getEmail() === "toinfinityandbeyond.orbital@gmail.com"

  const count = useGetCounter()
  const [feedbackNotif, setFeedbackNotif] = useState(false)
  
  useEffect(() => {
    if (isAdmin && count && count !== 0) {
      setFeedbackNotif(true)
    }
  }, [count, isAdmin])

  function FeedbackRouting() {
    if (isAdmin) {
      return (
        <>
          <Buttons tooltip="View Feedback" img={Feedback} link="/view-feedback"/>
          <center><h5>View Feedback</h5></center>
        </> 
      )
    } else {
      return (
        <>
          <Buttons tooltip="Submit Feedback" img={Feedback} link="/feedback"/>
          <center><h5>Submit Feedback</h5></center>
        </>
      )
    }
  }


  return (
    <Grid className="styling bg3">
      <Grid item xs={12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs={12} className={classes.grid} > 
        <Grid container alignItems="center" justifyContent="center" className={classes.heading} style={{backgroundColor:'#c7d6c2', height: "4rem" }}>
          <Grid item>
            <h3>Welcome, <strong>{getUserData}</strong></h3>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="center" className={classes.heading}>
          {feedbackNotif && 
            <Alert severity="warning" onClose={() => setFeedbackNotif(false)} dismissible style={{ width: "100%" }}>
              <Typography align="left" color="textSecondary" variant="button">
                There is new feedback! Click {<Link to="/view-feedback" style={{color: '#818e7d'}}>here</Link>} to view.
              </Typography>
            </Alert>}
        </Grid>
        <Grid container justifyContent="space-evenly" className={classes.buttonsgrid}> 
          <Grid item>
            <Buttons style={{backgroundColor: "secondary"}} tooltip="Mark Attendance" className={classes.icons} img={Attendance} link="/mark-attendance" />
            <center><h5>Mark Attendance</h5></center>
          </Grid>
          <Grid item>
            <Buttons tooltip="View Attendance Record" rel="stylesheet" href="./TutorManager.css" img={AttendanceRecord} link="/view-attendance"/>
            <center><h5>Attendance Records</h5></center>
          </Grid>
          <Grid item>
            <Buttons tooltip="Input Tutee Observation" img={Observation} link="/tutee-observation"/>  
            <center><h5>Tutee Observation</h5></center>
          </Grid>
          <Grid item>
            <Buttons tooltip="View Observation Record" img={ObservationRecord} link="/view-observation"/>  
            <center><h5>Observation Records</h5></center>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-evenly" className={isAdmin ? classes.buttonsgrid : classes.buttonsgrid2}>
          <Grid item>
            <Buttons tooltip="Lesson Schedule" img={Schedule} link="/view-upcoming-lesson" />
            <center><h5>Lesson Schedule</h5></center>
          </Grid>
          <Grid item>
            <FeedbackRouting/> 
          </Grid>
          <Grid item>
            <Buttons tooltip="Tutee Profiles" img={TuteeProfile} link="/tutee-profile"/>  
            <center><h5>Tutee Profiles</h5></center>
          </Grid>
          {isAdmin && 
            <Grid item>
              <Buttons tooltip="Tutor Profiles" img={TuteeProfile} link="/view-tutor-profile"/>
              <center><h5>Tutor Profiles</h5></center>
            </Grid>
          } 
        </Grid> 
      </Grid>
      <Footer credit={<>Icons made by <a href="https://www.freepik.com" title="Freepik" style={{color: '#818e7d'}}>Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon" style={{color: '#818e7d'}}>www.flaticon.com</a></>}/>
    </Grid>
  )
}
