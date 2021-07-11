import React, { useRef, useState, useEffect } from "react"
import { Card, Form, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { db } from "./../firebase"
import NavigationBar from "./NavigationBar"
import Footer from "./Footer/Footer"
import { useGetCurrUserName } from "./../hooks/useGetData"
import "./TutorManager.css"
import "./Feedback.css"
import {uuid} from 'uuidv4'

export default function Feedback() {
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  
  const currName = useGetCurrUserName()
  const dateRef = useRef()
  const feedbackRef = useRef()
  const [anonymous, setAnonymous] = useState(false)
  const randomKey = uuid()


  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    //save data to firestore 
    if (anonymous) {
      db.collection("Feedback")
      .doc(dateRef.current.value)
      .collection(dateRef.current.value)
      .doc(randomKey)
      .set({
          date: dateRef.current.value,
          tutor: "Anonymous",
          feedback: feedbackRef.current.value
      })
      .then(() => {
          setMessage("Successfully submitted your feedback.") 
      })
      .catch(() => setError("Failed to submit feedback."))
    }

    else {
      db.collection("Feedback")
      .doc(dateRef.current.value)
      .collection(dateRef.current.value)
      .doc(randomKey)
      .set({
          date: dateRef.current.value,
          tutor: currName,
          feedback: feedbackRef.current.value
      })
      .then(() => {
          setMessage("Successfully submitted your feedback.") 
        })
        .catch(() => setError("Failed to submit feedback."))  
    }
    setLoading(false)
  }

  return (
    <div className="styling">
      <NavigationBar />
      <Container fluid className="bg-observation" style={{paddingLeft: "0", paddingRight: "0"}}>
      <Container className="contents-observation">
        <Card className="card-feedback">
          <Card.Body>
            <center><h2 className="text-center mb-1 bottomBorder" style={{width: "30%"}}>Feedback</h2></center>
            <em><p className="text-center mb-4">Submit your feedback here.</p></em>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form action="email.php" method="post" enctype="multipart/form-data" onSubmit={handleSubmit}>
              <Row className="mb-4">
                <Col md={4}>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" ref={dateRef} required/>
                </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="feedback" className="mb-5">
                <Form.Label>Feedback</Form.Label>
                <Form.Control as="textarea" rows={3} ref={feedbackRef} placeholder="Input feedback here..." required />
              </Form.Group>

              <Button disabled={loading} variant="secondary" type="submit">Submit</Button>
              <br></br>
              <br></br>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check onChange={event => {
                  setAnonymous(event.target.checked)
                }} type="checkbox" name="anonymous" label="Tick this to stay anonymous"/>
              </Form.Group>
            </Form>
            <br/>
          </Card.Body>
        </Card>
      </Container> 
      <Footer /> 
    </Container>          
    </div>
  )
}