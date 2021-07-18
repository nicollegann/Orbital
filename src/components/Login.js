import React, { useRef, useState } from 'react'
import { Form, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import "./TutorManager.css"
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'



const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",
    top: "12px",
  }
}))

export default function Login() {   
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const classes = useStyles()

    
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
              <Button variant="contained" 
                color="secondary"
                size="medium" 
                type="submit" 
                className={classes.button, "w-100"}
              >Login</Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Button href="#forgot-password" color="darkgreen">Forgot Password?</Button>
            </div>
            <div className="w-100 text-center mt-2">
              Need an account? <Button color="darkgreen" href="#create-account">Sign Up</Button>
            </div>
            <div className="w-100 text-center mt-2">
              Schedule your next lesson <Button color="darkgreen" href="#tutee-schedule-lesson">here</Button> (for tutees)
            </div>
          </Card.Body>
        </Card>
        
      </Container>
    </div>
  );
}


