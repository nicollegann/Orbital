import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import Buttons from "./Buttons"
import Attendance from "../images/markAttendance.png"
import AttendanceRecord from "../images/attendanceRecord.png"
import Observation from "../images/tuteeObservation.png"
import Schedule from "../images/lessonSchedule.png"
import Feedback from "../images/giveFeedback.png"
import { useGetCurrUserName } from "../../hooks/useGetData"
import "./Dashboard.css"


export default function Dashboard() {    
  const getUserData = useGetCurrUserName()
  
  return (
    <>
      <NavigationBar />
      <Container fluid className="bg3" style={{paddingLeft: "0", paddingRight: "0"}}>
        <Container className="contents-dashboard">
          <Row>
            <Card bg="light" border="light" className="mt-4">
              <h3>Welcome, {getUserData}</h3>
            </Card>
          </Row>
          <Row className="mt-5">
            <Col> 
              <Buttons tooltip="Mark Attendance" img={Attendance} link="/mark-attendance"/>
            </Col>
            <Col>
              <Buttons tooltip="View Attendance Record" img={AttendanceRecord} link="/view-attendance"/>
            </Col>
            <Col>
              <Buttons tooltip="Input Tutee Observation" img={Observation} link="/tutee-observation"/>  
            </Col>
            <Col>
              <Buttons tooltip="Feedback" img={Feedback} link="/feedback"/>  
            </Col>
          </Row>
          <Row className="mt-5">
            <Col> 
              <Buttons tooltip="Lesson Schedule" img={Schedule} link="/schedule"/>
            </Col>
          </Row>
        </Container>
        <Footer credit={<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>}/>
      </Container>
    </>
  )
}
