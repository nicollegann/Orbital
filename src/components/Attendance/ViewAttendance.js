import React, { useState, useRef, useEffect } from "react"
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import AttendanceTable from "./AttendanceTable"
import { useGetTutee } from "../../hooks/useGetData"
import "./Attendance.css"

export default function ViewAttendance() {
  const dateRef = useRef()
  const nameRef = useRef()

  const [tuteeNames] = useGetTutee()

  const [ date, setDate ] = useState()
  const [ name, setName ] = useState()
  
  useEffect(() => {
    const selectedDate = window.localStorage.getItem("selectedDate")
    setDate(selectedDate)
    const selectedName = window.localStorage.getItem("selectedName")
    setName(selectedName ?? "")
  }, [])

  return (
    <>
      <NavigationBar />
      <Container fluid className="bg-attendance" style={{paddingLeft: "0", paddingRight: "0"}}>
        <Container md-3 className="contents-attendance">
          <Card className="card-view-attendance">
            <Card.Body>
            <h2 className="text-center mb-4">View Attendance Records</h2>
            <Form>
              <Row className="mb-4">
                <Form.Group as={Col} controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" defaultValue={date} ref={dateRef}/>
                </Form.Group>

                <Form.Group as={Col} controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control as="select" ref={nameRef}>
                    {tuteeNames.map((n) => <option key={n.value} value={n.name}>{n.name}</option>)}
                  </Form.Control>
                </Form.Group>
              </Row>
              <Button onClick={() => {
                        window.localStorage.setItem("selectedDate", dateRef.current.value)
                        window.localStorage.setItem("selectedName", nameRef.current.value)
                      }}
                      variant="secondary" 
                      type="submit"
              >
              Search
              </Button> 
            </Form>
            </Card.Body>
          </Card>
          {(date || name) && <AttendanceTable date={date} name={name}/>}
        </Container>
        <Footer />
      </Container>
    </>
  ) 
} 