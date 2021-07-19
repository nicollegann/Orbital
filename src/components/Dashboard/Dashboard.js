import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Alert } from "react-bootstrap"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import Buttons from "./Buttons"
import Attendance from "../images/markAttendance.png"
import AttendanceRecord from "../images/attendanceRecord.png"
import Observation from "../images/tuteeObservation.png"
import ObservationRecord from "../images/observationRecord.png"
import Schedule from "../images/lessonSchedule.png"
import Feedback from "../images/giveFeedback.png"
import TuteeProfile from "../images/tuteeProfile.png"
import { useGetCurrUserName, useGetCounter } from "../../hooks/useGetData"
import "./Dashboard.css"
import "../TutorManager.css"
import { useAuth } from "../../contexts/AuthContext"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  icons: {
    backgroundColor: "#818e7d !important"
  }
}))

export default function Dashboard() {    
  const getUserData = useGetCurrUserName()  
  const { getEmail } = useAuth()
  const isAdmin = getEmail() === "toinfinityandbeyond.orbital@gmail.com"
  const classes = useStyles()

  const count = useGetCounter()
  const [feedbackNotif, setFeedbackNotif] = useState("")
  
  useEffect(() => {
    if (isAdmin && count && count !== 0) {
      setFeedbackNotif("There is new feedback!")
    }
  }, [count, isAdmin])

  function FeedbackRouting() {
    if (isAdmin) {
      return (
        <>
          <Buttons tooltip="View Feedback" img={Feedback} link="/view-feedback"/>
          <div><h5>View Feedback</h5></div>
        </> 
      )
    } else {
      return (
        <>
          <Buttons tooltip="Submit Feedback" img={Feedback} link="/feedback"/>
          <div><h5>Submit Feedback</h5></div>
        </>
      )
    }
  }


  return (
    <>
      <NavigationBar />
      <Container fluid className="bg3" style={{paddingLeft: "0", paddingRight: "0", fontFamily: "Georgia" }}>
        <Container className="contents-dashboard">
          <Row className="mb-2" style={{paddingTop: "2%"}}>
            <center><Card className="mt-4 styling card-color" style={{width: "70%", backgroundColor:"secondary", border: "none"}}>
            <Card.Body>
              <h3>Welcome, <strong>{getUserData}</strong></h3>
            </Card.Body>
            </Card>
            </center>
          </Row>
          {feedbackNotif && <Alert variant="warning" onClose={() => setFeedbackNotif("")} dismissible>{feedbackNotif}</Alert>}
          <Row md={4} className="mt-5 icons">
            <Col style={{backgroundColor: "secondary"}}>
              <Buttons style={{backgroundColor: "secondary"}} tooltip="Mark Attendance" className={classes.icons} img={Attendance} link="/mark-attendance" />
              <div><h5>Mark Attendance</h5></div>
            </Col>
            <Col>
              <Buttons tooltip="View Attendance Record" rel="stylesheet" href="./TutorManager.css" img={AttendanceRecord} link="/view-attendance"/>
              <div><h5>Attendance Records</h5></div>
            </Col>
            <Col>
              <Buttons tooltip="Input Tutee Observation" img={Observation} link="/tutee-observation"/>  
              <div><h5>Tutee Observation</h5></div>
            </Col>
            <Col>
              <Buttons tooltip="View Observation Record" img={ObservationRecord} link="/view-observation"/>  
              <div><h5>Observation Records</h5></div>
            </Col>
          </Row>
          <Row md={4} className="mt-5 icons">
            <Col>
              <Buttons tooltip="Lesson Schedule" img={Schedule} link="/view-upcoming-lesson" />
              <div><h5>Lesson Schedule</h5></div>
            </Col>
            <Col>
              <FeedbackRouting/> 
            </Col>
            <Col>
              <Buttons tooltip="Tutee Profiles" img={TuteeProfile} link="/tutee-profile"/>  
              <div><h5>Tutee Profiles</h5></div>
            </Col>
            <Col>
              {isAdmin && 
              <div>
                <Buttons tooltip="Tutor Profiles" img={TuteeProfile} link="/view-tutor-profile"/>
                <h5>Tutor Profiles</h5>
              </div>
              }
            </Col>
            {/* <Row>
              <Profiles></Profiles>
            </Row> */}
          </Row>
        </Container>
        <Footer credit={<>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></>}/>
      </Container>
    </>
  )
}
