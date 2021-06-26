import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
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
import { useGetCurrUserName } from "../../hooks/useGetData"
import "./Dashboard.css"
import "../TutorManager.css"


export default function Dashboard() {    
  const getUserData = useGetCurrUserName()
  
  return (
    <>
      <NavigationBar />
      <Container fluid className="bg3" style={{paddingLeft: "0", paddingRight: "0", fontFamily: "Georgia" }}>
        <Container className="contents-dashboard">
          <Row>
            <Card className="mt-4 styling dashboardBorder" style={{}}>
              <h3>Welcome, <em>{getUserData}</em></h3>
            </Card>
          </Row>
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
              <Buttons tooltip="Lesson Schedule" img={Schedule} link="/schedule"/>
            </Col>
            <Col>
              <Buttons tooltip="Feedback" img={Feedback} link="/feedback"/>  
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
