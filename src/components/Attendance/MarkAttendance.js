import React, { useRef, useState } from "react"
import { Card, Form, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { db } from "../../firebase"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import { useGetTutee, useGetCurrUserName } from "../../hooks/useGetData"
import { useHistory } from "react-router-dom"
import "./Attendance.css"


export default function MarkAttendance() {
  const history = useHistory()
  let [tuteeNames] = useGetTutee()
  const currName = useGetCurrUserName()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const nameRef = useRef()
  const dateRef = useRef()
  const timeRef = useRef()
  const attendanceRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    //save data to firestore (to 2 different collections)
    db.collection("Attendance")
      .doc(dateRef.current.value)
      .collection(dateRef.current.value)
      .doc(nameRef.current.value)
      .set({
        date: dateRef.current.value,
        time: timeRef.current.value,
        name: nameRef.current.value,
        attendance: attendanceRef.current.value,
        tutor: currName
      })
      .then(() => {
        setMessage("Successfully marked attendance for " + nameRef.current.value + ".")
      })
      .catch(() => setError("Failed to mark attendance for " + nameRef.current.value + "."))

    db.collection("TuteeProfile")
      .doc(nameRef.current.value)
      .collection("Attendance")
      .doc(dateRef.current.value)
      .set({
        date: dateRef.current.value,
        time: timeRef.current.value,
        name: nameRef.current.value,
        attendance: attendanceRef.current.value,
        tutor: currName
      })
      .then(() => {
        setMessage("Successfully marked attendance for " + nameRef.current.value + ".")
      })
      .catch(() => setError("Failed to mark attendance for " + nameRef.current.value + "."))  
    setLoading(false)
  }

  return (
    <>
    <NavigationBar />
    <Container fluid className="bg-attendance" style={{paddingLeft: "0", paddingRight: "0"}}>
      <Container className="contents-attendance">
        <Card className="card-attendance">
          <Card.Body>
            <h2 className="text-center mb-4">Mark Attendance</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Row className="mb-4">
              <Form.Group as={Col} controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" ref={dateRef} required/>
              </Form.Group>

              <Form.Group as={Col} controlId="time">
                <Form.Label>Lesson Time</Form.Label>
                <Form.Control type="time" ref={timeRef} required />
              </Form.Group>
              </Row>

              <Form.Group controlId="tuteeName" className="mb-4">
                <Form.Label>Tutee's Name</Form.Label>
                <Form.Control as="select" ref={nameRef} required>
                  <option disabled={true}>Select...</option>
                  {(tuteeNames.slice(1)).map((n) => <option key={n.value} value={n.name}>{n.name}</option>)}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="attendance" className="mb-5">
                <Form.Label>Present/Absent</Form.Label>
                <Form.Control as="select" ref={attendanceRef} defaultValue="Select..." required>
                  <option disabled={true}>Select...</option>
                  <option>Present</option>
                  <option>Absent</option>
                </Form.Control>
              </Form.Group>

              <Button disabled={loading} variant="secondary" type="submit">Confirm</Button>
            </Form>
            <br/>
            <Button disabled={loading} variant="secondary" type="button" onClick={ () => history.push("/view-attendance") }>View Attendance Records</Button>
          </Card.Body>
        </Card>
      </Container> 
      <Footer /> 
    </Container>
    </>
  )
}
