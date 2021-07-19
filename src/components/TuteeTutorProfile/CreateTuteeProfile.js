import React, { useState, useRef } from "react"
import { db } from "../../firebase"
import firebase from "firebase/app"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Button, Grid, TextField } from "@material-ui/core"
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
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "80%",
    marginBottom: theme.spacing(4),
  },
  textfield: {
    marginBottom: theme.spacing(4),
    minWidth: 300,
  },
  alert: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2),
    width: "100%"
  }
}))

const StyledButton = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.secondary.dark,
   },
  },
}))(Button);


export default function CreateTuteeProfile() {   
  const classes = useStyles()
  
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  
  const nameRef = useRef()
  const emailRef = useRef()
  const contactRef = useRef()
  const emergencyRef = useRef()
  const dobRef = useRef()
  const schoolRef = useRef()


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
        role: "Tutee"
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
      <Grid className="styling bg6">
        <Grid item xs={12}>
          <NavigationBar />
        </Grid>
        <Grid item xs={12} className={classes.grid} >
          <Card className={classes.card}>
            <CardContent>
              <center><h2 className="bottomBorder" style={{width: "50%"}}>Create Tutee Profile</h2></center>
            </CardContent>
            <CardContent className={classes.cardcontent}>
              {error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}
              {message && <Alert severity="success" className={classes.alert} onClose={() => {setMessage("")}}>{message}</Alert>}
              <form onSubmit={handleSubmit}>
                <TextField 
                  className={classes.textfield}
                  label="Name" 
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  inputRef={emailRef}
                  fullWidth
                  required
                />
                <TextField 
                  className={classes.textfield}
                  label="Contact No." 
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
            <Grid container justifyContent="center" alignItems="center">
              <StyledButton href="#tutee-profile">Back to View Tutee Profile</StyledButton>
            </Grid>
          </Card>
        </Grid>
        <Footer/>
      </Grid>
    )
}