import React from "react"
import NavigationBar from "./NavigationBar"
import { Container, Image, Row, Col, Card } from "react-bootstrap"
import Attendance from "./images/attendance.png"
import Observation from "./images/observation.png"
import Schedule from "./images/schedule.png"
import Feedback from "./images/feedback.png"
import { useGetCurrUserName } from "../hooks/useGetData"
import { useHistory } from "react-router-dom"


export default function Dashboard() {    
  const getUserData = useGetCurrUserName()
  const history = useHistory()
  
  return (
    <>
      <NavigationBar />
      <Container fluid="md">
      <Row>
        <Card bg="light" border="light" className="mt-4">
          <Card.Title style={{ fontSize: "25px" }}>Welcome, {getUserData && getUserData.name} </Card.Title>
        </Card>
      </Row>
      <Row className="mt-5">
        <Col><Image src={Attendance} alt="Attendance-img" roundedCircle onClick={ () => history.push("/mark-attendance") } /></Col>
        <Col><Image src={Observation} alt="Observation-img" roundedCircle onClick={ () => history.push("/tutee-observation") }/></Col>
        <Col><Image src={Schedule} alt="Schedule-img" roundedCircle onClick={ () => history.push("/schedule") }/></Col>
        <Col><Image src={Feedback} alt="Feedback-img" roundedCircle onClick={ () => history.push("/feedback") }/></Col>
      </Row>
      </Container>
    </>
  )
}
