import React, { useState, useRef } from 'react'
import { db } from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"
import { Form, Button, Alert, Row, Col, Tabs, Tab } from "react-bootstrap"
import { useGetSelectedSlots, useGetCurrUserName, useGetTutor } from "../../hooks/useGetData"
import moment from "moment"

export default function TutorSelectSlot(props) {
  const { tutee, dateRange } = props
  const { getEmail } = useAuth()
  const user = useGetCurrUserName()
  const tutors = useGetTutor()

  function SelectSlotForm() {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    const tutorRef = useRef("")
    const dateRef = useRef()
    const startTimeRef = useRef()
    const endTimeRef = useRef()

    const slots = useGetSelectedSlots(tutee, dateRange)
    const [lesson, setLesson] = useState()
    const [tab, setTab] = useState("")

    function handleSubmit(event) {
      event.preventDefault();
        
      try {
        setError("")
        setMessage("")
        setLoading(true)

        let selectedDate = ""
        let selectedStartTime = ""
        let selectedEndTime = ""

        if (tab === "availability") {
          selectedDate = lesson.date
          selectedStartTime = lesson.startTime
          selectedEndTime = lesson.endTime
        } else if (tab === "custom") {
          selectedDate = dateRef.current.value
          selectedStartTime = startTimeRef.current.value
          selectedEndTime = endTimeRef.current.value 
        }

        db.collection("Schedule")
        .doc("ScheduledLesson")
        .collection(dateRange)
        .add({
          tutee: tutee,
          tutor: tutorRef.current.value || user,
          date: selectedDate,
          startTime: selectedStartTime,
          endTime: selectedEndTime
        })

        setMessage("Successfully scheduled lesson.")
      } catch (e) {
        console.log(e.message)
        setError("Failed to schedule lesson.")
      }
      setLoading(false)
    }
    

    return (
      <>
      <hr style={{borderTop: "3px black solid"}} />
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label><strong>Select a lesson slot</strong></Form.Label>
        </Form.Group>
        <Tabs className="mb-3" activeKey={tab} onSelect={(key) => setTab(key)}>
          <Tab eventKey="availability" title="Based on Tutee's Availability">
            {slots  
              ? <Form.Group className="mb-4">  
                <Form.Label>Below are the lesson timings selected by tutee</Form.Label>
                <Form.Control as="select" htmlSize={3}>
                  {slots && slots.map((slot, index) => 
                    <option key={index} value={slot} onClick={() => setLesson(slot)}>{moment(slot.date).format("D MMMM YYYY") + ", " + slot.startTime + " - " + slot.endTime}</option>)}
                </Form.Control>
              </Form.Group>
              : <Alert variant="info">Tutee has not submitted availability.</Alert>}
          </Tab>
          <Tab eventKey="custom" title="Custom">
            <Form.Group className="mb-3">
              <Form.Label>Note: Please confirm with tutee before scheduling lesson</Form.Label><br/>
              <Row>
                <Col>
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" ref={dateRef}/>
                </Col>
                <Col>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control type="time" ref={startTimeRef}/>
                </Col>
                <Col>
                  <Form.Label>End Time</Form.Label>
                  <Form.Control type="time" ref={endTimeRef}/>
                </Col>
              </Row>
            </Form.Group><br/>
          </Tab>
        </Tabs> 
        {(getEmail() === "toinfinityandbeyond.orbital@gmail.com") && <Form.Group className="mb-4">
          <Form.Label><strong>Tutor</strong></Form.Label>
          <Form.Control as="select" ref={tutorRef} required>
            <option disabled={true}>Select...</option>
            {tutors.map((name, index) => <option key={index} value={name}>{name}</option>)}
          </Form.Control>
        </Form.Group>}
        <Button disabled={loading} type="submit">Confirm</Button>
      </Form>
      </>
    )
  }
 
  return <>{tutors && user && <SelectSlotForm />}</>
}
