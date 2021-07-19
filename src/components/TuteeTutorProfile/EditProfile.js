import React, { useState, useRef } from "react"
import { db } from "../../firebase"
import { useGetTutorProfile, useGetTuteeProfile, useGetTutee } from "../../hooks/useGetData"
import { Link } from "react-router-dom"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Button, Grid, TextField, Typography } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import "../TutorManager.css"


const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(18),
  },
  card: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "85%",
  },
  textfield: {
    marginBottom: theme.spacing(4),
    minWidth: 300,
  },
  alert: {
    marginBottom: theme.spacing(2)
  }
}))

const StyledLink = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.dark,
  },
}))(Typography)


export default function EditProfile() {
  const classes = useStyles()
    
  const profile = JSON.parse(window.localStorage.getItem("profile"))

  function TutorProfile() {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const tutorProfile = useGetTutorProfile(profile)
    const tuteeProfile = useGetTuteeProfile(profile)
    let details = tutorProfile || tuteeProfile
    const [tuteeNameList] = useGetTutee() 

    const nameRef = useRef()
    const emailRef = useRef()
    const contactRef = useRef()
    const emergencyRef = useRef()
    const dobRef = useRef()
    const schoolRef = useRef()

    // to save user data to firestore
    const saveData = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      if (details.role === "Tutor") {
        db.collection("TutorProfile")
          .doc(details.email)
          .set({
            name: nameRef.current.value,
            email: emailRef.current.value,
            contact: contactRef.current.value,
            emergencyContact: emergencyRef.current.value,
            dateOfBirth: dobRef.current.value,
            school: schoolRef.current.value,
            role: "Tutor"
          })
      }

      if (details.role === "Tutee") {
        db.collection("TuteeProfile")
          .doc(nameRef.current.value)
          .set({
            name: nameRef.current.value,
            email: emailRef.current.value,
            contact: contactRef.current.value,
            emergencyContact: emergencyRef.current.value,
            dateOfBirth: dobRef.current.value,
            school: schoolRef.current.value,
            role: "Tutee"
          })
        let newNameList = []
        tuteeNameList.map(tutee => (tutee.value === details.name) ? newNameList.push(nameRef.current.value) : newNameList.push(tutee.value))
        db.collection("TuteeProfile")
          .doc("NameList")
          .set({
            names: newNameList
          })
      }

      setMessage("Successfully updated profile.")
    } catch(e) {
      console.log(e.message)
      setError("Failed to update profile.")
    }
    setLoading(false)
    }

    return (
      <Grid className="styling bg6">
        <Grid item xs={12}>
          <NavigationBar />
        </Grid>
        <Grid item xs={12} className={classes.grid} >
          {details && <>
            <Card className={classes.card}>
              <CardContent>
                <center><h2 className="bottomBorder" style={{width: "30%"}}>Edit Profile</h2></center>
              </CardContent>
              <CardContent className={classes.cardcontent}>
                {error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}
                {message && <Alert severity="success" className={classes.alert} onClose={() => {setMessage("")}}>{message}</Alert>}
                <form onSubmit={saveData}>
                  <TextField 
                    className={classes.textfield}
                    label="Name" 
                    type="text" 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={details.name}
                    inputRef={nameRef}
                    fullWidth
                    required
                  />
                  <TextField 
                    className={classes.textfield}
                    label="Email" 
                    type="email" 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={details.email}
                    inputRef={emailRef}
                    fullWidth
                    disabled
                    required
                  />
                  <TextField 
                    className={classes.textfield}
                    label="Contact No." 
                    type="text" 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={details.contact}
                    inputRef={contactRef}
                    fullWidth
                    required
                  />
                  <TextField 
                    className={classes.textfield}
                    label="Emergency Contact No." 
                    type="text" 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={details.emergencyContact}
                    inputRef={emergencyRef}
                    fullWidth
                    required
                  />
                  <TextField 
                    className={classes.textfield}
                    label="Date of Birth" 
                    type="date" 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={details.dateOfBirth}
                    inputRef={dobRef}
                    fullWidth
                    required
                  />
                  <TextField 
                    className={classes.textfield}
                    label="School" 
                    type="text" 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={details.school}
                    inputRef={schoolRef}
                    fullWidth
                    required
                  />
                  <Button 
                    variant="contained" 
                    color="secondary"
                    size="medium" 
                    type="submit"  
                    disabled={loading}
                    className={classes.button}
                  >
                    Confirm
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Grid container justifyContent="center">
              {details.role === "Tutor"
              ? <Link to="/view-tutor-profile" style={{textDecoration: "none"}}>
                  <StyledLink variant="button" align="center" style={{textDecoration: "underline"}}>Back to View Tutor Profile</StyledLink>
                </Link>
              : <Link to="/tutee-profile" style={{textDecoration: "none"}}>
                  <StyledLink variant="button" align="center" style={{textDecoration: "underline"}}>Back to View Tutee Profile</StyledLink>
                </Link>}
            </Grid></>
            }
        </Grid>
        <Footer/>
      </Grid>
    )
  }

  return <TutorProfile />
}