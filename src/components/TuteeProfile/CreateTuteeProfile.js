import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import "../TutorManager.css"
import { Link } from "react-router-dom"
import { db } from "../../firebase"

export default function CreateTuteeProfile() {   
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const contactRef = useRef()
  const emergencyRef = useRef()
  const dobRef = useRef()
  const schoolRef = useRef()

  // to save user data to firestore
  const handleSubmit = (event) => {
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
      .then(() => setMessage("Successfully created new tutee profile."))
      .catch(() => setError("Failed to create tutee profile."))

    setLoading(false)
  }

    return (
      <div className="styling bg5">
        <NavigationBar />
        <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
          <Container className="contents-tutee-profile">
            <Card className="card-create-tutee-profile">
              <Card.Body>
                <center><h2 className="text-center mb-4 bottomBorder" style={{width: "60%"}}>Create New Tutee Profile</h2></center>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="name" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required />
                  </Form.Group>
                  <Form.Group id="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="contact" className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="tel" ref={contactRef} required />
                  </Form.Group>
                  <Form.Group id="emergency" className="mb-3">
                    <Form.Label>Emergency Contact Number</Form.Label>
                    <Form.Control type="tel" ref={emergencyRef} required />
                  </Form.Group>
                  <Form.Group id="dob" className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" ref={dobRef} required />
                  </Form.Group>
                  <Form.Group id="school" className="mb-3">
                    <Form.Label>School</Form.Label>
                    <Form.Control type="text" ref={schoolRef} required />
                  </Form.Group>
                  <Button disabled={loading} className="w-100" type="submit">Confirm</Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              <Link to="/tutee-profile">Back to Tutee Profiles</Link>
            </div>
          </Container>
          <Footer />
        </Container>
      </div>
    )
}