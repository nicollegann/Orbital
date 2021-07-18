import React, { useRef, useState } from 'react'
import { Form, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import "./TutorManager.css"
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
    width: "80%",
    
  },
}))

export default function ForgotPassword() {   
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles()

    
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setMessage("")
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions.") 
    } catch {
      setError("Failed to reset password.");
    }    
    setLoading(false)
  }

  return (
    <div className="bg9">
    <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "2%", paddingBottom: "30%"}}>
      <Card className={classes.card, "justify-content-md-center styling"} >
        <Card.Body className={classes.cardcontent}>
          <center><h2 className="bottomBorder text-center mb-4" style={{width: "48%"}}>Reset Password</h2></center>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button 
              disabled={loading} 
              variant="contained" 
              color="secondary"
              size="medium" 
              type="submit" 
              className={classes.button, "w-100"}
            >Reset Password</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Button href="#login" color="darkgreen">Back to Login</Button>
          </div>
        </Card.Body>
      </Card>
      </Container>
    </div>
  );
}
