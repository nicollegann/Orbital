import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Form, Card } from "react-bootstrap"
import NavigationBar from "../NavigationBar"
import AttendanceTable from "./AttendanceTable"
import { useGetTutee } from "../../hooks/useGetData"

export default function ViewAttendance() {
  const history = useHistory()
  const dateRef = useRef()
  const nameRef = useRef()

  const [tuteeNames] = useGetTutee()

  const today = new Date()
  const month = today.getMonth() + 1 
  const day = today.getDate()
  const todayDate = today.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day)
  const [ date, setDate ] = useState()
  const [ name, setName ] = useState()

  useEffect(() => {
    const selectedDate = window.localStorage.getItem("selectedDate")
    setDate(selectedDate ?? todayDate)
    const selectedName = window.localStorage.getItem("selectedName")
    setName(selectedName ?? "")
  }, [todayDate])

  return (
    <>
      <NavigationBar />
      <Card className="justify-content-md-center" style={{width: "35rem", margin: "3% auto 1%"}}>
      <Form>
        <Form.Group id="date" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" defaultValue={date} ref={dateRef}/>
        </Form.Group>
        <Form.Group id="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control as="select" defaultValue={name} ref={nameRef}>
            {tuteeNames.map((n) => <option key={n.value} value={n.name}>{n.name}</option>)}
          </Form.Control>
        </Form.Group>
        <Button onClick={() => {
                  setDate(dateRef)
                  window.localStorage.setItem("selectedDate", dateRef.current.value)
                  setName(nameRef)
                  window.localStorage.setItem("selectedName", nameRef.current.value)
                }}
                className="w-100" 
                type="submit"
        >
        Search
        </Button> 
      </Form>
      <br/>
      <Button type="button" onClick={ () => history.push("/mark-attendance") }>Mark Attendance</Button>
      </Card>
      {(date || name) && <AttendanceTable date={date} name={name}/>}
    </>
  ) 
} 