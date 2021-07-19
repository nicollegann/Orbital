import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { db } from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"
import { useGetTutorCode } from "../../hooks/useGetData"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Container, Grid, Button, TextField, Card, CardContent, Typography } from "@material-ui/core"
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
  }));
  
  const StyledLink = withStyles((theme) => ({
    root: {
      color: theme.palette.secondary.dark,
    },
  }))(Typography)


export default function TutorVerificationCode() {
  const classes = useStyles()  
  
  const { getEmail } = useAuth()
  const currentCode = useGetTutorCode()

  function ChangeCode() {
    const [disabled, setDisabled] = useState(true)
    const codeRef = useRef()

    function handleSetCode(event) {
      event.preventDefault()
      
      if (disabled) {
          setDisabled(false)
      } else {
          db.collection("TutorProfile")
          .doc("VerificationCode")
          .set({
              code: codeRef.current.value
          })
          setDisabled(true)  
      }
    }
        
    return (
      <Grid className="styling bg4">
        <Grid item xs={12}>
          <NavigationBar/>
        </Grid>
        {(getEmail() === "toinfinityandbeyond.orbital@gmail.com") 
        ? <Grid item xs={12} className={classes.grid} >
          <Card className={classes.card}>
            <CardContent>
              <center><h2 className="bottomBorder" style={{width: "50%"}}>Tutor Verification Code</h2></center>
              <p>Tutors will use this code to create their account.</p>
            </CardContent>
            <CardContent className={classes.cardcontent}>
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
          </Card>
          <Grid container justifyContent="center" className={classes.link}>
            <Link to="/view-tutor-profile" style={{textDecoration: "none"}}>
              <StyledLink variant="button" align="center" style={{textDecoration: "underline"}}>Back to View Tutor Profile</StyledLink>
            </Link>
          </Grid>
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