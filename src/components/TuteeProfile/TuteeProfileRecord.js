import React, { useState, useRef } from "react"
import { db } from "../../firebase"
import { Card, Button, Form, Alert, Row, Col } from "react-bootstrap"
import { useGetTuteeProfile } from "../../hooks/useGetData"

export default function TuteeProfileRecord(props) {
  const { tutee } = props

  function TuteeProfile() {
    const details = useGetTuteeProfile(tutee)

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
    
    // to save user data to firestore
    const saveData = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    db.collection("TuteeProfile")
      .doc(nameRef.current.value)
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
      <>
        <Card className="card-view-tutee-profile">
          <Card.Body>
            <Row style={{marginBottom:"1em"}}>
              <Col md={{span: 4, offset:4}}><h3 className="text-center mb-1">Tutee Profile</h3></Col>
              <Col style={{paddingRight:"0", paddingLeft:"15%"}}>
                <Button variant="secondary" disabled={loading} type="button" onClick={() => setUpdate((false))}>Edit Details</Button>
              </Col>
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={saveData}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameRef} type="text" defaultValue={details && details.name} readOnly={true} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control ref={emailRef} type="email" defaultValue={details && details.email} readOnly={update}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact No.</Form.Label>
                <Form.Control ref={contactRef} type="tel" defaultValue={details && details.contact} readOnly={update}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Emergency Contact No.</Form.Label>
                <Form.Control ref={emergencyRef} type="tel" defaultValue={details && details.emergencyContact} readOnly={update}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control ref={dobRef} type="date" defaultValue={details && details.dateOfBirth} readOnly={update}/>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>School</Form.Label>
                <Form.Control ref={schoolRef} type="text" defaultValue={details && details.school} readOnly={update}/>
              </Form.Group>
              <Button variant="secondary" disabled={update} type="submit">Confirm</Button>
            </Form>
          </Card.Body>
        </Card>
      </>
    )
  }

  return <TuteeProfile />
}

    
