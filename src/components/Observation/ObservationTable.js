import React from "react"
import { Card, Accordion, Container, Col, Row } from "react-bootstrap"
import { useGetRecord } from "../../hooks/useGetData"

export default function ObservationTable(props) {
  const { date, name } = props

  const [rows] = useGetRecord(date, name, "Observation")
  
  return (
    <>
    <Card>
      <Card.Body>
      <h3 className="mb-4">Observation Record</h3>
      {rows.length > 0 ? (
        <ObservationRecord rows={rows} />
      ) : (
        ((date && (name !== "ALL")) && <p>No observation record found for {name} on {date}</p>)
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
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
            <Container>
              <Row> 
                <Col>
                    {row.name}
                </Col>
                <Col md={{ span: 2, offset: 6 }}>
                    {row.date}
                </Col>
              </Row>
            </Container>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index + 1}>
              <Card.Body>
                  <Row>
                      <Col md={1.5}><strong>Comments:</strong></Col>
                      <Col>
                          {row.comment}
                      </Col>
                  </Row>
              </Card.Body>
          </Accordion.Collapse>
      </Card>
      ))}
    </Accordion>
    </>
  )
}