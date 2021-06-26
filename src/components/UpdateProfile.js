import React, { useState, useRef } from "react"
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import { Card, Form, Button, Alert } from "react-bootstrap"
import NavigationBar from "./NavigationBar"
import { useGetProfile } from "../hooks/useGetData"
import { Link } from "react-router-dom"
import "./TutorManager.css"


export default function UpdateTutorProfile() {
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
    
    const collectionName = (currentUser.email !== "toinfinityandbeyond.orbital@gmail.com") ? "TutorProfile" : "AdminProfile"
    const role = (currentUser.email !== "toinfinityandbeyond.orbital@gmail.com") ? "Tutor" : "Admin"

    db.collection(collectionName)
      .doc(currentUser.email)
      .set({
        name: nameRef.current.value,
        email: currentUser.email,
        contact: contactRef.current.value,
        emergencyContact: emergencyRef.current.value,
        dateOfBirth: dobRef.current.value,
        school: schoolRef.current.value,
        role: role
      })
      .then(() => setMessage("Successfully updated profile."))
      .catch(() => setError("Failed to update account."))

    setLoading(false)
  }

  const getUserData = useGetProfile()
  

  return (
    <div className="bg5">
      <NavigationBar />
      <Card className="justify-content-md-center styling" style={{width: "35rem", margin: "10% auto 1%", borderStyle: "solid !important"}}>
        <Card.Body>
          <center><h2 className="text-center mb-4 bottomBorder" style={{width: "60%"}}>Update Tutor Profile</h2></center>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={saveData}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control ref={nameRef} type="text" defaultValue={getUserData && getUserData.name} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" defaultValue={currentUser.email} disabled={true}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control ref={contactRef} type="tel" defaultValue={getUserData && getUserData.contact} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact No.</Form.Label>
              <Form.Control ref={emergencyRef} type="tel" defaultValue={getUserData && getUserData.emergencyContact} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control ref={dobRef} type="date" defaultValue={getUserData && getUserData.dateOfBirth} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>School</Form.Label>
              <Form.Control ref={schoolRef} type="text" defaultValue={getUserData && getUserData.school} required/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/profile">Back to Profile</Link>
      </div>
      <br></br>
    </div>
  );
};

