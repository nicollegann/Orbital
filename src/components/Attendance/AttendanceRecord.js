import React from "react"
import { Table, Card } from "react-bootstrap"
import { useGetRecord } from "../../hooks/useGetData"
import "../TutorManager.css"

export default function AttendanceRecord(props) {
  const { date, tutee } = props

  function AttendanceTable() {
    const [rows] = useGetRecord(date, tutee, "Attendance")
    
    return (
    <Card>
      <Card.Body>
      <center><h3 className="mb-4 bottomBorder" style={{width: "19%"}}>Attendance Record</h3></center>
      {rows.length > 0 ? (
        <AttendanceList rows={rows} />
      ) : (
        ((date && (tutee !== "ALL")) && <p>No attendance record found for {tutee} on {date}</p>)
        ||
        (date && <p>No attendance record found on {date}</p>)
        ||
        (tutee === "ALL" && <p>Please select date/name </p>)
        ||
        <p>No attendance record found</p>
      )}
      </Card.Body>
    </Card>
    )
  }

  return <AttendanceTable/>
} 

function AttendanceList(props) {
  const { rows } = props

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Time</th>
          <th>Name</th>
          <th>Attendance</th>
          <th>Marked by</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row.value.date}</td>
            <td>{row.value.time}</td>
            <td>{row.value.name}</td>
            <td>{row.value.attendance}</td>
            <td>{row.value.tutor}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}