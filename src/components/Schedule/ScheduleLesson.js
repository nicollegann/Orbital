import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useGetTutee } from "../../hooks/useGetData"
import { nextWeek } from "./Date"
import TutorSelectSlot from './TutorSelectSlot'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Typography } from "@material-ui/core"
import NavigationBar from "../NavigationBar"
import Footer from "../Footer/Footer"


const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(18),
  },
  card: {
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: 30,
    marginLeft: 30,
  },
  formControl: {
    minWidth: 250,
    textAlign: "left",
    marginBottom: theme.spacing(4)
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    position: "relative",
    top: "12px",
  },
  link: {
    marginTop: theme.spacing(2),
  }
}));

const StyledLink = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.dark,
  },
}))(Typography)


export default function TutorSchedule() {
  const classes = useStyles()
  
  const [tuteeNames] = useGetTutee()
  const [tutee, setTutee] = useState("")

  return (
    <Grid className="styling bg4">
      <Grid item xs={12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <CardContent>
            <center><h2 className="text-center bottomBorder" style={{width: "30%"}}>Schedule Lesson</h2></center>
          </CardContent>
          <CardContent className={classes.cardcontent}>
            <form>
            <FormControl className={classes.formControl}>
                <InputLabel shrink id="tutee-name-label">Tutee</InputLabel>
                <Select
                  labelId="tutee-name-label"
                  id="tutee-name"
                  value={tutee}
                  onChange={(e) => setTutee(e.target.value)}
                  displayEmpty
                  className={classes.selectEmpty}
                  required
                >
                  <MenuItem key="select" value="">Select...</MenuItem>
                  {tuteeNames.map((n) => <MenuItem key={n.key} value={n.value}>{n.value}</MenuItem>)}
                </Select>
              </FormControl>
            </form>
            {tutee && <TutorSelectSlot tutee={tutee} dateRange={nextWeek}/>}
          </CardContent>
        </Card>
        <Grid container justifyContent="center" className={classes.link}>
          <Link to="/view-upcoming-lesson" style={{textDecoration: "none"}}>
            <StyledLink variant="button" align="center" style={{textDecoration: "underline"}}>Back to View Upcoming Lessons</StyledLink>
          </Link>
        </Grid>
      </Grid>
      <Footer/>
    </Grid>
  );
}