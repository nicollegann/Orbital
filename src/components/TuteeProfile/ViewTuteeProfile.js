import React, { useRef, useState } from "react"
import { Form, Container, Row, Col, ListGroup } from "react-bootstrap"
import { useGetTutee } from "../../hooks/useGetData"
import { useHistory } from "react-router-dom"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import TuteeProfileRecord from "./TuteeProfileRecord"
import "./TuteeProfile.css"
import "../TutorManager.css"
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core"
import { Card } from "react-bootstrap"
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'

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
  const history = useHistory()
  const classes = useStyles()
  const nameRef = useRef()

  const [tuteeNames] = useGetTutee()

  const [ tutee, setTutee ] = useState("")

  function handleSubmit() {
    setTutee(nameRef.current.value)
  }

  return (
    <div>
    <Grid className="styling bg6" style={{paddingBottom: "20%"}}>
      <Grid item xs={12}>
        <NavigationBar />
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <Card.Body className={classes.cardcontent} style={{paddingTop: "2%"}}>
          
                <ListGroup variant="flush">
                  <ListGroup.Item>
                  <center><h2 className="text-center mb-1 bottomBorder" style={{width: "45%"}}>Search Tutee Profile</h2></center>
                  <em><p className="text-center mb-4">Select a tutee to view/update profile.</p></em>
                  <Form className="mb-4">
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control as="select" ref={nameRef}>
                        <option disabled={true}>Select...</option>
                        {(tuteeNames.slice(1)).map((n) => <option key={n.key} value={n.value}>{n.value}</option>)}
                      </Form.Control>
                    </Form.Group>
                    <Button 
                      variant="contained" 
                      color="secondary"
                      size="medium" 
                      type="button"  
                      className={classes.button}
                      onClick={handleSubmit}
                      >Search
                    </Button>
                  </Form>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    size="medium" 
                    type="button"  
                    className={classes.button}
                    onClick={() => history.push("/create-tutee-profile")}
                    >Create New Tutee Profile
                  </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              </Card>
            <Card.Body>
              {tutee && <TuteeProfileRecord tutee={tutee} />}
            </Card.Body>
        <Footer />
      </Grid>
      </Grid>
    </div>
  );
};