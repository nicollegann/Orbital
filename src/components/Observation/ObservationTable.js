import React from "react"
import { Card, Accordion, Container, Col, Row } from "react-bootstrap"
import { useGetRecord } from "../../hooks/useGetData"

export default function ObservationTable(props) {
  const { date, tutee, tutor } = props

  const [rows] = useGetRecord(date, tutee, tutor, "Observation")
  
  return (
    <>
    <Card>
      <Card.Body>
      <h3 className="mb-4">Observation Record</h3>
      {rows.length > 0 ? (
        <ObservationRecord rows={rows} />
      ) : (
        ((date && (tutee !== "ALL")) && <p>No observation record found for {tutee} on {date}</p>)
        ||
        (date && <p>No observation record found on {date}</p>)
        ||
        <p>No observation record found</p>
      )}
      </Card.Body>
      </Card>
    </>
  )
} 

function ObservationRecord(props) {
  const { rows } = props
  
  return (
    <> 
    <Accordion>
      {rows.map((row, index) => (
        <Card key={index}>
          <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
            <Container>
              <Row> 
                <Col>
                    {row.value.name}
                </Col>
                <Col md={{ span: 2, offset: 6 }}>
                    {row.value.date}
                </Col>
              </Row>
            </Container>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index + 1}>
              <Card.Body>
                  <Row style={{marginBottom: "1.5em"}}>
                      <Col md="auto"><strong>Comments:</strong></Col>
                      <Col>{row.value.comment}</Col>
                  </Row>
                  <Row>
                    <Col md="auto"><strong>Tutor:</strong></Col>
                    <Col>{row.value.tutor}</Col>
                  </Row>
              </Card.Body>
          </Accordion.Collapse>
      </Card>
      ))}
    </Accordion>
    </>
  )
}