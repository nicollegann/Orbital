import React from 'react'
import { useHistory } from "react-router-dom"
import { useGetLessonDetails } from "../../hooks/useGetData" 
import { useAuth } from "../../contexts/AuthContext"
import { Button, Container, Table, Card } from "react-bootstrap"
import { nextWeek, thisWeek, today, orderByTime } from "./Date"
import NavigationBar from "../NavigationBar"
import moment from "moment"


export default function ViewUpcomingLesson() {
  const history = useHistory()
  const { getEmail } = useAuth()
  const nextWeekLessons = useGetLessonDetails(nextWeek)
  const thisWeekLessons = useGetLessonDetails(thisWeek)

  return (
    <div className="bg5 styling">
      <NavigationBar/>
      <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "0", paddingBottom: "30%"}}>
        <Card className="justify-content-md-center" style={{width: "70rem", margin: "5% auto 1%"}}> 
          <Card.Body>
            <center><h2 className="text-center bottomBorder" style={{width: "30%", marginBottom: "2%"}}>Upcoming Lessons</h2></center>
            <Button type="button" className="mb-2" onClick={() => history.push("/schedule-lesson")}>Add New Lesson</Button>{" "}
            <Button type="button" className="mb-2" onClick={() => history.push("/cancel-lesson")}>Cancel Lesson</Button>{" "}  
            {(getEmail() === "toinfinityandbeyond.orbital@gmail.com") &&<Button type="button" className="mb-2" onClick={() => history.push("/set-slot")}>Update Lesson Slots</Button>}
            {nextWeekLessons && thisWeekLessons && <ScheduleTable user={getEmail()} nextWeek={nextWeekLessons} thisWeek={thisWeekLessons}/>}
          </Card.Body>
        </Card>
      </Container>  
    </div>
  )  
}


function ScheduleTable(props) {
  let allLesson = (props.thisWeek).concat(props.nextWeek)
  
  //order lessons by nearest to furthest date
  allLesson.sort((a,b) => a.date >= b.date ? 1 : -1)

  //order lessons by time and filter based on user
  if (allLesson.length !== 0) {
    allLesson = orderByTime(allLesson)
    if (props.user !== "toinfinityandbeyond.orbital@gmail.com") {
      allLesson = allLesson.filter((lesson) => lesson.tutor === props.user)
    }
  }

  window.localStorage.setItem("lessons", JSON.stringify(JSON.stringify(allLesson)))

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Tutee</th>
          <th>Tutor</th>
        </tr>
      </thead>
      <tbody>
      {allLesson && allLesson.map((details, index) => (
        (details.date >= today) &&
        <tr key={index}>
          <td>{moment(details.date).format("dddd, D MMMM YYYY")}</td>
          <td>{details.startTime + " - " + details.endTime}</td>
          <td>{details.tutee}</td>
          <td>{details.tutor}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  )
}
