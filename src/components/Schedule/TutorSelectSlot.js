import React, { useState, useRef } from 'react'
import { db } from "../../firebase"
import { Form, Button, Alert } from "react-bootstrap"
import { useGetSelectedSlots, useGetCurrUserName, useGetTutor } from "../../hooks/useGetData"

export default function TutorSelectSlot(props) {
  const { tutee, dateRange } = props
  const tutor = useGetCurrUserName()

  function SelectSlotForm() {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    const tutors = useGetTutor()
    const tutorRef = useRef("")

    const slots = useGetSelectedSlots(tutee, dateRange)
    const [lesson, setLesson] = useState()

    function handleSubmit(event) {
      event.preventDefault();
        
      try {
        setError("")
        setMessage("")
        setLoading(true)

        db.collection("Schedule")
        .doc("ScheduledLesson")
        .collection(dateRange)
        .add({
          tutee: tutee,
          tutor: tutorRef.current.value || tutor,
          date: lesson.date,
          time: lesson.time,
          week: dateRange
        })

        setMessage("Successfully scheduled lesson.")
      } catch (e) {
        console.log(e.message)
        setError("Failed to schedule lesson.")
      }
      setLoading(false)
    }    
    
    if (slots) {
      return (
        <>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select a lesson slot</Form.Label>
            <Form.Control as="select" htmlSize={3} required>
              {slots && slots.map((slot, index) => 
                <option key={index} value={slot} onClick={() => setLesson(slot)}>{slot.date + ", " + slot.time}</option>)}
            </Form.Control>
          </Form.Group>
          {(tutor === "Admin") && <Form.Group className="mb-4">
            <Form.Label>Tutor</Form.Label>
            <Form.Control as="select" ref={tutorRef} required>
              <option disabled={true}>Select...</option>
              {tutors.map((name, index) => <option key={index} value={name}>{name}</option>)}
            </Form.Control>
          </Form.Group>}
          <Button disabled={loading} type="submit">Confirm</Button>
        </Form>
        </>
      )
    } else {
      return <Alert variant="info">Tutee has not submitted availability.</Alert>
    }
  }
 
  return <SelectSlotForm />
}
