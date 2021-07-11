import React, { useRef, useState, useEffect } from "react"
import { Card, Form, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { db } from "./../firebase"
import NavigationBar from "./NavigationBar"
import Footer from "./Footer/Footer"
import "./TutorManager.css"
import "./Feedback.css"
import FeedbackRecord from "./FeedbackRecord"
import { useAuth } from "./../contexts/AuthContext"


export default function ViewFeedback() {
  const dateRef = useRef()

  const [ date, setDate ] = useState("")
  const [ name, setName ] = useState("")

  const { getEmail } = useAuth()

  const handleSubmit = () => {
    setDate(dateRef.current.value)
  }

  return (
    <div className="styling bg9">
      <NavigationBar />
      <Container fluid className="bg-observation" style={{paddingLeft: "0", paddingRight: "0"}}>
        {(getEmail() === "toinfinityandbeyond.orbital@gmail.com") && <Container className="contents-observation">
            <Card className="card-feedback">
            <Card.Body>
        
            <center><h2 className="text-center mb-4 bottomBorder" style={{width: "40%"}}>View Feedback Records</h2></center>
            <Form>
              <Row className="mb-4">
                <Form.Group as={Col} controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" defaultValue={date} ref={dateRef}/>
                </Form.Group>
              </Row>           
              <Button variant="secondary" type="button" onClick={handleSubmit}>Search</Button> 
            </Form>
            </Card.Body>
          </Card>
          {(date || name) && <FeedbackRecord date={date} tutor={name}/>}
        </Container>}
        {(getEmail() !== "toinfinityandbeyond.orbital@gmail.com") && <Card className="card-feedback">You are not authorised to view this page, please return to the dashboard.

        </Card>}
        <Footer />
      </Container>
    </div>
  ) 
} 