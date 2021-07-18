import React, { useRef, useState } from "react"
import { Form, Alert, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { db } from "../../firebase"
import { useGetTuteeNames, useGetLessonOptions, useGetTuteeCode } from "../../hooks/useGetData"
import { nextWeek } from "./Date"
import moment from "moment"
import { Button, Container, Grid } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(14),
  },
  card: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  cardcontent: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "92%",
  },
  textfield: {
    marginBottom: theme.spacing(3),
  },
  alert: {
    marginBottom: theme.spacing(3),
  },
  button: {
    position: "relative",
    top: "12px",
    left: "15px",
  },
  table: {
    minWidth: 700,
  },
}))

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

export default function TuteeAvailability() {
  let slots = useGetLessonOptions(nextWeek)
  const classes = useStyles();
  
  function Helper() {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const [tuteeNames] = useGetTuteeNames()
    const tuteeRef = useRef()
    const codeRef = useRef()
    const correctCode = useGetTuteeCode()

    const [checkedState, setCheckedState] = useState(
      new Array(slots.length).fill(false)
    )
    const [selectedSlots, setSelectedSlots] = useState()

    // handle checkboxes & update state of selectedSlots
    const handleCheckbox = (position) => {
      const updatedCheckedState = checkedState.map((bool, index) =>
        index === position ? !bool : bool
      );

      setCheckedState(updatedCheckedState);

      const arr = []
      updatedCheckedState.map((bool, index) => 
        bool && arr.push(slots[index])
      )
      setSelectedSlots(arr)
    }

    
    // submit form & save selectedSlots to firebase
    function handleSubmit(event) {
      event.preventDefault();
      
      //Check if tutee's name is valid (tutee profile exists)
      if (!tuteeNames.includes(tuteeRef.current.value)) {
        setMessage("")
        return setError("Tutee is not registered in program. Please contact admin for assistance.")
      }

      //Check if verification code is correct
      if (codeRef.current.value !== correctCode) {
        setMessage("")
        return setError("Invalid verification code.")
      }

      try {
        setError("")
        setMessage("")
        setLoading(true)

        db.collection("Schedule")
          .doc("TuteeAvailability")
          .collection(nextWeek)
          .doc(tuteeRef.current.value)
          .set({
            tutee: tuteeRef.current.value,
            selectedSlots: selectedSlots
          })
        setMessage("Successfully submitted form.")
      } catch (e) {
        console.log(e.message)
        setError("Failed to submit form.")
      }
      setLoading(false)
    }


    return (
      <Grid className="bg5 styling">
        <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "2%", paddingBottom: "15%"}}>
          <Grid xs={12} className={classes.grid} >
            <Card className={classes.card} style={{width: "50rem", margin: "3% auto 1%"}}>
            <Card.Body className={classes.cardcontent}>
            <center><h2 className="text-center bottomBorder" style={{width: "40%"}}>Schedule Lesson</h2></center>
            <em><p className="text-center mb-4">Select your available time slots for <em>{nextWeek}</em>.</p></em>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="tutee-name" className="mb-4">
                  <Form.Label><strong>Full Name</strong></Form.Label>
                  <Form.Control type="text" ref={tuteeRef} required />
                </Form.Group>
                <Form.Group id="choose-slots" className="mb-4">
                  <Form.Label><strong>Select Your Available Time Slots</strong></Form.Label>
                  {(slots.length !== 0) ? 
                  <TableContainer>
                  <Table className={classes.table}>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell align="left">Date</StyledTableCell>
                        <StyledTableCell align="left">Time</StyledTableCell>
                        <StyledTableCell align="left">Select</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    {slots.map((details, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="left">{moment(details.date).format("dddd, D MMMM YYYY")}</StyledTableCell>
                        <StyledTableCell align="left">{details.startTime + " - " + details.endTime}</StyledTableCell>
                        <StyledTableCell align="left" style={{width: "20%"}}>{<Form.Check 
                          type="checkbox"
                          id={index}
                          checked={checkedState[index]}
                          onChange={() => handleCheckbox(index)}
                        />}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                    </TableBody>
                  </Table>
                  </TableContainer>
                  : <Alert variant="info">Admin has not released lesson slots for {nextWeek}</Alert>}
                </Form.Group>
                <Form.Group id="verification-code" className="mb-3">
                  <Form.Label><strong>Verification Code</strong></Form.Label>
                  <Form.Control type="password" ref={codeRef} required />
                </Form.Group>
                <Button disabled={loading} variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="submit"  
                  className={classes.button, "w-100"}
                >Submit</Button>
            </Form>
            </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            <Button color="link" href="#login">Back to Login</Button>
           </div>
          </Grid>
        </Container>
      </Grid>
    )
  }
  return (<>{slots && <Helper/>}</>)
}
