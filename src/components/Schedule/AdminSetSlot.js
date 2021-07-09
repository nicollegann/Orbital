import React, { useState, useRef } from "react"
import { Form, Button, Card, Container, Alert, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { db } from "../../firebase"
import { useGetTuteeCode, useGetLessonOptions } from "../../hooks/useGetData"
import NavigationBar from "../NavigationBar"
import { nextWeekDash, thisWeekDash } from "./DateRange"

export default function AdminSetSlot() {
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)  
  
  const dateRef = useRef()
  const startTimeRef = useRef()
  const endTimeRef = useRef()
  const codeRef = useRef()
  const currentCode = useGetTuteeCode()
  
  const thisWeekOptions = useGetLessonOptions(thisWeekDash)
  const nextWeekOptions = useGetLessonOptions(nextWeekDash)
  
    
  function handleSubmit(event) {
    event.preventDefault()
    const duration = startTimeRef.current.value + " - " + endTimeRef.current.value
      
    try { 
      setError("")
      setMessage("")
      setLoading(true) 
       
      db.collection("Schedule")
        .doc("LessonOptions")
        .collection(nextWeekDash)
        .add({
          date: dateRef.current.value,
          time: duration
        })
      setMessage("Successfully added lesson slot.")
    } catch (e) {
      console.log(e.message)
      setError("Failed to add lesson slot.")
    }
    setLoading(false)
  }

  function handleSetCode(event) {
    event.preventDefault()
    
    db.collection("Schedule")
      .doc("VerificationCode")
      .set({
        code: codeRef.current.value
      })
  }
    
    return (
        <div className="bg5 styling">
        <NavigationBar />
        <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "0", paddingBottom: "30%"}}>
          <Card className="justify-content-md-center" style={{width: "70rem", margin: "5% auto 1%"}}>
            <Card.Body>
              <center><h2 className="text-center bottomBorder" style={{width: "75%", marginBottom: "2%"}}>Edit Lesson Options</h2></center>
              {nextWeekOptions && thisWeekOptions && <AvailableOptions nextWeekOptions={nextWeekOptions} thisWeekOptions={thisWeekOptions}/>}
            </Card.Body>
            <Card.Body style={{width: "50%"}}>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" ref={dateRef}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control type="time" ref={startTimeRef}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control type="time" ref={endTimeRef}/>
                </Form.Group>
                <Button disabled={loading} type="submit">Add</Button>
              </Form>
            </Card.Body>
            <Card.Body className="mt-3 mb-3" style={{width: "50%"}}>
              <Form onSubmit={handleSetCode}>
                <Form.Group className="mb-3">
                  <Form.Label>Verification Code</Form.Label>
                  <Form.Control type="text" ref={codeRef} defaultValue={currentCode}/>
                </Form.Group>
                <Button disabled={loading} type="submit">Update</Button>
              </Form> 
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/view-upcoming-lesson">Back to View Upcoming Lessons</Link>
          </div>
        </Container>
      </div>
    );
}



function AvailableOptions(props) {
  const currentOptions = (props.thisWeekOptions).concat(props.nextWeekOptions)
  const [lessons, setLessons] = useState(currentOptions)
  

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
    
    //delete lesson option from firestore
    selectedSlots.map((option) => {
      db.collection("Schedule")
        .doc("LessonOptions")
        .collection(thisWeekDash)
        .where("date", "==", option.date)
        .where("time", "==", option.time)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach(doc => doc.ref.delete())
        })
      return db.collection("Schedule")
        .doc("LessonOptions")
        .collection(nextWeekDash)
        .where("date", "==", option.date)
        .where("time", "==", option.time)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach(doc => doc.ref.delete())
        })
      }
    )

    //delete lesson option from displayed table
    var newLessons = []
    checkedState.map((bool, index) => 
      !bool && newLessons.push(lessons[index])
    )
    setLessons(newLessons)
    setCheckedState(new Array(newLessons.length).fill(false))
  }


  return (
    <Form onSubmit={handleSubmit}>
    <Table striped bordered>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {lessons && lessons.map((option, index) => (
          <tr key={index}>
            <td>{option.date}</td>
            <td>{option.time}</td>
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
  )
}
