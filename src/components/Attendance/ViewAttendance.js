import React, { useState, useRef } from "react"
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import AttendanceRecord from "./AttendanceRecord"
import { useGetTutee, useGetCurrUserName } from "../../hooks/useGetData"
import "./Attendance.css"
import "../TutorManager.css"


export default function ViewAttendance() {
  const dateRef = useRef()
  const nameRef = useRef()

  const [tuteeNames] = useGetTutee()
  const currName = useGetCurrUserName()

  const [ date, setDate ] = useState("")
  const [ name, setName ] = useState("")

  const handleSubmit = () => {
    setDate(dateRef.current.value)
    setName(nameRef.current.value)
  }

  return (
    <div className="styling bg9">
      <NavigationBar />
      <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
        <Container className="contents-attendance">
          <Card className="card-view-attendance">
            <Card.Body>
            <center><h2 className="text-center mb-4 bottomBorder" style={{width: "55%"}}>View Attendance Records</h2></center>
            <Form>
              <Row className="mb-4">
                <Form.Group as={Col} controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" defaultValue={date} ref={dateRef}/>
                </Form.Group>

                <Form.Group as={Col} controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control as="select" ref={nameRef}>
                    <option disabled={true}>Select...</option>
                    {tuteeNames.map((n) => <option key={n.key} value={n.value}>{n.value}</option>)}
                  </Form.Control>
                </Form.Group>
              </Row>
              <Button variant="secondary" type="button" onClick={handleSubmit}>Search</Button> 
            </Form>
            </Card.Body>
          </Card>
          {(date || name) && <AttendanceRecord date={date} tutee={name} tutor={currName}/>}
        </Container>
        <Footer />
      </Container>
    </div>
  ) 
} 