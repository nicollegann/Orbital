import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { db } from "../../firebase"
import { useGetTuteeNames, useGetLessonOptions, useGetTuteeCode } from "../../hooks/useGetData"
import { nextWeekDash } from "./Date"
import moment from "moment"

export default function TuteeAvailability() {
  let slots = useGetLessonOptions(nextWeekDash)
  
  function Helper() {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const [tuteeNames] = useGetTuteeNames()
    const tuteeRef = useRef()
    const codeRef = useRef()
    const correctCode = useGetTuteeCode()

    const [checkedState, setCheckedState] = useState(
      new Array(slots.length).fill(false)
    )
    const [selectedSlots, setSelectedSlots] = useState()

    // handle checkboxes & update state of selectedSlots
    const handleCheckbox = (position) => {
      const updatedCheckedState = checkedState.map((bool, index) =>
        index === position ? !bool : bool
      );

      setCheckedState(updatedCheckedState);

      const arr = []
      updatedCheckedState.map((bool, index) => 
        bool && arr.push(slots[index])
      )
      setSelectedSlots(arr)
    }

    
    // submit form & save selectedSlots to firebase
    function handleSubmit(event) {
      event.preventDefault();
      
      //Check if tutee's name is valid (tutee profile exists)
      if (!tuteeNames.includes(tuteeRef.current.value)) {
        setMessage("")
        return setError("Tutee is not registered in program. Please contact admin for assistance.")
      }

      //Check if verification code is correct
      if (codeRef.current.value !== correctCode) {
        setMessage("")
        return setError("Invalid verification code.")
      }

      try {
        setError("")
        setMessage("")
        setLoading(true)

        db.collection("Schedule")
          .doc("TuteeAvailability")
          .collection(nextWeekDash)
          .doc(tuteeRef.current.value)
          .set({
            tutee: tuteeRef.current.value,
            selectedSlots: selectedSlots
          })
        setMessage("Successfully submitted form.")
      } catch (e) {
        console.log(e.message)
        setError("Failed to submit form.")
      }
      setLoading(false)
    }


    return (
      <div className="bg5 styling">
        <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "2%", paddingBottom: "10%"}}>
          <Card className="justify-content-md-center" style={{width: "50rem", margin: "3% auto 1%"}}>
            <Card.Body>
              <center><h2 className="text-center bottomBorder" style={{width: "75%"}}>Schedule Lesson</h2></center>
              <em><p className="text-center mb-4">Select your available time slots for <em>{nextWeekDash}</em>.</p></em>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="tutee-name" className="mb-4">
                  <Form.Label><strong>Full Name</strong></Form.Label>
                  <Form.Control type="text" ref={tuteeRef} required />
                </Form.Group>
                <Form.Group id="choose-slots" className="mb-4">
                  <Form.Label><strong>Select Your Available Time Slots</strong></Form.Label>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slots.map((details, index) => (
                      <tr key={index}>
                        <td>{moment(details.date).format("D MMMM YYYY")}</td>
                        <td>{details.startTime + " - " + details.endTime}</td>
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
                </Form.Group>
                <Form.Group id="verification-code" className="mb-3">
                  <Form.Label><strong>Verification Code</strong></Form.Label>
                  <Form.Control type="text" ref={codeRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Back to Login</Link>
          </div>
        </Container>
      </div>
    )
  }
  return (<>{slots && <Helper/>}</>)
}
