import React from 'react'
import { useHistory } from "react-router-dom"
import { useGetLessonDetails, useGetCurrUserName } from "../../hooks/useGetData" 
import { useAuth } from "../../contexts/AuthContext"
import { nextWeek, thisWeek, today, orderByTime } from "./Date"
import moment from "moment"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import EventIcon from '@material-ui/icons/Event'
import ClearIcon from '@material-ui/icons/Clear'
import UpdateIcon from '@material-ui/icons/Update'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import "../TutorManager.css"


const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(12),
  },
  button: {
    marginTop: theme.spacing(2)
  },
  table: {
    minWidth: 700,
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
}))

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default function ViewUpcomingLesson() {
  const classes = useStyles()
  
  const history = useHistory()
  const { getEmail } = useAuth()
  const tutor = useGetCurrUserName()
  const nextWeekLessons = useGetLessonDetails(nextWeek)
  const thisWeekLessons = useGetLessonDetails(thisWeek)

  return (
    <Grid className="styling bg4">
      <Grid item xs={12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <CardContent>
            <center><h2 className="text-center bottomBorder" style={{width: "30%"}}>Upcoming Lessons</h2></center>
          </CardContent>
          <CardContent className={classes.cardcontent}>
            {nextWeekLessons && thisWeekLessons && tutor && <ScheduleTable user={getEmail()} tutor={tutor} nextWeek={nextWeekLessons} thisWeek={thisWeekLessons}/>}
            <Grid container spacing={3} className={classes.button}>
              <Grid item>
                <Button 
                  variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="button"
                  startIcon={<EventIcon/>}
                  onClick={() => history.push("/schedule-lesson")} 
                >
                Schedule Lesson
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="button"
                  startIcon={<ClearIcon/>}
                  onClick={() => history.push("/cancel-lesson")} 
                >
                Cancel Lesson
                </Button>
              </Grid>
              <Grid item>
                {(getEmail() === "toinfinityandbeyond.orbital@gmail.com") &&
                <Button 
                  variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="button"
                  startIcon={<UpdateIcon/>}
                  onClick={() => history.push("/set-slot")}
                >
                Edit Lesson Slots
                </Button>}
              </Grid>
              <Grid item>
                {(getEmail() === "toinfinityandbeyond.orbital@gmail.com") &&
                <Button 
                  variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="button"
                  startIcon={<LockOpenIcon/>}
                  onClick={() => history.push("/tutee-verification-code")}
                >
                Tutee Verification Code
                </Button>}
              </Grid>
            </Grid>
          </CardContent>
        </Card> 
      </Grid>
      <Footer/>
    </Grid>
  )  
}


function ScheduleTable(props) {
  const classes = useStyles()
  let allLesson = (props.thisWeek).concat(props.nextWeek)
  
  //order lessons by nearest to furthest date
  allLesson.sort((a,b) => a.date >= b.date ? 1 : -1)

  //order lessons by time and filter based on user
  if (allLesson.length !== 0) {
    allLesson = orderByTime(allLesson)
    if (props.user !== "toinfinityandbeyond.orbital@gmail.com") {
      allLesson = allLesson.filter((lesson) => lesson.tutor === props.tutor)
    }
  }

  window.localStorage.setItem("lessons", JSON.stringify(JSON.stringify(allLesson)))

  return (
    <TableContainer>
    <Table className={classes.table}>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell align="left">Date</StyledTableCell>
          <StyledTableCell align="left">Time</StyledTableCell>
          <StyledTableCell align="left">Tutee</StyledTableCell>
          <StyledTableCell align="left">Tutor</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
      {allLesson && allLesson.map((details, index) => (
        (details.date >= today) &&
        <StyledTableRow key={index}>
          <StyledTableCell align="left" style={{width: "25%"}}>{moment(details.date).format("dddd, D MMMM YYYY")}</StyledTableCell>
          <StyledTableCell align="left" style={{width: "25%"}}>{details.startTime + " - " + details.endTime}</StyledTableCell>
          <StyledTableCell align="left">{details.tutee}</StyledTableCell>
          <StyledTableCell align="left">{details.tutor}</StyledTableCell>
        </StyledTableRow>
      ))}
      </TableBody>
    </Table>
    </TableContainer>
  )
}
