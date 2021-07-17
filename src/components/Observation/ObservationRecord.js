import React, { useState } from "react"
import { db } from "../../firebase"
import { useGetRecord } from "../../hooks/useGetData"
import { today } from "../Schedule/Date"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, Accordion, AccordionDetails, IconButton } from "@material-ui/core"
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
import "../TutorManager.css"


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    marginBottom: 10,
  },
  accordion: {
    height: "80%",
    marginTop: 5,
  },
  accordiondetails: {
    textAlign: "left",
    height: '50%',
    marginRight: 5,
  },
  delete: {
    position: "relative",
    bottom: 13
  }
}));

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    minHeight: 50,
    '&$expanded': {
      minHeight: 50,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);


export default function ObservationRecord(props) {
  const { date, tutee } = props
  const classes = useStyles();

  function ObservationTable() {
    const [record] = useGetRecord(date, tutee, "Observation")

    return (
      <Grid className={classes.grid}>
        {record.length > 0 ? (
          <ObservationList record={record} />
        ) : (
          ((date && (tutee !== "ALL")) && <Alert severity="info" className={classes.alert}>No observation record found for {tutee} on {date}</Alert>)
          ||
          (date && <Alert severity="info" className={classes.alert}>No observation record found on {date}</Alert>)
          ||
          (tutee === "ALL" && <Alert severity="error" className={classes.alert}>Please select date/name </Alert>)
          ||
          (tutee !== "ALL" && <Alert severity="info" className={classes.alert}>No observation record found for {tutee}</Alert>)
          ||
          <Alert severity="error" className={classes.alert}>No observation record found</Alert>
        )}
      </Grid>
    ) 
  }
  return <ObservationTable />
} 

function ObservationList(props) {
  const classes = useStyles();
  const [rows, setRows] = useState(props.record)
  
  function handleDelete(index, row) {
    //delete attendance from firebase
    db.collection("Observation")
      .doc(row.date)
      .collection(row.date)
      .where("name", "==", row.name)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc => doc.ref.delete())
    })
    db.collection("TuteeProfile")
      .doc(row.name)
      .collection("Observation")
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
    <div className={classes.root}> 
      {rows.map((row, index) => (
       
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container spacing={4}>
              <Grid item><Typography className={classes.heading}>{row.name}</Typography></Grid>
              <Grid item><Typography className={classes.heading}>{row.date}</Typography></Grid>     
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.accordion}>
            <Typography className={classes.accordiondetails}>Comments:</Typography>
            <Typography className={classes.accordiondetails}>{row.comment}</Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography className={classes.accordiondetails}>Tutor:</Typography>
            <Grid container justifyContent="space-between">
              <Typography>{row.tutor}</Typography>
              {row.date === today && 
              <IconButton aria-label="delete" className={classes.delete} onClick={() => handleDelete(index, row)}>
                <DeleteIcon />
              </IconButton>}
            </Grid>
          </AccordionDetails>
        </Accordion>
       
      ))}
    </div>
  )
}