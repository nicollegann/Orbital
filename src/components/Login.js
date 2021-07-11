import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import "./TutorManager.css"
import { Link, useHistory } from "react-router-dom"

export default function Login() {   
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

    
  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setError("")
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/")
    } catch {
      setError("Failed to sign in.")
    }  
      setLoading(false)
    }

  return (
    <div className="styling bg7" style={{height: "100% !important"}}>
      <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "2%", paddingBottom: "30%"}}>
        <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 2%"}}>
          <Card.Body>
            <center><h2 className="text-center mb-4 bottomBorder">TutorManager</h2></center>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">Login</Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/create-account">Sign Up</Link>
        </div>
        <div className="w-100 text-center mt-2">
          Schedule your next lesson <Link to="/tutee-schedule-lesson">here</Link> (for tutees)
        </div>
      </Container>
    </div>
  );
}


