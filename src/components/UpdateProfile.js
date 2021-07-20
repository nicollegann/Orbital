import React, { useState, useRef } from "react"
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import { useGetProfile } from "../hooks/useGetData"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Button, Grid, Card, CardContent, TextField } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert'
import NavigationBar from "./NavigationBar"
import Footer from "./Footer/Footer"
import "./TutorManager.css"


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
    width: "85%",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: theme.spacing(4),
  },
  typography: {
    marginBottom: theme.spacing(4),
    textAlign: "left",
    fontSize: 15
  },
  textfield: {
    marginBottom: theme.spacing(3),
    minWidth: 300
  },
  button: {
    marginTop: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(2)
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

export default function UpdateTutorProfile() {
  const classes = useStyles()
  
  const { currentUser } = useAuth()
  const getUserData = useGetProfile()

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

  return (
    <Grid className="styling bg10">
      <Grid item xs={12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <CardContent>
            <center><h2 className="bottomBorder" style={{width: "35%"}}>Update Profile</h2></center>
          </CardContent>
          <CardContent className={classes.cardcontent}>
          {error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}
          {message && <Alert severity="success" className={classes.alert} onClose={() => {setMessage("")}}>{message}</Alert>}
          {getUserData && <form onSubmit={saveData}>
            <TextField 
              className={classes.textfield}
              label="Name" 
              type="text" 
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={getUserData.name}
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
              defaultValue={getUserData.email}
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
              defaultValue={getUserData.contact}
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
              defaultValue={getUserData.emergencyContact}
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
              defaultValue={getUserData.dateOfBirth}
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
              defaultValue={getUserData.school}
              inputRef={schoolRef}
              fullWidth
              required
            />
            <Button 
              variant="contained" 
              color="secondary"
              size="medium" 
              type="submit"  
              className={classes.button}
              disabled={loading}
            >
              Update
            </Button>
          </form>}
          </CardContent>
          <Grid container justifyContent="center" alignItems="center">
            <StyledButton href="#profile">Back to Profile</StyledButton>
          </Grid>
        </Card>  
      </Grid>
      <Footer/>
    </Grid>
  )
}

