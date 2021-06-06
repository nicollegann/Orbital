import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import NavigationBar from "./NavigationBar"
import { db } from "../firebase"

export default function CreateAccount() {   
  const emailRef = useRef()
  const { createTuteeProfile, getEmail } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const nameRef = useRef()
  const contactRef = useRef()
  const emergencyRef = useRef()
  const dobRef = useRef()
  const schoolRef = useRef()

    
  async function handleSubmit(event) {
    event.preventDefault()

    const currentEmail = getEmail();
    if (currentEmail !== "toinfinityandbeyond.orbital@gmail.com") {
      return setError("You do not have admin permission.")
    }

    try {
        setError("");
        setLoading(true);
        await createTuteeProfile(emailRef.current.value);
        setMessage("Successfully created new tutee profile.")

            
        db.collection("TuteeProfile")
        .doc(emailRef.current.value)
        .set({
            Name: nameRef.current.value,
            Email: emailRef.current.value,
            Contact: contactRef.current.value,
            EmergencyContact: emergencyRef.current.value,
            DateOfBirth: dobRef.current.value,
            School: schoolRef.current.value,
        })
        .then(() => setMessage("Successfully updated profile."))
        .catch(() => setError("Failed to update account."))        

    } catch {
      setError("Failed to create a tutee profile.")
    }
    setLoading(false)
  }

    return (
      <>
        <NavigationBar />
          <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
            <Card.Body>
              <h2 className="text-center mb-4">Create New Tutee Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" ref={nameRef} required />
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
            <Link to="/profile">Back to Profile</Link>
          </div>
        </>
    );
}

