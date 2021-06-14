import React, { useState, useRef } from "react"
import { db } from "../firebase"
import { Card, Form, Button, Alert } from "react-bootstrap"
import NavigationBar from "./NavigationBar"
import { Link } from "react-router-dom"


export default function UpdateTuteeProfile() {
  const nameRef = useRef()
  const emailRef = useRef()
  const contactRef = useRef()
  const emergencyRef = useRef()
  const dobRef = useRef()
  const schoolRef = useRef()
  var tuteeRef;
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)


  // to save user data to firestore
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    db.collection("TuteeProfile")
      .doc(nameRef.current.value)
      .get()
      .then((doc) => {
        setMessage("Successfully retrieved tutee profile.");
        // tuteeRef = doc.data();
        console.log(doc.data().contact)
      })
      .catch(() => setError("No such tutee profile"))

    setLoading(false)
  }

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

    setLoading(false)
  }

  
  

  return (
    <>
      <NavigationBar />
      <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
        <Card.Body>
            <h2 className="text-center mb-4">Tutee's Name</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Search Tutee Profile</Button>
            </Form>
        </Card.Body>
      </Card>

      <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Update Tutee Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={saveData}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" defaultValue={tuteeRef && tuteeRef.name} disabled={true} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" defaultValue={tuteeRef && tuteeRef.email} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control ref={contactRef} type="tel" defaultValue={tuteeRef && tuteeRef.contact} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact No.</Form.Label>
              <Form.Control ref={emergencyRef} type="tel" defaultValue={tuteeRef && tuteeRef.emergencyContact}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control ref={dobRef} type="date" defaultValue={tuteeRef && tuteeRef.dateOfBirth}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>School</Form.Label>
              <Form.Control ref={schoolRef} type="text" defaultValue={tuteeRef && tuteeRef.school}/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/profile">Back to Profile</Link>
      </div>
      <br></br>
    </>
  );
};
