import React, { useRef, useState } from "react"
import { Card, Form, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { db } from "../../firebase"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import { useGetTutee, useGetCurrUserName } from "../../hooks/useGetData"
import { useHistory } from "react-router-dom"
import "./Observation.css"
import "../TutorManager.css"


export default function TuteeObservation() {
  const history = useHistory()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  
  let [tuteeNames] = useGetTutee()
  const currName = useGetCurrUserName()
  const nameRef = useRef()
  const dateRef = useRef()
  const commentRef = useRef()
  
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    //save data to firestore 
    db.collection("Observation")
    .doc(dateRef.current.value)
    .collection(dateRef.current.value)
    .doc(nameRef.current.value)
    .set({
        date: dateRef.current.value,
        name: nameRef.current.value,
        tutor: currName,
        comment: commentRef.current.value
    })
    .then(() => {
        setMessage("Successfully saved observation record for " + nameRef.current.value + ".") 
      })
      .catch(() => setError("Failed to save observation record."))  
    
    db.collection("TuteeProfile")
      .doc(nameRef.current.value)
      .collection("Observation")
      .doc(dateRef.current.value)
      .set({  
        date: dateRef.current.value,
        name: nameRef.current.value,
        tutor: currName,
        comment: commentRef.current.value
      })
      .then(() => {
        setMessage("Successfully saved observation record for " + nameRef.current.value + ".") 
      })
      .catch(() => setError("Failed to save observation record."))  
    setLoading(false)
  }

  return (
    <div className="styling">
      <NavigationBar />
      <Container fluid className="bg-observation" style={{paddingLeft: "0", paddingRight: "0"}}>
      <Container className="contents-observation">
        <Card className="card-observation">
          <Card.Body>
            <center><h2 className="text-center mb-1 bottomBorder" style={{width: "30%"}}>Tutee Observation</h2></center>
            <em><p className="text-center mb-4">Record tutees' progress after each lesson.</p></em>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Row className="mb-4">
                <Col md={4}>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" ref={dateRef} required/>
                </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="tuteeName">
                    <Form.Label>Tutee's Name</Form.Label>
                    <Form.Control as="select" ref={nameRef} required>
                      <option disabled={true}>Select...</option>
                      {(tuteeNames.slice(1)).map((n) => <option key={n.key} value={n.value}>{n.value}</option>)}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="comment" className="mb-5">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" rows={3} ref={commentRef} placeholder="Input observation here..." required />
              </Form.Group>

              <Button disabled={loading} variant="secondary" type="submit">Confirm</Button>
            </Form>
            <br/>
            <Button disabled={loading} variant="secondary" type="button" onClick={ () => history.push("/view-observation") }>View Observation Records</Button>
          </Card.Body>
        </Card>
      </Container> 
      <Footer /> 
    </Container>          
    </div>
  )
}
