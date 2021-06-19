import React, { useState, useRef, useEffect } from "react"
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import ObservationTable from "./ObservationTable"
import { useGetTutee, useGetCurrUserName } from "../../hooks/useGetData"
import "./Observation.css"

export default function ViewObservation() {
  const dateRef = useRef()
  const nameRef = useRef()

  const [tuteeNames] = useGetTutee()
  const currName = useGetCurrUserName()

  const [ date, setDate ] = useState()
  const [ name, setName ] = useState()
  const [ tutor, setTutor ] = useState()
  
  useEffect(() => {
    const selectedDate = window.localStorage.getItem("selectedDate")
    setDate(selectedDate)
    const selectedName = window.localStorage.getItem("selectedName")
    setName(selectedName ?? "")
    const selectedTutor = window.localStorage.getItem("selectedTutor")
    setTutor(selectedTutor)
  }, [])

  return (
    <>
      <NavigationBar />
      <Container fluid className="bg-observation" style={{paddingLeft: "0", paddingRight: "0"}}>
        <Container className="contents-observation">
          <Card className="card-view-observation">
            <Card.Body>
            <h2 className="text-center mb-4">View Records</h2>
            <Form>
              <Row className="mb-4">
                <Form.Group as={Col} controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" defaultValue={date} ref={dateRef}/>
                </Form.Group>

                <Form.Group as={Col} controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control as="select" ref={nameRef}>
                    {tuteeNames.map((n) => <option key={n.value} value={n.name}>{n.name}</option>)}
                  </Form.Control>
                </Form.Group>
              </Row>
              <Button onClick={() => {
                        window.localStorage.setItem("selectedDate", dateRef.current.value)
                        window.localStorage.setItem("selectedName", nameRef.current.value)
                        window.localStorage.setItem("selectedTutor", currName)
                      }}
                      variant="secondary" 
                      type="submit"
              >
              Search
              </Button> 
            </Form>
            </Card.Body>
          </Card>
          {(date || name) && <ObservationTable date={date} tutee={name} tutor={tutor}/>}
        </Container>
        <Footer />
      </Container>
    </>
  ) 
} 