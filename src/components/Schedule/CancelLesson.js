import React, { useState } from 'react'
import { db } from "../../firebase"
import { nextWeek, thisWeek, today } from "./Date"
import moment from "moment"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import "../TutorManager.css"


const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(18),
  },
  table: {
    minWidth: 700,
  },
  card: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: 30,
    marginLeft: 30,
    marginBottom: theme.spacing(4),
  },
}))

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

const StyledButton = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.secondary.dark,
   },
  },
}))(Button);


export default function CancelLesson() { 
  const classes = useStyles()

  var retrieveData = JSON.parse(JSON.parse(window.localStorage.getItem("lessons")))
  const [lessons, setLessons] = useState(retrieveData)

  function handleDelete(index, details) {
    //delete lesson from firebase
    db.collection("Schedule")
      .doc("ScheduledLesson")
      .collection(thisWeek)
      .where("tutee", "==", details.tutee)
      .where("date", "==", details.date)
      .where("startTime", "==", details.startTime)
      .where("endTime", "==", details.endTime)
      .where("tutor", "==", details.tutor)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc => doc.ref.delete())
      })
    db.collection("Schedule")
      .doc("ScheduledLesson")
      .collection(nextWeek)
      .where("tutee", "==", details.tutee)
      .where("date", "==", details.date)
      .where("startTime", "==", details.startTime)
      .where("endTime", "==", details.endTime)
      .where("tutor", "==", details.tutor)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc => doc.ref.delete())
      })       
    

    //delete lesson from displayed table
    let newLessons = []
    lessons.map(lesson => (lessons.indexOf(lesson) !== index) && newLessons.push(lesson))
    setLessons(newLessons)
    window.localStorage.setItem("lessons", JSON.stringify(JSON.stringify(newLessons)))
  }
  


  return (
    <Grid className="styling bg9">
    <Grid item xs={12}>
      <NavigationBar/>
    </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <CardContent>
            <center><h2 className="bottomBorder" style={{width: "25%"}}>Cancel Lesson</h2></center>
          </CardContent>  
          <CardContent className={classes.cardcontent}>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left">Date</StyledTableCell>
                    <StyledTableCell align="left">Time</StyledTableCell>
                    <StyledTableCell align="left">Tutee</StyledTableCell>
                    <StyledTableCell align="left">Tutor</StyledTableCell>
                    <StyledTableCell align="center">Cancel</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                {lessons && lessons.map((details, index) => (
                (details.date >= today) &&
                <StyledTableRow key={index}>
                  <StyledTableCell align="left" style={{width: "25%"}}>{moment(details.date).format("dddd, D MMMM YYYY")}</StyledTableCell>
                  <StyledTableCell align="left" style={{width: "25%"}}>{details.startTime + " - " + details.endTime}</StyledTableCell>
                  <StyledTableCell align="left">{details.tutee}</StyledTableCell>
                  <StyledTableCell align="left">{details.tutor}</StyledTableCell>
                  <StyledTableCell align="center" style={{width: "10%"}}>
                    <IconButton size="small" onClick={() => handleDelete(index, details)}>
                      <ClearIcon/>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <Grid container justifyContent="center" alignItems="center">
            <StyledButton href="#view-upcoming-lesson">Back to View Upcoming Lessons</StyledButton>
          </Grid>
        </Card>
      </Grid>
      <Footer/>
    </Grid>
  )
}
