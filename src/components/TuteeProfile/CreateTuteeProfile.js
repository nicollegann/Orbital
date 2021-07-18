import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import "../TutorManager.css"
import { Link } from "react-router-dom"
import { db } from "../../firebase"
import firebase from "firebase/app"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(14),
  },
  card: {
    width: "55%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(8),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "85%",
    
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

export default function CreateTuteeProfile() {   
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const contactRef = useRef()
  const emergencyRef = useRef()
  const dobRef = useRef()
  const schoolRef = useRef()
  const tutorRef = useRef()

  const classes = useStyles()

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    // save tutee details to firestore
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
      .then(() => setMessage(`Successfully created new profile for ${nameRef.current.value}.`))
      .catch(() => setError("Failed to create tutee profile."))

    // update name list with new tutee's name  
    db.collection("TuteeProfile")
      .doc("NameList")
      .update({
        names: firebase.firestore.FieldValue.arrayUnion(nameRef.current.value)
      })  

    setLoading(false)
  }

    return (
      <div className="styling bg5">
        <Grid item xs={12}>
          <NavigationBar/>
        </Grid>  
        <Grid className={classes.grid}>
          <Card className={classes.card}>
            <Card.Body className={classes.cardcontent}>
              <center><h2 className="text-center mb-4 bottomBorder" style={{width: "60%"}}>Create New Tutee Profile</h2></center>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" ref={nameRef} required />
                </Form.Group>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
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
                <Form.Group id="tutor" className="mb-3">
                  <Form.Label>Assigned Tutor</Form.Label>
                  <Form.Control type="text" ref={tutorRef} />
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
            <div className="w-100 text-center mt-1">
              <Button color="link" href="#tutee-profile">Back to Tutee Profiles</Button>
            </div>
          <Footer />
        </Grid>
      </div>
    )
}