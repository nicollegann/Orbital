import React, { useState, useRef } from "react"
import { db } from "../../firebase"
import { useGetTuteeProfile, useGetTutee } from "../../hooks/useGetData"
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
    marginBottom: theme.spacing(4),
  },
  textfield: {
    marginBottom: theme.spacing(4),
    minWidth: 300,
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


export default function EditProfile() {
  const classes = useStyles()
    
  const profile = JSON.parse(window.localStorage.getItem("profile"))

  function TutorProfile() {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const details = useGetTuteeProfile(profile)
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

      setMessage("Successfully updated tutee profile.")
    } catch(e) {
      console.log(e.message)
      setError("Failed to update tutee profile.")
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
                <center><h2 className="bottomBorder" style={{width: "30%"}}>Edit Tutee Profile</h2></center>
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
              <Grid container justifyContent="center" alignItems="center">
                <StyledButton href="#tutee-profile">Back to View Tutee Profile</StyledButton>
              </Grid>
            </Card>
          </>}
        </Grid>
        <Footer/>
      </Grid>
    )
  }

  return <TutorProfile />
}