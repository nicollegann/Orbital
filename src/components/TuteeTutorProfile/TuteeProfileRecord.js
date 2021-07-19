import React, { useState } from "react"
import { db } from "../../firebase"
import { Link } from "react-router-dom"
import { useGetTuteeProfile } from "../../hooks/useGetData"
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Button, Typography, Grid } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
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
    marginTop: theme.spacing(2)
  },
}))


export default function TuteeProfileRecord(props) {
  const classes = useStyles()
  
  function TuteeProfile() {
    let details = useGetTuteeProfile(props.tutee)
    window.localStorage.setItem("profile", JSON.stringify(props.tutee))

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const currentNameList = (props.allTutees).map(tutee => tutee.value)
    
    function handleDelete(e) {
      e.preventDefault() 
      setLoading(true)

      try {
        db.collection("TuteeProfile")
          .doc(details.name)
          .get()
          .then(doc => doc.ref.delete())
  
        let newNameList = []
        currentNameList.map(tutee => (tutee !== props.tutee) && newNameList.push(tutee))
        db.collection("TuteeProfile")
          .doc("NameList")
          .set({
            names: newNameList
          })  
   
        setMessage("Successfully deleted tutee profile. Please refresh page.")
      } catch(e) {
        console.log(e.message)
        setError("Failed to delete tutee profile.")
      }
      setLoading(false)
    }


    return (<>
      {details && 
      <Paper className={classes.paper}>
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
        <Grid container spacing={3}>
        <Grid item>
        <Link to="/edit-profile" style={{textDecoration: "none"}}>
          <Button 
            variant="contained" 
            color="secondary"
            size="medium" 
            type="button"  
            startIcon={<EditIcon/>}
            className={classes.button}
          >
          Edit
          </Button>
        </Link>
        </Grid>
        <Grid item>
        <Button 
          variant="contained" 
          color="secondary"
          size="medium" 
          type="submit"  
          startIcon={<DeleteIcon/>}
          disabled={loading}
          className={classes.button}
          onClick={handleDelete}
        >
          Delete 
        </Button>
        </Grid>
        </Grid>
      </Paper>}
    </>)
  }
  
  return <TuteeProfile/>
}