import React, { useRef, useState } from "react"
import { useGetTutorNamesAndEmail } from "./../hooks/useGetData"
import NavigationBar from "./NavigationBar"
import TutorProfileRecord from "./TutorProfileRecord"
import "./TutorManager.css"
import { makeStyles } from '@material-ui/core/styles'
import { Form } from "react-bootstrap"
import Button from '@material-ui/core/Button';
import { Grid, Container } from "@material-ui/core"
import { Card } from "react-bootstrap"
import SearchIcon from '@material-ui/icons/Search'
import Footer from "./Footer/Footer"
import { Alert, AlertTitle } from '@material-ui/lab'
import { useAuth } from "./../contexts/AuthContext"

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(14),
  },
  card: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(8),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "80%",
    
  },
  textfield: {
    marginBottom: theme.spacing(3),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    position: "relative",
    top: "12px",
  }
}))


export default function ViewTuteeProfile() {
  const nameRef = useRef()
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { getEmail } = useAuth()

  const tutors = useGetTutorNamesAndEmail()

  const [ tutor, setTutor ] = useState("")

  function handleSubmit() {
    setTutor(nameRef.current.value)
  }

  return (
    <div>
    <Grid className="styling bg6" style={{paddingBottom: "20%"}}>
      <Grid item xs={12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        {(getEmail() === "toinfinityandbeyond.orbital@gmail.com")
        ? <Card className={classes.card}>
          <Card.Body className={classes.cardcontent} style={{paddingTop: "2%", paddingBottom: "5%"}}>
          <center><h2 className="bottomBorder text-center" style={{width: "50%"}}>Search Tutor Profile</h2></center>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="tutor-name" className="mb-3">
                  <Form.Label><strong>Name</strong></Form.Label>
                  <Form.Control as="select" defaultValue="Select..." ref={nameRef}>
                    <option disabled={true}>Select...</option>
                    {tutors && tutors.map((n) => <option key={n.value} value={n.value}>{n.id}</option>)}
                  </Form.Control>
              </Form.Group>
              <Button 
                  variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="submit"  
                  className={classes.button}
                  startIcon={<SearchIcon/>}
              >
              Search
              </Button>
            </Form>
            </Card.Body>
            <Card.Body>
            <div>
            {tutor && <center><hr className="text-center" style={{width: "80%", height: "3px" }}></hr></center>}
            {tutor && <TutorProfileRecord tutor={tutor} />}</div>
            </Card.Body>
        </Card>
        : <Container className={classes.card}>
              <Alert severity="error" className={classes.alert}>
                <AlertTitle>Error</AlertTitle>
                You are not authorised to view this page. Please return to the dashboard.
              </Alert>
            </Container>}
      </Grid>
      <Footer/>
      </Grid>
    </div>
  );
};