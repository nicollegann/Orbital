import React from "react"
import { Table, Card } from "react-bootstrap"
import { useGetRecord } from "../../hooks/useGetData"

export default function AttendanceTable(props) {
  const { date, name } = props

  const [rows] = useGetRecord(date, name, "Attendance")
  
  return (
    <>
    <Card>
      <Card.Body>
      <h3 className="mb-4">Attendance Record</h3>
      {rows.length > 0 ? (
        <AttendanceList rows={rows} />
      ) : (
        ((date && (name !== "ALL")) && <p>No attendance record found for {name} on {date}</p>)
        ||
        (date && <p>No attendance record found on {date}</p>)
        ||
        <p>No attendance record found</p>
      )}
      </Card.Body>
      </Card>
    </>
  )
} 

function AttendanceList(props) {
  const { rows } = props
  console.log(rows)
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
            <td>{row.value.markedBy}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}