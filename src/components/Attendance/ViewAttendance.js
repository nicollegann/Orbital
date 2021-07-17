import React, { useState, useRef } from "react"
import { useGetTutee } from "../../hooks/useGetData"
import AttendanceRecord from "./AttendanceRecord"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Card, CardContent, Grid, MenuItem } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
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
    marginRight: 30,
    marginLeft: 30,
  },
  textfield: {
    marginBottom: theme.spacing(3),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    position: "relative",
    top: "12px",
  }
}))


export default function ViewAttendance() {
  const classes = useStyles();
  
  const dateRef = useRef()
  const tuteeRef = useRef()
  const [ date, setDate ] = useState("")
  const [ tuteeName, setTuteeName ]= useState("")

  const [tuteeNames] = useGetTutee()

  const handleSubmit = (event) => {
    event.preventDefault()
    setDate(dateRef.current.value)
    setTuteeName(tuteeRef.current.value)
  }

  return (
    <Grid className="styling bg4">
      <Grid item xs={12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <CardContent>
            <center><h2 className="text-center bottomBorder" style={{width: "40%"}}>View Attendance Records</h2></center>
          </CardContent>
          <CardContent className={classes.cardcontent}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item>
                <TextField 
                  className={classes.textfield}
                  label="Date" 
                  type="date" 
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={dateRef}
                />
              </Grid>
              <Grid item>
                <TextField 
                  className={classes.textfield}
                  label="Tutee" 
                  select 
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue="ALL"
                  inputRef={tuteeRef}
                >
                  <MenuItem key="ALL" value="ALL">All Tutees</MenuItem>
                  {tuteeNames.map((n) => <MenuItem key={n.key} value={n.value}>{n.value}</MenuItem>)}
                </TextField>    
              </Grid>
              <Grid item>
                <Button 
                    variant="contained" 
                    color="secondary"
                    size="medium" 
                    type="submit"  
                    className={classes.button}
                    startIcon={<SearchIcon/>}
                >
                Search
                </Button>
              </Grid>
            </Grid> 
          </form>
          {(date || tuteeName) && <AttendanceRecord date={date} tutee={tuteeName}/>}
          </CardContent>
        </Card>
        
      </Grid>
      <Footer/>
    </Grid>
  ) 
} 