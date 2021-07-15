import React, { useState, useRef } from "react"
import { db } from "./../firebase"
import { Card, Button, Form, Alert, Row, Col } from "react-bootstrap"
import { useGetTutorProfile } from "./../hooks/useGetData"
import "./TutorManager.css"

export default function TutorProfileRecord(props) {
  const { tutor } = props

  

  function TutorProfile() {
    const email = tutor    
    const details = useGetTutorProfile(email)


    const nameRef = useRef()
    const emailRef = useRef()
    const contactRef = useRef()
    const emergencyRef = useRef()
    const dobRef = useRef()
    const schoolRef = useRef()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(true)
    // const tutorNames = useGetTutor()

    
    // to save user data to firestore
    const saveData = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    console.log(email)
    
    db.collection("TutorProfile")
      .doc(email)
      .set({
        name: nameRef.current.value,
        email: emailRef.current.value,
        contact: contactRef.current.value,
        emergencyContact: emergencyRef.current.value,
        dateOfBirth: dobRef.current.value,
        school: schoolRef.current.value,
      })
      .then(() => setMessage("Successfully updated profile."))
      .catch(() => setError("Failed to update account."))
    

    setUpdate(true)  
    setLoading(false)
    }


    return (
      <div className="styling">
        <Card>
          <Card.Body>
            <Row style={{marginBottom:"1em"}}>
              <Col md={{span: 4, offset:4}}><h3 className="text-center mb-1 bottomBorder" style={{width: "90%"}}>Tutor Profile</h3></Col>
              <Col style={{paddingRight:"0", paddingLeft:"15%"}}>
                <Button variant="secondary" disabled={loading} type="button" onClick={() => setUpdate((false))}>Edit Details</Button>
              </Col>
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={saveData}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameRef} type="text" defaultValue={details && details.name} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control ref={emailRef} type="email" defaultValue={details && details.email} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact No.</Form.Label>
                <Form.Control ref={contactRef} type="tel" defaultValue={details && details.contact} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Emergency Contact No.</Form.Label>
                <Form.Control ref={emergencyRef} type="tel" defaultValue={details && details.emergencyContact} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control ref={dobRef} type="date" defaultValue={details && details.dateOfBirth} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>School</Form.Label>
                <Form.Control ref={schoolRef} type="text" defaultValue={details && details.school} readOnly={update} required/>
              </Form.Group>
              <Button variant="secondary" disabled={update} type="submit">Confirm</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }

  return <TutorProfile />
}