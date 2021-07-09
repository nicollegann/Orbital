import React from 'react'
import { useHistory } from "react-router-dom"
import { useGetLessonDetails, useGetCurrUserName, useGetLessonOptions } from "../../hooks/useGetData" 
import { Button, Container, Table, Card } from "react-bootstrap"
import { nextWeekDash, thisWeekDash } from "./DateRange"
import NavigationBar from "../NavigationBar"


export default function ViewUpcomingLesson() {
  const history = useHistory()
  const user = useGetCurrUserName()
  
  const thisWeekOptions = useGetLessonOptions(thisWeekDash)
  const nextWeekOptions = useGetLessonOptions(nextWeekDash)

  return (
    <div className="bg5 styling">
      <NavigationBar/>
      <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "0", paddingBottom: "30%"}}>
        <Card className="justify-content-md-center" style={{width: "70rem", margin: "5% auto 1%"}}> 
          <Card.Body>
            <center><h2 className="text-center bottomBorder" style={{width: "30%", marginBottom: "2%"}}>Upcoming Lessons</h2></center>
            {user && <ScheduleTable tutor={user}/>}
          </Card.Body>
          <Card.Body>
            <Button type="button" className="mb-2" onClick={() => history.push("/schedule-lesson")}>Add New Lesson</Button>{" "}
            <Button type="button" className="mb-2" onClick={() => history.push("/cancel-lesson")}>Cancel Lesson</Button>{" "}
          </Card.Body>
        </Card>
        {(user === "Admin") && <Card className="justify-content-md-center" style={{width: "70rem", margin: "5% auto 1%"}}>
          <Card.Body>
            <center><h2 className="text-center bottomBorder" style={{width: "30%", marginBottom: "1%"}}>Time Slots For Selection</h2></center>
            <em><p className="text-center mb-4">List of available time slots for tutees to select from.</p></em>
            {nextWeekOptions && thisWeekOptions && <AvailableOptions nextWeekOptions={nextWeekOptions} thisWeekOptions={thisWeekOptions}/>}
            <Button type="button" className="mb-2" onClick={() => history.push("/set-slot")}>Edit</Button>
          </Card.Body>
        </Card>}
        </Container>  
    </div>
  )  
}


function ScheduleTable(props) {
  const nextWeek = useGetLessonDetails(props.tutor, nextWeekDash)
  const thisWeek = useGetLessonDetails(props.tutor, thisWeekDash)
  const allLesson = thisWeek.concat(nextWeek)

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
        <tr key={index}>
          <td>{details.date}</td>
          <td>{details.time}</td>
          <td>{details.tutee}</td>
          <td>{details.tutor}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  )
}

function AvailableOptions(props) {

  const lessonOptions = (props.thisWeekOptions).concat(props.nextWeekOptions)

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {lessonOptions && lessonOptions.map((options, index) => (
          <tr key={index}>
            <td>{options.date}</td>
            <td>{options.time}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}


