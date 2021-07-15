import React, { useRef, useState } from "react"
import { Card, Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap"
import { useGetTutorNamesAndEmail } from "./../hooks/useGetData"
import { useHistory } from "react-router-dom"
import NavigationBar from "./NavigationBar"
import Footer from "./Footer/Footer"
import TutorProfileRecord from "./TutorProfileRecord"
import "./TutorManager.css"

export default function ViewTuteeProfile() {
  const history = useHistory()
  const nameRef = useRef()

  const tutors = useGetTutorNamesAndEmail()

  const [ tutor, setTutor ] = useState("")

  function handleSubmit() {
    setTutor(nameRef.current.value)
  }

  // let namesToRender;
  // if (tutors) {
  //   namesToRender = tutors.map((n) => <div><option key={n.value} value={n.value}>{n.value}</option></div>)
  //   console.log(tutors)
  // }


  return (
    <div className="styling bg6">
      <NavigationBar />
      <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
        <Container className="contents-tutee-profile">
          <Row>
            <Col md={5}>
              <Card >
                <ListGroup variant="flush">
                  <ListGroup.Item>
                  <center><h2 className="text-center mb-1 bottomBorder" style={{width: "70%"}}>Search Tutor Profile</h2></center>
                  <em><p className="text-center mb-4">Select a tutor to view/update profile.</p></em>
                  <Form className="mb-4">
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control as="select" ref={nameRef}>
                        <option disabled={true}>Select...</option>
                        {tutors && tutors.map((n) => <option key={n.id} value={n.value}>{n.id}</option>)}
                      </Form.Control>
                    </Form.Group>
                      <Button variant="secondary" type="button" onClick={handleSubmit}>Search</Button>
                  </Form>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col>
              {tutor && <TutorProfileRecord tutor={tutor} />}
            </Col>
          </Row>
        </Container>
        <Footer />
      </Container>
    </div>
  );
};