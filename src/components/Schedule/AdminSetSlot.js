import React, { useState, useRef } from "react"
import { Form, Button, Card, Container, Alert, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { db } from "../../firebase"
import { useGetTuteeCode, useGetLessonOptions } from "../../hooks/useGetData"
import NavigationBar from "../NavigationBar"
import { nextWeekDash, orderByTime } from "./Date"
import moment from "moment"

export default function AdminSetSlot() { 
  const [disabled, setDisabled] = useState(true)
  const codeRef = useRef()
  
  const currentCode = useGetTuteeCode()
  const nextWeekSlots = useGetLessonOptions(nextWeekDash)
  
  function handleSetCode(event) {
    event.preventDefault()
    
    if (disabled) {
      setDisabled(false)
    } else {
      db.collection("Schedule")
        .doc("VerificationCode")
        .set({
          code: codeRef.current.value
        })
      setDisabled(true)  
    }
  }
    
  return (
      <div className="bg5 styling">
      <NavigationBar />
      <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "0", paddingBottom: "30%"}}>
        <Card className="justify-content-md-center" style={{width: "70rem", margin: "5% auto 1%"}}>
          {nextWeekSlots && <AvailableSlots nextWeekSlots={nextWeekSlots}/>}
          <Card.Body className="mt-3 mb-3" style={{width: "50%"}}>
            <Form onSubmit={handleSetCode}>
              <Form.Group className="mb-3">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control type="text" ref={codeRef} defaultValue={currentCode} disabled={disabled}/>
              </Form.Group>
              <Button type="submit">{disabled ? "Change" : "Update"}</Button>
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



function AvailableSlots(props) {
  const currentSlots = props.nextWeekSlots
  const orderedSlots = orderByTime(currentSlots)
  const [lessons, setLessons] = useState(orderedSlots)

  const dateRef = useRef()
  const startTimeRef = useRef()
  const endTimeRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [checkedState, setCheckedState] = useState(
    new Array(lessons.length).fill(false))
  const [selectedSlots, setSelectedSlots] = useState([])


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


  const handleDelete = (event) => {
    event.preventDefault()
    
    if (selectedSlots.length > 0) {

    //delete lesson option from firestore
    selectedSlots.map((option) => 
      db.collection("Schedule")
        .doc("LessonOptions")
        .collection(nextWeekDash)
        .where("date", "==", option.date)
        .where("startTime", "==", option.startTime)
        .where("endTime", "==", option.endTime)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach(doc => doc.ref.delete())
        })
    )

    //delete lesson option from displayed table
    var newLessons = []
    checkedState.map((bool, index) => 
      !bool && newLessons.push(lessons[index])
    )
    setLessons(newLessons)
    setCheckedState(new Array(newLessons.length).fill(false))
    }
  }


  function handleAdd(event) {
    event.preventDefault()
    //const duration = startTimeRef.current.value + " - " + endTimeRef.current.value
      
    try { 
      setError("")
      setLoading(true) 
      
      //add lesson option to firestore
      db.collection("Schedule")
        .doc("LessonOptions")
        .collection(nextWeekDash)
        .add({
          date: dateRef.current.value,
          startTime: startTimeRef.current.value,
          endTime: endTimeRef.current.value
        })

      //add lesson option to displayed table
      lessons.push({date: dateRef.current.value, startTime: startTimeRef.current.value, endTime: endTimeRef.current.value})  
      setCheckedState(new Array(lessons.length).fill(false))

    } catch (e) {
      console.log(e.message)
      setError("Failed to add lesson slot.")
    }
    setLoading(false)
  }


  return (
    <>
    <Card.Body>
      <center><h2 className="text-center bottomBorder" style={{width: "75%", marginBottom: "1%"}}>Edit Lesson Slots</h2></center>
      <em><p className="text-center mb-4">Lesson slots for <em>{nextWeekDash}</em>.</p></em>
      <Form onSubmit={handleDelete}>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Select Slot(s) to Delete</th>
            </tr>
          </thead>
          <tbody>
            {lessons && lessons.map((option, index) => (
              <tr key={index}>
                <td>{moment(option.date).format("D MMMM YYYY")}</td>
                <td>{option.startTime + " - " + option.endTime}</td>
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
    <Card.Body style={{width: "50%"}}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleAdd}>
        <Form.Label><strong>Add New Lesson Slot</strong></Form.Label>
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
    </>
  )
}
