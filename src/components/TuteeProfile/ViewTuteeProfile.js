import React, { useRef, useState } from "react"
import { Card, Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap"
import { useGetTutee } from "../../hooks/useGetData"
import { useHistory } from "react-router-dom"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import TuteeProfileRecord from "./TuteeProfileRecord"
import "./TuteeProfile.css"

export default function ViewTuteeProfile() {
  const history = useHistory()
  const nameRef = useRef()

  const [tuteeNames] = useGetTutee()

  const [ tutee, setTutee ] = useState("")

  function handleSubmit() {
    setTutee(nameRef.current.value)
  }

  return (
    <>
      <NavigationBar />
      <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
        <Container className="contents-tutee-profile">
          <Row>
            <Col md={5}>
              <Card className="card-tutee-profile">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                  <h2 className="text-center mb-1">Search Tutee Profile</h2>
                  <p className="text-center mb-4">Select a tutee to view/update profile.</p>
                  <Form className="mb-4">
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control as="select" ref={nameRef}>
                        {tuteeNames.map((n) => <option key={n.value} value={n.name}>{n.name}</option>)}
                      </Form.Control>
                    </Form.Group>
                    <Button variant="secondary" type="button" onClick={handleSubmit}>Search</Button>
                  </Form>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <Button variant="secondary" type="button" onClick={() => history.push("/create-tutee-profile")}>Create New Tutee Profile</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col>
              {tutee && <TuteeProfileRecord tutee={tutee} />}
            </Col>
          </Row>
        </Container>
        <Footer />
      </Container>
    </>
  );
};
