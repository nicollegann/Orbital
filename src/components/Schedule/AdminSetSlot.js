import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { db } from "../../firebase"
import { useGetLessonOptions } from "../../hooks/useGetData"
import { nextWeek, orderByTime, today } from "./Date"
import moment from "moment"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Button, TextField, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
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
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: 30,
    marginLeft: 30,
  },
  textfield: {
    minWidth: 200,
  },
  button: {
    position: "relative",
    top: "8px",
  },
  link: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(4),
  }
}));

const StyledLink = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.dark,
  },
}))(Typography)

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)


export default function AdminSetSlot() { 
  const classes = useStyles()
  
  const nextWeekSlots = useGetLessonOptions(nextWeek)

  return (
    <Grid className="styling bg4">
      <Grid item xs={12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          {nextWeekSlots && <AvailableSlots nextWeekSlots={nextWeekSlots}/>}
        </Card>
        <Grid container justifyContent="center" className={classes.link}>
          <Link to="/view-upcoming-lesson" style={{textDecoration: "none"}}>
            <StyledLink variant="button" align="center" style={{textDecoration: "underline"}}>Back to View Upcoming Lessons</StyledLink>
          </Link>
        </Grid>
      </Grid>
      <Footer/>
    </Grid>
  );
}


function AvailableSlots(props) {
  const classes = useStyles()
  
  const orderedSlots = orderByTime(props.nextWeekSlots)
  const [lessons, setLessons] = useState(orderedSlots)

  const dateRef = useRef()
  const startTimeRef = useRef()
  const endTimeRef = useRef()
  const [error, setError] = useState("")
  const [deleteError, setDeleteError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAdd, setShowAdd] = useState(false)


  function handleDelete(index, option) {

    try {
      db.collection("Schedule")
        .doc("LessonOptions")
        .collection(nextWeek)
        .where("date", "==", option.date)
        .where("startTime", "==", option.startTime)
        .where("endTime", "==", option.endTime)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach(doc => doc.ref.delete())
        })

      //delete lesson option from displayed table
      let newLessons = []
      lessons.map(lesson => (lessons.indexOf(lesson) !== index) && newLessons.push(lesson))
      setLessons(newLessons)
    } catch(e) {
      setDeleteError("Failed to delete lesson slot")
    } 
  }


  function handleAdd(event) {
    event.preventDefault()
      
    try { 
      setError("")
      setLoading(true) 
      
      //add lesson option to firestore
      db.collection("Schedule")
        .doc("LessonOptions")
        .collection(nextWeek)
        .add({
          date: dateRef.current.value,
          startTime: startTimeRef.current.value,
          endTime: endTimeRef.current.value
        })

      //add lesson option to displayed table
      let newLessons = []
      lessons.map(lesson => newLessons.push(lesson))
      newLessons.push({date: dateRef.current.value, startTime: startTimeRef.current.value, endTime: endTimeRef.current.value})
      setLessons(newLessons)
    } catch(e) {
      console.log(e.message)
      setError("Failed to add lesson slot.")
    }
    setLoading(false)
  }


  return (
    <>
    <CardContent>
      <center><h2 className="bottomBorder" style={{width: "40%"}}>Lesson Slots For Selection</h2></center>
      <p>List of available time slots for tutees to select for {nextWeek}.</p>
    </CardContent>
    <CardContent className={classes.cardcontent}>
      {deleteError && <Alert variant="error">{deleteError}</Alert>}
      <form onSubmit={handleDelete}>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Time</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
            {lessons && lessons.map((details, index) => (
              (details.date >= today) &&
              <StyledTableRow key={index}>
                <StyledTableCell align="left">{moment(details.date).format("dddd, D MMMM YYYY")}</StyledTableCell>
                <StyledTableCell align="left" style={{width: "65%"}}>{details.startTime + " - " + details.endTime}</StyledTableCell>
                <StyledTableCell align="center" style={{width: "10%"}}>
                  <IconButton size="small" onClick={() => handleDelete(index, details)}>
                    <DeleteIcon/>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </form>
    </CardContent>
    <CardContent className={classes.cardcontent}>
      <Button
        variant="contained" 
        color="secondary"
        size="medium"
        type="button"
        onClick={() => setShowAdd(!showAdd)}
      >
        {showAdd ? "Close" : "Add Lesson Slot"}
      </Button>
      <Paper className={classes.paper}>
      {showAdd && <>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={4} justifyContent="center">
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
        <Grid item>
          <Button 
            variant="contained" 
            color="secondary"
            size="medium" 
            type="submit"  
            disabled={loading}
            onClick={handleAdd}
            className={classes.button}
          >
          Confirm
          </Button>
        </Grid>  
      </Grid>
      </>}
      </Paper>
    </CardContent>
    </>
  )
}
