import React, { useState, useRef } from 'react'
import { db } from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"
import moment from "moment"
import { useGetSelectedSlots, useGetCurrUserName, useGetTutor } from "../../hooks/useGetData"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Grid, Tabs, Tab, FormControl, InputLabel, MenuItem, Select, Typography, AppBar, Paper } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'


const useStyles = makeStyles((theme) => ({
  textfield: {
    minWidth: 200,
    marginBottom: theme.spacing(4)
  },
  availability: {
    minWidth: 250,
  },
  tuteeselect: {
    minWidth: 250,
    textAlign: "left",
    marginBottom: theme.spacing(4)
  },
  selectlesson: {
    position: "relative",
    left: 25,
    top: 25,
    marginBottom: theme.spacing(4)
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  custom: {
    position: "relative",
    left: 25,
    top: 25,
  },
  button: {
    position: "relative",
    left: 25,
    marginTop: theme.spacing(4)
  },
  paper: {
    paddingBottom: theme.spacing(3)
  }
}))


export default function TutorSelectSlot(props) {
  const classes = useStyles()
  
  const { tutee, dateRange } = props
  const { getEmail } = useAuth()
  const user = useGetCurrUserName()
  const tutors = useGetTutor()

  function SelectSlotForm() {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    const [tutor, setTutor] = useState("")
    const dateRef = useRef()
    const startTimeRef = useRef()
    const endTimeRef = useRef()

    const slots = useGetSelectedSlots(tutee, dateRange)
    const [lesson, setLesson] = useState("")
    const [value, setValue] = useState(0)

    function handleSubmit(event) {
      event.preventDefault();
        
      try {
        setError("")
        setMessage("")
        setLoading(true)

        let selectedDate = ""
        let selectedStartTime = ""
        let selectedEndTime = ""

        if (value === 0) {
          selectedDate = lesson.date
          selectedStartTime = lesson.startTime
          selectedEndTime = lesson.endTime
        } else if (value === 1) {
          selectedDate = dateRef.current.value
          selectedStartTime = startTimeRef.current.value
          selectedEndTime = endTimeRef.current.value 
        }

        db.collection("Schedule")
        .doc("ScheduledLesson")
        .collection(dateRange)
        .add({
          tutee: tutee,
          tutor: tutor || user,
          date: selectedDate,
          startTime: selectedStartTime,
          endTime: selectedEndTime
        })

        setMessage("Successfully scheduled lesson.")
      } catch (e) {
        console.log(e.message)
        setError("Failed to schedule lesson.")
      }
      setLoading(false)
    }
    

    return (
      <>
      <Paper className={classes.paper}>
       <form>
        <AppBar position="static">
          <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
            <Tab label="Based on Tutee's Availability" {...a11yProps(0)} />
            <Tab label="Custom" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        {error && <Alert severity="error" onClose={() => {setError("")}}>{error}</Alert>}
        {message && <Alert severity="success" onClose={() => {setMessage("")}}>{message}</Alert>}
        <TabPanel value={value} index={0}>
          {slots  
            ? <Grid container className={classes.selectlesson}>
                <FormControl className={classes.availability}>
                  <InputLabel shrink id="availability-label">Lesson timings selected by tutee</InputLabel>
                  <Select
                    labelId="availability-label"
                    id="availability"
                    value={lesson}
                    onChange={(e) => setLesson(e.target.value)}
                    className={classes.selectEmpty}
                    fullWidth
                    displayEmpty
                    required
                  >
                    <MenuItem value="">Select...</MenuItem>
                    {slots && slots.map((slot, index) => <MenuItem key={index} value={slot}>{moment(slot.date).format("D MMMM YYYY") + ", " + slot.startTime + " - " + slot.endTime}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            : <Alert severity="info">Tutee has not submitted availability.</Alert>
          }
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={4} className={classes.custom}>
            <Grid item>
              <TextField
                className={classes.textfield}
                label="Date"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                inputRef={dateRef}
                required
              /> 
            </Grid>
            <Grid item>
              <TextField
                className={classes.textfield}
                label="Lesson Start Time"
                type="time"
                InputLabelProps={{
                  shrink: true
                }}
                inputRef={startTimeRef}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.textfield}
                label="Lesson End Time"
                type="time"
                InputLabelProps={{
                  shrink: true
                }}
                inputRef={endTimeRef}
                required
              />
            </Grid>   
          </Grid>
        </TabPanel>
        {(getEmail() === "toinfinityandbeyond.orbital@gmail.com") && slots && <>
          <Grid container className={classes.selectlesson}>
            <FormControl className={classes.availability}>
              <InputLabel shrink id="tutee-name-label">Tutor</InputLabel>
              <Select
                labelId="tutor-name-label"
                id="tutor-name"
                value={tutor}
                onChange={(e) => setTutor(e.target.value)}
                displayEmpty
                className={classes.selectEmpty}
                required
              >
                <MenuItem value="">Select...</MenuItem>
                {tutors.map((name, index) => name && <MenuItem key={index} value={name}>{name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </> }
          <Button 
            variant="contained" 
            color="secondary"
            size="medium" 
            type="submit"  
            disabled={loading}
            onClick={handleSubmit}
            className={classes.button}
          >
          Confirm
          </Button>
       </form>
      </Paper>
      </>
    )
  }
 
  return <>{tutors && user && <SelectSlotForm />}</>
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Typography component={'span'}>{children}</Typography> 
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}