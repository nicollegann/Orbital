import React, { useRef, useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { db } from "../../firebase"
import NavigationBar from "../NavigationBar"
import SelectSearch, { fuzzySearch } from "react-select-search"
import { useGetTutee, useGetCurrUserName } from "../../hooks/useGetData"
import "./MarkAttendance.css"
import { useHistory } from "react-router-dom"


export default function MarkAttendance() {
  const history = useHistory()
  const [tuteeNames] = useGetTutee()
  const currName = useGetCurrUserName()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const dateRef = useRef()
  const timeRef = useRef()
  const attendanceRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    console.log(tuteeNames)
    
    //save data to firestore (to 2 different collections)
    db.collection("Attendance")
      .doc(dateRef.current.value + "-" + name)
      .set({
        date: dateRef.current.value,
        time: timeRef.current.value,
        name: name,
        attendance: attendanceRef.current.value,
        markedBy: currName
      })
      .then(() => {
        setMessage("Successfully marked attendance.")
      })
      .catch(() => setError("Failed to mark attendance."))
    
    db.collection("TuteeProfile")
      .doc(name)
      .collection("Attendance")
      .doc(dateRef.current.value)
      .set({
        date: dateRef.current.value,
        time: timeRef.current.value,
        name: name,
        attendance: attendanceRef.current.value,
        markedBy: currName
      })
      .then(() => {
        setMessage("Successfully marked attendance.")
      })
      .catch(() => setError("Failed to mark attendance."))  

    setLoading(false)
  }

  return (
    <>
      <NavigationBar />
      
      <Card className="justify-content-md-center" style={{width: "35rem", margin: "3% auto 1%"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Mark Attendance</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="date" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" required ref={dateRef}/>
            </Form.Group>
            <Form.Group id="time" className="mb-3">
              <Form.Label>Lesson Time</Form.Label>
              <Form.Control type="time" ref={timeRef} required />
            </Form.Group>
            <Form.Group id="tuteeName" className="mb-3">
              <Form.Label>Tutee's Name</Form.Label>
              <SelectSearch options={tuteeNames} search filterOptions={fuzzySearch} placeholder="Select..." onChange={setName} required/>
            </Form.Group>
            <Form.Group id="attendance" className="mb-3">
              <Form.Label>Present/Absent</Form.Label>
              <Form.Control as="select" ref={attendanceRef} defaultValue="Select..." required>
                <option disabled={true}>Select...</option>
                <option>Present</option>
                <option>Absent</option>
              </Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Confirm</Button>
          </Form>
          <br/>
          <Button onClick={ () => history.push("/view-attendance") }>View Attendance Records</Button>
        </Card.Body>
      </Card>

    </> 
  )
}
