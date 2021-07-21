import React, { useState, useRef } from "react"
import { db } from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"
import { useGetTuteeCode } from "../../hooks/useGetData"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Container, Grid, Button, TextField, Card, CardContent } from "@material-ui/core"
import { Alert, AlertTitle } from '@material-ui/lab'
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
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    cardcontent: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(2),
    },
    button: {
      position: "relative",
      top: "12px",
    },
    link: {
      marginTop: theme.spacing(2),
    },
    alert: {
      marginTop: theme.spacing(6)
    },
    emptyalert: {
      marginBottom: theme.spacing(2)
    }
  }));
  
  const StyledButton = withStyles((theme) => ({
    root: {
      color: theme.palette.secondary.dark,
      '&:hover': {
        color: theme.palette.secondary.dark,
     },
    },
  }))(Button);


export default function TuteeVerificationCode() {
  const classes = useStyles()
  
  const { getEmail } = useAuth()
  const currentCode = useGetTuteeCode()
  
  function ChangeCode() {
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState("")
    const codeRef = useRef()
    
    function handleSetCode(event) {
        event.preventDefault()
        setError("")
        
        if (disabled) {
          setDisabled(false)
        } else if (codeRef.current.value === "") {
          setError("You are not allowed to leave the field empty.")
        } else {
          db.collection("Schedule")
            .doc("VerificationCode")
            .set({
              code: codeRef.current.value
            })
          setDisabled(true)  
        }
    }
    
    return (
      <Grid className="styling bg9">
        <Grid item xs={12}>
          <NavigationBar/>
        </Grid>
        {(getEmail() === "toinfinityandbeyond.orbital@gmail.com") 
        ? <Grid item xs={12} className={classes.grid} >
          <Card className={classes.card}>
            <CardContent>
              <center><h2 className="bottomBorder" style={{width: "60%"}}>Tutee Verification Code</h2></center>
              <p>Tutees will use this code to submit their availability for the next lesson.</p>
            </CardContent>
            <CardContent className={classes.cardcontent}>
              {error && <Alert severity="error" className={classes.emptyalert} onClose={() => setError("")}>{error}</Alert>}
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <TextField
                    className={classes.textfield}
                    label="Verification Code"
                    type="text"
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputRef={codeRef}
                    defaultValue={currentCode}
                    disabled={disabled}
                    required
                  />
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    type="submit" 
                    className={classes.button}
                    onClick={handleSetCode}
                  >
                  {disabled ? "Change" : "Update"}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            <Grid container justifyContent="center" alignItems="center">
              <StyledButton href="#view-upcoming-lesson">Back to View Upcoming Lessons</StyledButton>
            </Grid>
          </Card>
        </Grid>
        : <Container className={classes.card}>
            <Alert severity="error" className={classes.alert}>
              <AlertTitle>Error</AlertTitle>
              You are not authorised to view this page. Please return to the dashboard.
            </Alert>
          </Container>}
        <Footer/>
      </Grid>
    )}

  return currentCode && <ChangeCode/>
} 
 