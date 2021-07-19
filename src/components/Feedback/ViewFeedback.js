import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { db } from "../../firebase"
import FeedbackRecord from "./FeedbackRecord"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Card, CardContent, Container, Grid } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search';
import "../TutorManager.css"
import "./Feedback.css"


const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(14),
  },
  card: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  cardcontent: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  textfield: {
    marginBottom: theme.spacing(3),
  },
  alert: {
    marginBottom: theme.spacing(3),
  },
  button: {
    position: "relative",
    top: "12px",
    left: "15px",
  }
}))


export default function ViewFeedback() {
  const classes = useStyles();
  
  const dateRef = useRef()
  const today = new Date()
  const month = today.getMonth() + 1
  const formattedMonth = today.getFullYear() + "-" + (month < 10 ? "0" + month : month)

  const [ date, setDate ] = useState(formattedMonth)

  const { getEmail } = useAuth()


  useEffect(() => {
    db.collection("Feedback")
    .doc("Counter")
    .update({
      count: 0
    })
  })


  const handleSubmit = (event) => {
    event.preventDefault()
    setDate(dateRef.current.value)
  }

  return (
    <Grid className="styling bg4">
      <NavigationBar />
      <Grid xs={12} className={classes.grid} >
        {(getEmail() === "toinfinityandbeyond.orbital@gmail.com")
          ? <Card className={classes.card}>
              <CardContent>
                <center><h2 className="text-center bottomBorder" style={{width: "32%"}}>Feedback Records</h2></center>
                <p>View feedback submitted by tutors.</p>
              </CardContent>
              <CardContent className={classes.cardcontent}>  
                <form>
                  <TextField 
                    className={classes.textfield}
                    label="Date" 
                    type="month" 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={date}
                    inputRef={dateRef} 
                    required
                  />
                  <Button 
                    variant="contained" 
                    color="secondary"
                    size="medium" 
                    type="submit"  
                    onClick={handleSubmit}
                    className={classes.button}
                    startIcon={<SearchIcon/>}
                  >
                  Search
                  </Button>
                </form>
              </CardContent>
              <CardContent className={classes.cardcontent}>
              {<FeedbackRecord date={date}/>}
              </CardContent>
            </Card>
          : <Container className={classes.card}>
              <Alert severity="error" className={classes.alert}>
                <AlertTitle>Error</AlertTitle>
                You are not authorised to view this page. Please return to the dashboard.
              </Alert>
            </Container>}
      </Grid>   
      <Footer/>
    </Grid>
  ) 
} 