import React, { useState, useRef } from "react"
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import { Card, Form, Button, Alert } from "react-bootstrap"
import NavigationBar from "./NavigationBar"
import GetData from "./GetUserData"
import { Link } from "react-router-dom"


function UpdateProfile() {
  const { currentUser } = useAuth()
  const nameRef = useRef()
  const emailRef = useRef()
  const contactRef = useRef()
  const emergencyRef = useRef()
  const dobRef = useRef()
  const schoolRef = useRef()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // to save user data to firestore
  const saveData = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    db.collection("UserProfile")
      .doc(currentUser.email)
      .set({
        Name: nameRef.current.value,
        Email: currentUser.email,
        Contact: contactRef.current.value,
        EmergencyContact: emergencyRef.current.value,
        DateOfBirth: dobRef.current.value,
        School: schoolRef.current.value,
      })
      .then(() => setMessage("Successfully updated profile."))
      .catch(() => setError("Failed to update account."))

    setLoading(false)
  }

  const getData = GetData()
  

  return (
    <>
      <NavigationBar />
      <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={saveData}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control ref={nameRef} type="text" defaultValue={getData[0] && getData[0].Name} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" defaultValue={currentUser.email} disabled={true}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control ref={contactRef} type="tel" defaultValue={getData[0] && getData[0].Contact} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact No.</Form.Label>
              <Form.Control ref={emergencyRef} type="tel" defaultValue={getData[0] && getData[0].EmergencyContact}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control ref={dobRef} type="date" defaultValue={getData[0] && getData[0].DateOfBirth}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>School</Form.Label>
              <Form.Control ref={schoolRef} type="text" defaultValue={getData[0] && getData[0].School}/>
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

export default UpdateProfile

