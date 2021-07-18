import React, { useState, useRef } from "react"
import { db } from "../../firebase"
import { Card, Form, Alert, Row, Col } from "react-bootstrap"
import { useGetTuteeProfile } from "../../hooks/useGetData"
import "../TutorManager.css"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(14),
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
  textfield: {
    marginBottom: theme.spacing(3),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    position: "relative",
    top: "12px",
  }
}))

export default function TuteeProfileRecord(props) {
  const { tutee } = props

  function TuteeProfile() {
    const details = useGetTuteeProfile(tutee)
    const classes = useStyles()

    const nameRef = useRef()
    const emailRef = useRef()
    const contactRef = useRef()
    const emergencyRef = useRef()
    const dobRef = useRef()
    const schoolRef = useRef()
    const tutorRef = useRef()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(true)
    
    
    // to save user data to firestore
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
        assignedTutor: tutorRef.current.value,
      })
      .then(() => setMessage("Successfully updated profile."))
      .catch(() => setError("Failed to update account."))

    setUpdate(true)  
    setLoading(false)
    }

    return (
      <div className="styling">
        <Card className={classes.card} >
          <Card.Body className={classes.cardcontent}>
            <Row style={{width: "100%", marginRight: "auto", marginLeft: "auto"}}>
              <Col md={{span: 4, offset:4}}><h3 className="text-center mb-1 bottomBorder" style={{width: "100%"}}>Tutee Profile</h3></Col>
              <Col style={{paddingRight:"0", paddingLeft:"15%"}}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="button"  
                  className={classes.button}
                  disabled={loading} 
                  onClick={() => setUpdate((false))}
                >Edit Details</Button>
              </Col>
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={saveData}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameRef} type="text" defaultValue={details && details.name} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control ref={emailRef} type="email" defaultValue={details && details.email} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact No.</Form.Label>
                <Form.Control ref={contactRef} type="tel" defaultValue={details && details.contact} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Emergency Contact No.</Form.Label>
                <Form.Control ref={emergencyRef} type="tel" defaultValue={details && details.emergencyContact} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control ref={dobRef} type="date" defaultValue={details && details.dateOfBirth} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>School</Form.Label>
                <Form.Control ref={schoolRef} type="text" defaultValue={details && details.school} readOnly={update} required/>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Assigned Tutor</Form.Label>
                <Form.Control ref={tutorRef} type="text" defaultValue={details && details.assignedTutor} readOnly={update} required/>
              </Form.Group>
              <Button 
                variant="contained" 
                color="secondary"
                size="medium" 
                type="submit"  
                className={classes.button} disabled={update}
                >Confirm</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }

  return <TuteeProfile />
}