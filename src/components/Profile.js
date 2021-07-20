import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { useGetProfile } from "../hooks/useGetData"
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import NavigationBar from "./NavigationBar"
import Footer from "./Footer/Footer"
import "./TutorManager.css"

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(9),

  },
  card: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  typography: {
    marginBottom: theme.spacing(4),
    textAlign: "left",
    fontSize: 15
  },
  button: {
    marginTop: theme.spacing(2)
  }
}))


export default function Profile() {
  const classes = useStyles()

  const { currentUser } = useAuth()
  const getUserData = useGetProfile()

  return (
    <Grid className="styling bg10">
      <Grid item xs={12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <CardContent>
            <center><h2 className="bottomBorder" style={{width: "30%"}}>My Profile</h2></center>
          </CardContent>
          <CardContent className={classes.cardcontent}> 
            <Typography variant='overline' className={classes.typography}><strong>Name:</strong> {getUserData && getUserData.name}</Typography>
            <br/>
            <Typography variant='overline' className={classes.typography}><strong>Email:</strong> {currentUser.email}</Typography>
            <br/>
            <Typography variant='overline' className={classes.typography}><strong>Contact No.:</strong> {getUserData && getUserData.contact}</Typography>
            <br/>
            <Typography variant='overline' className={classes.typography}><strong>Emergency Contact No.:</strong> {getUserData && getUserData.emergencyContact}</Typography>
            <br/>
            <Typography variant='overline' className={classes.typography}><strong>Date Of Birth:</strong> {getUserData && getUserData.dateOfBirth}</Typography>
            <br/>
            <Typography variant='overline' className={classes.typography}><strong>School:</strong> {getUserData && getUserData.school}</Typography>
            <br/>
            <Grid container spacing={4} className={classes.button}>
              <Grid item>
                <Link to="/update-profile" style={{textDecoration: "none"}}>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    size="medium" 
                    type="submit"  
                    startIcon={<EditIcon/>}
                  >
                  Edit Profile
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/change-password" style={{textDecoration: "none"}}>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    size="medium" 
                    type="submit"  
                    startIcon={<LockOpenIcon/>}
                  >
                  Change Password
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card> 
      </Grid>
      <Footer/>
    </Grid>
  )
}