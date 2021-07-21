import React, { useState } from "react"
import { useGetTutorProfile } from "../../hooks/useGetData"
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import "../TutorManager.css"


const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(4),
  },
  textfield: {
    marginBottom: theme.spacing(4),
    minWidth: 300,
  },
  alert: {
    marginBottom: theme.spacing(2)
  },
  typography: {
    marginBottom: theme.spacing(4),
    textAlign: "left",
    fontSize: 15
  },
  button: {
    marginTop: theme.spacing(3)
  },
}))


export default function TutorProfileRecord(props) {
  const classes = useStyles()
  
  function TutorProfile() {
    let details = useGetTutorProfile(props.tutor)
    window.localStorage.setItem("profile", JSON.stringify(props.tutor))

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    return (<>
      {details && 
      <Paper variant="outlined" style={{border: "1px solid", borderColor: "#bebebe"}} className={classes.paper}>
        {error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}
        {message && <Alert severity="success" className={classes.alert} onClose={() => {setMessage("")}}>{message}</Alert>}
        <Typography variant='overline' className={classes.typography}><strong>Name:</strong> {details.name}</Typography>
        <br/>
        <Typography variant='overline' className={classes.typography}><strong>Email:</strong> {details.email}</Typography>
        <br/>
        <Typography variant='overline' className={classes.typography}><strong>Contact No.:</strong> {details.contact}</Typography>
        <br/>
        <Typography variant='overline' className={classes.typography}><strong>Emergency Contact No.:</strong> {details.emergencyContact}</Typography>
        <br/>
        <Typography variant='overline' className={classes.typography}><strong>Date Of Birth:</strong> {details.dateOfBirth}</Typography>
        <br/>
        <Typography variant='overline' className={classes.typography}><strong>School:</strong> {details.school}</Typography>
        <br/>
      </Paper>}
    </>)
  }
  
  return <TutorProfile/>
}


