import React from "react"
import { CSVLink } from "react-csv"
import { Table, Card, Button } from "react-bootstrap"
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

  const headers = [
    { label: "No.", key: "no." },
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
    { label: "Name", key: "name" },
    { label: "Attendance", key: "attendance" },
    { label: "Marked By", key: "tutor" }
  ]

  return (
    <>
    <Table striped bordered>
      <thead>
        <tr>
          {headers.map(header => <th>{header.label}</th>)}
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
            <td>{row.tutor}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <CSVLink 
      headers ={headers.slice(1)}
      filename="TutorManager_Attendance_Records.csv"
      data={rows}
    >
    <Button>Export to CSV</Button>
    </CSVLink>    
    </>
  )
}