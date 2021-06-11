import React, { useState, useRef, useEffect } from 'react'
import { Button, Form, Card } from "react-bootstrap"
import NavigationBar from "../NavigationBar"
import AttendanceTable from "./AttendanceTable"

export default function ViewAttendance() {
  
    const today = new Date()
    const month = today.getMonth() + 1 
    const day = today.getDate()
    const dateFormat = today.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day)
    const [ date, setDate ] = useState(dateFormat)

    const dateRef = useRef()

    const handleSearch = (event) => {
      event.preventDefault()
      const newDate = dateRef.current.value
      setDate(newDate)
    }

    useEffect(() => {
      
    })

    return (
    <>
      <NavigationBar />
      <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
      <Form onSubmit={handleSearch}>
        <Form.Group id="date" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" ref={dateRef}/>
        </Form.Group>
        <Button className="w-100" type="submit">Search</Button>
      </Form>
      </Card>
      <AttendanceTable date={date}/>
    </>
  )
}