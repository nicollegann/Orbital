import React, { useState } from "react"
import { useGetTutee } from "../../hooks/useGetData"
import { useHistory } from "react-router-dom"
import TuteeProfileRecord from "./TuteeProfileRecord"
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Grid, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
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
  button: {
    marginTop: theme.spacing(2)
  }
}))


export default function ViewTuteeProfile() {
  const classes = useStyles()

  const history = useHistory()
  const tutees = useGetTutee()
  const [ tutee, setTutee ] = useState("")


  return (
    <Grid className="styling bg6">
      <Grid item xs={12}>
        <NavigationBar />
      </Grid>
      <Grid item xs={12} className={classes.grid} >
       {tutees && <Card className={classes.card}>
          <CardContent className={classes.cardcontent}>
            <center><h2 className="bottomBorder" style={{width: "50%"}}>View Tutee Profile</h2></center>
          </CardContent>
          <CardContent className={classes.cardcontent}>
            <Grid container justifyContent="space-between">
              <Grid item>
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
                      <MenuItem value="">Select...</MenuItem>
                      {tutees.map((tutee) => tutee && <MenuItem key={tutee} value={tutee}>{tutee}</MenuItem>)}
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
                onClick={() => history.push("/create-tutee-profile")}
              >Create Tutee Profile
              </Button>
            </Grid>
            </Grid>
          </CardContent>
          {/* {tutee && <center><hr style={{width: "80%", height: "3px" }}></hr></center>} */}
          {tutee && tutees && <TuteeProfileRecord tutee={tutee} allTutees={tutees}/>}
        </Card>}
      </Grid>
      <Footer/>
    </Grid>
  )
}

