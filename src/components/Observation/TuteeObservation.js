import React, { useRef, useState } from "react"
import { db } from "../../firebase"
import { useHistory } from "react-router-dom"
import { useGetTutee, useGetCurrUserName } from "../../hooks/useGetData"
import { today } from "../Schedule/Date"
import { Button, TextField, Card, CardContent, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: 50,
    marginLeft: 50,
  },
  textfield: {
    minWidth: 200,
    marginBottom: theme.spacing(4)
  },
  formControl: {
    width: "100%",
    minWidth: 200,
    textAlign: "left",
    marginBottom: theme.spacing(4)
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  alert: {
    marginBottom: theme.spacing(3)
  },
}))


export default function TuteeObservation() {
  const classes = useStyles()
  
  const history = useHistory()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  
  let tuteeNames = useGetTutee()
  const currName = useGetCurrUserName()
  const [tuteeName, setTuteeName]= useState("")
  const dateRef = useRef()
  const commentRef = useRef()
  
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    if (dateRef.current.value > today) {
      setError("Failed to save observation record. The date has not arrived yet!")
      return setLoading(false)
    }

    //save data to firestore 
    db.collection("Observation")
    .doc(dateRef.current.value)
    .collection(dateRef.current.value)
    .doc(tuteeName)
    .set({
        date: dateRef.current.value,
        name: tuteeName,
        tutor: currName,
        comment: commentRef.current.value
    })
    .then(() => {
        setMessage("Successfully saved observation record for " + tuteeName + ".") 
      })
      .catch(() => setError("Failed to save observation record."))  
    
    db.collection("TuteeProfile")
      .doc(tuteeName)
      .collection("Observation")
      .doc(dateRef.current.value)
      .set({  
        date: dateRef.current.value,
        name: tuteeName,
        tutor: currName,
        comment: commentRef.current.value
      })
      .then(() => {
        setMessage("Successfully saved observation record for " + tuteeName + ".") 
      })
      .catch(() => setError("Failed to save observation record."))  
    setLoading(false)
  }

  return (
    <Grid className="styling bg4">
      <Grid item xs={12}>
        <NavigationBar />
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <CardContent className={classes.cardcontent}>  
            <center><h2 className="text-center bottomBorder" style={{width: "40%"}}>Tutee Observation</h2></center>
            <p>Record tutees' progress after each lesson.</p>            
          </CardContent>
          <CardContent className={classes.cardcontent}>  
            {error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}
            {message && <Alert severity="success" className={classes.alert} onClose={() => {setMessage("")}}>{message}</Alert>}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item>
                  <TextField
                    className={classes.textfield}
                    label="Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true
                    }}
                    defaultValue={today}
                    inputRef={dateRef}
                    required
                  />
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink id="tutee-name-label">Tutee</InputLabel>
                    <Select
                      labelId="tutee-name-label"
                      id="tutee-name"
                      value={tuteeName}
                      onChange={(e) => setTuteeName(e.target.value)}
                      displayEmpty
                      className={classes.selectEmpty}
                      required
                    >
                      <MenuItem value="">Select...</MenuItem>
                      {tuteeNames && tuteeNames.map((n) => n && <MenuItem key={n} value={n}>{n}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid> 
              </Grid>                 
              <TextField
                className={classes.textfield}
                label="Comments"
                placeholder="Input observation here..."
                type="text"
                InputLabelProps={{
                  shrink: true
                }}
                inputRef={commentRef}
                variant="filled"
                multiline
                rows={8}
                fullWidth
                required
              />
              <Button disabled={loading} variant="contained" color="secondary" type="submit">Confirm</Button>
            </form>
            <br/>
            <Button disabled={loading} variant="contained" color="secondary" type="button" onClick={ () => history.push("/view-observation") }>View Observation Records</Button>
          </CardContent>
        </Card>
        <Footer/>
      </Grid> 
    </Grid>        
  )
}
