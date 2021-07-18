import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { db } from "../../firebase"
import { useGetTuteeCode } from "../../hooks/useGetData"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, Button, TextField, Card, CardContent, Typography } from "@material-ui/core"
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
    //   width: "60%",
    //   marginRight: "auto",
    //   marginLeft: "auto",
      marginBottom: theme.spacing(2)
    },
    button: {
      position: "relative",
      top: "12px",
    },
    link: {
      marginTop: theme.spacing(2),
    }
  }));
  
  const StyledLink = withStyles((theme) => ({
    root: {
      color: theme.palette.secondary.dark,
    },
  }))(Typography)

export default function TuteeVerificationCode() {
  const classes = useStyles()

  const currentCode = useGetTuteeCode()
  
  function ChangeCode() {
    const [disabled, setDisabled] = useState(true)
    const codeRef = useRef()
    
    function handleSetCode(event) {
        event.preventDefault()
        
        if (disabled) {
        setDisabled(false)
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
      <Grid className="styling bg4">
        <Grid item xs={12}>
          <NavigationBar/>
        </Grid>
        <Grid item xs={12} className={classes.grid} >
          <Card className={classes.card}>
            <CardContent>
              <center><h2 className="bottomBorder" style={{width: "60%"}}>Tutee Verification Code</h2></center>
              <p>Tutees will use this code to submit their availability for the next lesson.</p>
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
            <Link to="/view-upcoming-lesson" style={{textDecoration: "none"}}>
              <StyledLink variant="button" align="center" style={{textDecoration: "underline"}}>Back to View Upcoming Lessons</StyledLink>
            </Link>
          </Grid>
        </Grid>
        <Footer/>
      </Grid>
    )}

  return currentCode && <ChangeCode/>
} 
 