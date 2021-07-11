import React, { useState, useRef } from 'react'
import NavigationBar from "../NavigationBar"
import { Form, Button, Card, Container } from "react-bootstrap"
import { useGetTutee } from "../../hooks/useGetData"
import { Link } from "react-router-dom"
import TutorSelectSlot from './TutorSelectSlot'
import { nextWeekDash } from "./Date"

export default function TutorSchedule() {
  const [loading, setLoading] = useState(false)
  
  const tuteeRef = useRef()
  const [tuteeNames] = useGetTutee()

  const [tutee, setTutee] = useState("")

  const handleSearch = (event) => {
    event.preventDefault()
    setLoading(true)
    
    if (tuteeRef.current.value !== "Select...") {
      setTutee(tuteeRef.current.value)
    } 
    
    setLoading(false)
  }

  return (
    <div className="bg5 styling">
      <NavigationBar />
      <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "0", paddingBottom: "30%"}}>
        <Card className="justify-content-md-center" style={{width: "50rem", margin: "5% auto 1%"}}>
          <Card.Body>
            <center><h2 className="text-center bottomBorder" style={{width: "75%", marginBottom: "5%"}}>Schedule Lesson</h2></center>
            <Form onSubmit={handleSearch}>
              <Form.Group id="tutee-name" className="mb-3">
                  <Form.Label><strong>Tutee's Name</strong></Form.Label>
                  <Form.Control as="select" defaultValue="Select..." ref={tuteeRef}>
                    <option disabled={true}>Select...</option>
                    {tuteeNames.slice(1).map((n) => <option key={n.key} value={n.value}>{n.value}</option>)}
                  </Form.Control>
              </Form.Group>
              <Button disabled={loading} type="submit">Search</Button>
            </Form>
          </Card.Body>
          <Card.Body>
          {tutee && <TutorSelectSlot tutee={tutee} dateRange={nextWeekDash}/>}
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/view-upcoming-lesson">Back to View Upcoming Lessons</Link>
        </div>
      </Container>
    </div>
  );
}