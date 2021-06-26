import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import "./TutorManager.css"
import { Link } from "react-router-dom"


export default function CreateTutorAccount() {   
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { createAccount } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

    
  async function handleSubmit(event) {
    event.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.")
    }

    try {
      setError("");
      setLoading(true);
      await createAccount(emailRef.current.value, passwordRef.current.value);
      setMessage("Successfully created new account.")
    } catch {
      setError("Failed to create an account.")
    }
    setLoading(false)
  }

    return (
      <div className="bg5 styling">
      <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "2%", paddingBottom: "30%"}}>
          <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
            <Card.Body>
              <center><h2 className="text-center mb-4 bottomBorder" style={{width: "75%"}}>Create New Tutor Account</h2></center>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm" className="mb-4">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Confirm</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Back to Login</Link>
          </div>
          </Container>
        </div>
    );
}
