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


export default function Dashboard() {    
  const getUserData = useGetCurrUserName()  
  const { getEmail } = useAuth()
  const isAdmin = getEmail() === "toinfinityandbeyond.orbital@gmail.com"

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
        </> 
      )
    } else {
      return (
        <>
          <Buttons tooltip="Submit Feedback" img={Feedback} link="/feedback"/>
        </>
      )
    }
  }

  return (
    <>
      <NavigationBar />
      <Container fluid className="bg3" style={{paddingLeft: "0", paddingRight: "0", fontFamily: "Georgia" }}>
        <Container className="contents-dashboard">
          <Row className="mb-2">
            <Card className="mt-4 styling dashboardBorder" style={{}}>
              <h3>Welcome, <em>{getUserData}</em></h3>
            </Card>
          </Row>
          {feedbackNotif && <Alert variant="warning" onClose={() => setFeedbackNotif("")} dismissible>{feedbackNotif}</Alert>}
          <Row md={4} className="mt-5">
            <Col> 
              <Buttons tooltip="Mark Attendance" img={Attendance} link="/mark-attendance"/>
            </Col>
            <Col>
              <Buttons tooltip="View Attendance Record" rel="stylesheet" href="./TutorManager.css" img={AttendanceRecord} link="/view-attendance"/>
            </Col>
            <Col>
              <Buttons tooltip="Input Tutee Observation" img={Observation} link="/tutee-observation"/>  
            </Col>
            <Col>
              <Buttons tooltip="View Observation Record" img={ObservationRecord} link="/view-observation"/>  
            </Col>
          </Row>
          <Row md={4} className="mt-5">
            <Col>
              <Buttons tooltip="Lesson Schedule" img={Schedule} link="/view-upcoming-lesson" />
            </Col>
            <Col>
              <FeedbackRouting/> 
            </Col>
            <Col>
              <Buttons tooltip="Tutor Profiles" img={TuteeProfile} link="/tutor-profile"/>
            </Col>
            <Col>
              <Buttons tooltip="Tutee Profiles" img={TuteeProfile} link="/tutee-profile"/>  
            </Col>
          </Row>
        </Container>
        <Footer credit={<>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></>}/>
      </Container>
    </>
  )
}
