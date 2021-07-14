import React from "react"
import { useGetFeedback } from "../../hooks/useGetData"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "../TutorManager.css"

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
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


export default function FeedbackRecord(props) {
  const { date } = props

  function FeedbackTable() {
    const [rows] = useGetFeedback(date)
    
    return (
    <>
      {rows.length > 0 ? (
        <FeedbackList rows={rows} />
      ) : (
        ((date)) && <p>No feedback record found for {date}</p>)
        ||
        <p>No feedback record found.</p>
      }
    </>
    )
  }

  return <FeedbackTable/>
} 


function FeedbackList(props) {
  const classes = useStyles();
  
  const { rows } = props

  rows.sort((row1, row2) => (row1.value.date <= row2.value.date) ? 1 : -1)

  return (
    <TableContainer>
    <Table className={classes.table}>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell align="left">No.</StyledTableCell>
          <StyledTableCell align="left">Date</StyledTableCell>
          <StyledTableCell align="left" style={{width: "20%"}}>Name</StyledTableCell>
          <StyledTableCell align="left" style={{width: "60%"}}>Feedback</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell align="left">{index + 1}</StyledTableCell>
            <StyledTableCell align="left">{row.value.date}</StyledTableCell>
            <StyledTableCell align="left" style={{width: "20%"}}>{row.value.tutor}</StyledTableCell>
            <StyledTableCell align="left" style={{width: "60%"}}>{row.value.feedback}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  )
}