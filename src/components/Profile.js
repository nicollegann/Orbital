import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { useGetProfile } from "../hooks/useGetData"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import NavigationBar from "./NavigationBar"
import Footer from "./Footer/Footer"
import "./TutorManager.css"

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(18),
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
    marginRight: 50,
    marginLeft: 50,
  },
  typography: {
    marginBottom: theme.spacing(4),
    textAlign: "left",
    fontSize: 15
  },
  button: {
    marginTop: theme.spacing(3)
  }
}))

const StyledLink = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.dark,
  },
}))(Typography)


export default function Profile() {
  const classes = useStyles()

  const { currentUser } = useAuth()
  const getUserData = useGetProfile()

  return (
    <Grid className="styling bg4">
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
        <Grid container justifyContent="center">
          <Link to="/" style={{textDecoration: "none"}}>
            <StyledLink variant="button" align="center" style={{textDecoration: "underline"}}>Back to Dashboard</StyledLink>
          </Link>
        </Grid>  
      </Grid>
      <Footer/>
    </Grid>
  )
}