import React, { useRef, useState } from "react"
import { db } from "../../firebase"
import { useGetCurrUserName, useGetCounter } from "../../hooks/useGetData"
import { today } from "../Schedule/Date"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Card, CardContent, Container, Grid, Checkbox, FormControlLabel } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import SendIcon from '@material-ui/icons/Send'
import "../TutorManager.css"


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
    paddingBottom: theme.spacing(4),
  },
  textfield: {
    marginBottom: theme.spacing(3),
  },
  checkbox: {
    marginBottom: theme.spacing(1)
  },
  alert: {
    marginBottom: theme.spacing(3)
  },
}))


export default function Feedback() {
  const classes = useStyles()
  
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  
  const currName = useGetCurrUserName()
  const dateRef = useRef()
  const feedbackRef = useRef()
  const [anonymous, setAnonymous] = useState(false)
  let count = useGetCounter()
  //const randomKey = uuid()


  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    const date = new Date(dateRef.current.value)
    const month = date.getMonth() + 1
    const formattedMonth = date.getFullYear() + "-" + (month < 10 ? "0" + month : month)
    
    try {
      //save data to firestore 
      if (anonymous) {
        db.collection("Feedback")
          .doc(formattedMonth)
          .collection(formattedMonth)
          .add({
            date: dateRef.current.value,
            tutor: "Anonymous",
            feedback: feedbackRef.current.value,
            month: formattedMonth
          })
      } else {
        db.collection("Feedback")
          .doc(formattedMonth)
          .collection(formattedMonth)
          .add({
            date: dateRef.current.value,
            tutor: currName,
            feedback: feedbackRef.current.value,
            month: formattedMonth
          })
      }

      //update counter to alert admin of new feedback
      count = count + 1 
      db.collection("Feedback")
        .doc("Counter")  
        .update({
          count: count
        })  

      setMessage("Successfully submitted your feedback.") 
    } catch(e) {
      console.log(e.message)
      setError("Failed to submit feedback.")
    }

    setLoading(false)
  }

  return (
    <Grid className="styling bg4">
      <Grid item xs={12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <CardContent>
            <center><h2 className="text-center bottomBorder" style={{width: "30%"}}>Feedback</h2></center>
            <p>Submit your feedback for improvements to the programme here.</p>
            {error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}
            {message && <Alert severity="success" className={classes.alert} onClose={() => {setMessage("")}}>{message}</Alert>}
            <Container>
              <form>
                <TextField 
                  className={classes.textfield}
                  label="Date" 
                  type="date" 
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={today}
                  inputRef={dateRef} 
                  required
                />
                
                <TextField
                  className={classes.textfield} 
                  label="Input feedback here..." 
                  placeholder="Message"
                  variant="filled"
                  multiline
                  rows={8}
                  fullWidth
                  inputRef={feedbackRef}
                  required
                />      
                
                <FormControlLabel 
                  className={classes.checkbox}
                  control={
                    <Checkbox
                      checked={anonymous}
                      onChange={(event) => {setAnonymous(event.target.checked)}}
                      name="anonymous"
                      color="primary"
                    /> 
                  }
                  label="Tick box to stay anonymous"
                />
                <br/>
                <Button disabled={loading} variant="contained" color="secondary" type="submit" endIcon={<SendIcon/>} onClick={handleSubmit}>Submit</Button>
              </form>
            </Container>
          </CardContent>
        </Card>
    
        <Footer /> 
      </Grid>          
    </Grid>
  )
}