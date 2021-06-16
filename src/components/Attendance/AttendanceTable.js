import React from "react"
import { Table, Container } from "react-bootstrap"
import { useGetAttendance } from "../../hooks/useGetData"

export default function AttendanceTable(props) {
  const { date, name } = props

  const [rows] = useGetAttendance(date, name)
  
  return (
    <>
      <Container>
      <h4>Marked Attendance</h4>
      {rows.length > 0 ? (
        <AttendanceList rows={rows} />
      ) : (
        <p>No attendance record found for {date}.</p>
      )}
      </Container>
    </>
  )
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
            <td>{row.date}</td>
            <td>{row.time}</td>
            <td>{row.name}</td>
            <td>{row.attendance}</td>
            <td>{row.markedBy}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}