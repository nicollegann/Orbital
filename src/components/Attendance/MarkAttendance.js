import React, { useRef, useState } from "react"
import { db } from "../../firebase"
import { useGetTutee, useGetCurrUserName } from "../../hooks/useGetData"
import { useHistory } from "react-router-dom"
import { today } from "../Schedule/Date"
import { Button, TextField, Card, CardContent, Grid, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
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
    width: "50%",
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


export default function MarkAttendance() {
  const classes = useStyles()

  const history = useHistory()
  let [tuteeNames] = useGetTutee()
  const currName = useGetCurrUserName()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [tuteeName, setTuteeName]= useState("")
  const [attendance, setAttendance] = useState("")
  const dateRef = useRef()
  const timeRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    
    //save data to firestore (to 2 different collections)
    db.collection("Attendance")
      .doc(dateRef.current.value)
      .collection(dateRef.current.value)
      .doc(tuteeName)
      .set({
        date: dateRef.current.value,
        time: timeRef.current.value,
        name: tuteeName,
        attendance: attendance,
        tutor: currName
      })
      .then(() => {
        setMessage("Successfully marked attendance for " + tuteeName + ".")
      })
      .catch(() => setError("Failed to mark attendance for " + tuteeName + "."))

    db.collection("TuteeProfile")
      .doc(tuteeName)
      .collection("Attendance")
      .doc(dateRef.current.value)
      .set({
        date: dateRef.current.value,
        time: timeRef.current.value,
        name: tuteeName,
        attendance: attendance,
        tutor: currName
     })
    
      .then(() => {
        setMessage("Successfully marked attendance for " + tuteeName + ".")
      })
      .catch(() => setError("Failed to mark attendance for " + tuteeName + "."))  
      
      setLoading(false)
  }

  return (
    <Grid className="styling bg1">
      <Grid item xs={12}>
        <NavigationBar />
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <CardContent className={classes.cardcontent}>
            <center><h2 className="bottomBorder text-center">Mark Attendance</h2></center>
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
                  style={{ marginRight: 50 }}
                  fullWidth
                  required
                /> 
              </Grid>
              <Grid item>
                <TextField
                  className={classes.textfield}
                  label="Lesson Time"
                  type="time"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputRef={timeRef}
                  fullWidth
                  required
                />
              </Grid>
              </Grid>
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
                  {tuteeNames.map((n) => <MenuItem key={n.key} value={n.value}>{n.value}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="attendance-label">Attendance</InputLabel>
                <Select
                  labelId="attendance-label"
                  id="attendance"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  displayEmpty
                  className={classes.selectEmpty}
                  required
                >
                  <MenuItem value="">Select...</MenuItem>
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                </Select> 
              </FormControl>
              <br/>
              <Button disabled={loading} variant="contained" color="secondary" type="submit">Confirm</Button>
            </form>
            <br/>
            <Button disabled={loading} variant="contained" color="secondary" type="button" onClick={ () => history.push("/view-attendance") }>View Attendance Records</Button>
          </CardContent>
        </Card>
        <Footer/>
      </Grid> 
    </Grid>
  )
}
