import React, { useState } from 'react'
import { db } from "../../firebase"
import { Link } from "react-router-dom"
import { nextWeekDash, thisWeekDash } from "./DateRange"
import { Container, Card, Table, Form, Button } from "react-bootstrap"
import NavigationBar from "../NavigationBar"

export default function CancelLesson() { 
 
  var retrieveData = JSON.parse(JSON.parse(window.localStorage.getItem("lessons")))
  const [lessons, setLessons] = useState(retrieveData)
    
  const [checkedState, setCheckedState] = useState(
    new Array(lessons.length).fill(false))
  const [selectedSlots, setSelectedSlots] = useState()

  const handleCheckbox = (position) => {
    const updatedCheckedState = checkedState.map((bool, index) =>
      index === position ? !bool : bool
    );

    setCheckedState(updatedCheckedState);

    const arr = []
    updatedCheckedState.map((bool, index) => 
      bool && arr.push(lessons[index])
    )
    setSelectedSlots(arr)
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    
    //delete lesson from firestore
    selectedSlots.map((details) => {
      db.collection("Schedule")
        .doc("ScheduledLesson")
        .collection(thisWeekDash)
        .where("tutee", "==", details.tutee)
        .where("date", "==", details.date)
        .where("time", "==", details.time)
        .where("tutor", "==", details.tutor)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach(doc => doc.ref.delete())
        })
      return (
      db.collection("Schedule")
        .doc("ScheduledLesson")
        .collection(nextWeekDash)
        .where("tutee", "==", details.tutee)
        .where("date", "==", details.date)
        .where("time", "==", details.time)
        .where("tutor", "==", details.tutor)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach(doc => doc.ref.delete())
        })   
      )}     
    )

    //delete lesson from displayed table
    var newLessons = []
    checkedState.map((bool, index) => 
      !bool && newLessons.push(lessons[index])
    )
    setLessons(newLessons)
    setCheckedState(new Array(newLessons.length).fill(false))
    window.localStorage.setItem("lessons", JSON.stringify(JSON.stringify(newLessons)))
  }


  return (
    <div className="bg5 styling">
      <NavigationBar/>
      <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "0", paddingBottom: "30%"}}>
        <Card className="justify-content-md-center" style={{width: "70rem", margin: "5% auto 1%"}}>
          <Card.Body>
            <center><h2 className="text-center bottomBorder" style={{width: "30%", marginBottom: "2%"}}>Cancel Lesson</h2></center>
            <Form onSubmit={handleSubmit}>
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
                {lessons && lessons.map((details, index) => (
                <tr key={index}>
                  <td>{details.date}</td>
                  <td>{details.time}</td>
                  <td>{details.tutee}</td>
                  <td>{details.tutor}</td>
                  <td>
                    <Form.Check 
                      type="checkbox"
                      id={index}
                      checked={checkedState[index]}
                      onChange={() => handleCheckbox(index)}
                    />
                  </td>
                </tr>
                ))}
              </tbody>
            </Table>
            <Button type="submit">Delete</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to="/view-upcoming-lesson">Back to View Upcoming Lessons</Link>
        </div>    
      </Container>  
    </div>
  )
}
