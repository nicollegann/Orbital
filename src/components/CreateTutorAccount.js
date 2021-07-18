import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import "./TutorManager.css"
import { useGetTutorCode } from "../hooks/useGetData"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'



const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",
    top: "12px",
  },
  card: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(8),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    
  },
}))

export default function CreateTutorAccount() {   
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const codeRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const correctCode = useGetTutorCode()
  const classes = useStyles()

    
  async function handleSubmit(event) {
    event.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.")
    }

    //Check if verification code is correct
    // console.log(correctCode)
    if (codeRef.current.value !== correctCode) {
      setMessage("")
      return setError("Invalid verification code. Please contact admin for assistance.")
    }

    try {
      setError("")
      setMessage("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      setMessage("Successfully created new account.")
    } catch (e) {
      setError(e.message || "Failed to create an account.")
    }
    setLoading(false)
  }

    return (
      <div className="bg5 styling">
      <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "2%", paddingBottom: "30%"}}>
          <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
            <Card.Body className={classes.cardcontent}>
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
                <Form.Group id="verification-code" className="mb-3">
                  <Form.Label><strong>Verification Code</strong></Form.Label>
                  <Form.Control type="text" ref={codeRef} required />
                </Form.Group>
                <Button 
                disabled={loading}
                  variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="submit"  
                  className={classes.button, "w-100"}
                >Confirm</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button href="#login">Back to Login</Button>
          </div>
          </Container>
        </div>
    );
}
