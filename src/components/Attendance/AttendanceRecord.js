import React, { useState } from "react"
import { db } from "../../firebase"
import { useGetRecord } from "../../hooks/useGetData"
import { CSVLink } from "react-csv"
import { today } from "../Schedule/Date"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import "../TutorManager.css"

const useStyles = makeStyles({
  grid: {
    marginTop: 30,
  },
  table: {
    minWidth: 700,
  },
  csv: {
    marginTop: 20,
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default function AttendanceRecord(props) {
  const { date, tutee } = props
  const classes = useStyles();

  function AttendanceTable() {
    const [record] = useGetRecord(date, tutee, "Attendance")
    
    return (
    <Grid className={classes.grid}>
      {record.length > 0 ? (
        <AttendanceList record={record} />
      ) : (
        ((date && (tutee !== "ALL")) && <Alert severity="info" className={classes.alert}>No attendance record found for {tutee} on {date}</Alert>)
        ||
        (date && <Alert severity="info" className={classes.alert}>No attendance record found on {date}</Alert>)
        ||
        (tutee === "ALL" && <Alert severity="error" className={classes.alert}>Please select date/name </Alert>)
        ||
        (tutee !== "ALL" && <Alert severity="info" className={classes.alert}>No attendance record found for {tutee}</Alert>)
        ||
        <Alert severity="error" className={classes.alert}>No attendance record found</Alert>
      )}
    </Grid>
    )
  }

  return <AttendanceTable/>
} 

function AttendanceList(props) {
  const classes = useStyles();
  const [rows, setRows] = useState(props.record)

  const headers = [
    { label: "No.", key: "no." },
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
    { label: "Name", key: "name" },
    { label: "Attendance", key: "attendance" },
    { label: "Marked By", key: "tutor" },
    { label: "Delete", key: "delete" }
  ]

  function handleDelete(index, row) {
    //delete attendance from firebase
    db.collection("Attendance")
      .doc(row.date)
      .collection(row.date)
      .where("name", "==", row.name)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc => doc.ref.delete())
    })
    db.collection("TuteeProfile")
      .doc(row.name)
      .collection("Attendance")
      .where("date", "==", row.date)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc => doc.ref.delete())
    })
    
    //delete lesson from displayed table
    let newRows = []
    rows.map(row => (rows.indexOf(row) !== index) && newRows.push(row))
    setRows(newRows)
  }

  return (
    <>
    {rows && rows.length > 0 &&
    <TableContainer>
    <Table className={classes.table}>
      <TableHead>
      <StyledTableRow>
          {headers.map(header => <StyledTableCell key={header.key} align="left">{header.label}</StyledTableCell>)}
      </StyledTableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell align="left">{index + 1}</StyledTableCell>
            <StyledTableCell align="left">{row.date}</StyledTableCell>
            <StyledTableCell align="left">{row.time}</StyledTableCell>
            <StyledTableCell align="left">{row.name}</StyledTableCell>
            <StyledTableCell align="left">{row.attendance}</StyledTableCell>
            <StyledTableCell align="left">{row.tutor}</StyledTableCell>
            <StyledTableCell align="left">
              <IconButton disabled={row.date !== today} onClick={() => handleDelete(index, row)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
    <CSVLink 
      headers ={headers.slice(1, 6)}
      filename="TutorManager_Attendance_Records.csv"
      data={rows}
      style={{textDecoration: "none"}}
    >
      <Button variant="contained" color="secondary" size="small" className={classes.csv}>Export to CSV</Button>
    </CSVLink>
    </TableContainer>}
    </>
  )
}