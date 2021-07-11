import React from "react"
import { Table, Card } from "react-bootstrap"
import { useGetFeedback } from "./../hooks/useGetData"
import "./TutorManager.css"

export default function FeedbackRecord(props) {
  const { date } = props

  function FeedbackTable() {
    const [rows] = useGetFeedback(date, "Feedback")
    
    return (
    <Card>
      <Card.Body>
      <center><h3 className="mb-4 bottomBorder" style={{width: "19%"}}>Feedback Record</h3></center>
      {rows.length > 0 ? (
        <FeedbackList rows={rows} />
      ) : (
        ((date)) && <p>No feedback record found on {date}</p>)
        ||
        (<p>Please select date</p>)
        ||
        <p>No feedback record found</p>
      }
      </Card.Body>
    </Card>
    )
  }

  return <FeedbackTable/>
} 


function FeedbackList(props) {
  const { rows } = props

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Name</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row.value.date}</td>
            <td>{row.value.tutor}</td>
            <td>{row.value.feedback}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}