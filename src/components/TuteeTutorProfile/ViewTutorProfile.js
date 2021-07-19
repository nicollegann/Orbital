import React, { useState } from "react"
import { useGetTutorNamesAndEmail } from "../../hooks/useGetData"
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import TutorProfileRecord from "./TutorProfileRecord"
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Grid, Container, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import { Alert, AlertTitle } from '@material-ui/lab'
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"
import "../TutorManager.css"


const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(14),
  },
  card: {
    width: "60%",
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
  formControl: {
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))


export default function ViewTutorProfile() {
  const classes = useStyles()
  
  const history = useHistory()  
  const { getEmail } = useAuth()

  const tutors = useGetTutorNamesAndEmail()
  const [ tutor, setTutor ] = useState("")


  return (
    <Grid className="styling bg6">
      <Grid item xs={12}>
        <NavigationBar />
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        {(getEmail() === "toinfinityandbeyond.orbital@gmail.com")
        ? <>{tutors && <Card className={classes.card}>
            <CardContent className={classes.cardcontent}>
              <center><h2 className="bottomBorder" style={{width: "40%"}}>View Tutor Profile</h2></center>
            </CardContent>
            <CardContent className={classes.cardcontent}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <form>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink id="tutee-name-label">Tutor</InputLabel>
                      <Select
                        labelId="tutor-name-label"
                        id="tutor-name"
                        value={tutor}
                        onChange={(e) => setTutor(e.target.value)}
                        displayEmpty
                        className={classes.selectEmpty}
                        required
                      >
                        <MenuItem value="">Select...</MenuItem>
                        {tutors.map((tutor, index) => tutor.id && <MenuItem key={index} value={tutor.value}>{tutor.id}</MenuItem>)}
                      </Select>
                  </FormControl>
                  </form>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    size="medium" 
                    type="button"  
                    className={classes.button}
                    onClick={() => history.push("/tutor-verification-code")}
                  >Tutor Verification Code
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            {/* {tutor && <center><hr style={{width: "80%", height: "3px" }}></hr></center>} */}
            {tutor && <TutorProfileRecord tutor={tutor} />}
          </Card>}</>
        : <Container className={classes.card}>
            <Alert severity="error" className={classes.alert}>
              <AlertTitle>Error</AlertTitle>
              You are not authorised to view this page. Please return to the dashboard.
            </Alert>
          </Container>}
      </Grid>
      <Footer/>
    </Grid>
  )
}