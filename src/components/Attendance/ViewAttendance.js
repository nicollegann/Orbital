import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Form, Card } from "react-bootstrap"
import NavigationBar from "../NavigationBar"
import AttendanceTable from "./AttendanceTable"

export default function ViewAttendance() {
  const history = useHistory()
  const dateRef = useRef()

  const today = new Date()
  const month = today.getMonth() + 1 
  const day = today.getDate()
  const todayDate = today.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day)
  const [ date, setDate ] = useState()

  useEffect(() => {
    const selectedDate = window.localStorage.getItem("selectedDate")
    setDate(selectedDate ?? todayDate)
  }, [todayDate])

  return (
    <>
      <NavigationBar />
      <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
      <Form>
        <Form.Group id="date" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" defaultValue={date} ref={dateRef}/>
        </Form.Group>
        <Button onClick={() => {
                  setDate(dateRef)
                  window.localStorage.setItem("selectedDate", dateRef.current.value)
                }}
                className="w-100" 
                type="submit"
        >
        Search
        </Button> 
      </Form>
      <br/>
      <Button onClick={ () => history.push("/mark-attendance") }>Mark Attendance</Button>
      </Card>
      {date && <AttendanceTable date={date}/>}
    </>
  )
} 