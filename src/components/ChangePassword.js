import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Button, Grid, Card, CardContent, TextField, Typography } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert'
import NavigationBar from "./NavigationBar"
import Footer from "./Footer/Footer"
import "./TutorManager.css"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",
    top: "12px",
  }
}))

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
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  typography: {
    marginBottom: theme.spacing(4),
    textAlign: "left",
    fontSize: 15
  },
  textfield: {
    marginBottom: theme.spacing(3),
    minWidth: 300
  },
  button: {
    marginTop: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(2)
  }
}))

const StyledLink = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.dark,
  },
}))(Typography)


export default function ChangePassword() {   
  const classes = useStyles()
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  
  function handleSubmit(event) {
    event.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.")
    }
    
    const promises = []
    setLoading(true)
    setError("")  
    
    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value))
    }    
    
    Promise.all(promises).then(() => {
      setMessage("Successfully updated password.")
    }).catch((e) => {
      console.log(e.message)
      setError("Failed to update password.")
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Grid className="styling bg4">
      <Grid item xs={12}>
        <NavigationBar/>
      </Grid>
      <Grid item xs={12} className={classes.grid} >
        <Card className={classes.card}>
          <CardContent>
            <center><h2 className="bottomBorder" style={{width:"40%"}}>Change Password</h2></center>
          </CardContent>
          <CardContent className={classes.cardcontent}>
          {error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}
          {message && <Alert severity="success" className={classes.alert} onClose={() => {setMessage("")}}>{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField 
              className={classes.textfield}
              label="Email" 
              type="text" 
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={currentUser.email}
              inputRef={emailRef}
              fullWidth
              disabled
              required
            />
            <TextField 
              className={classes.textfield}
              label="New Password" 
              type="password" 
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={passwordRef}
              placeholder="Minimum 6 characters"
              fullWidth
              required
            />
            <TextField 
              className={classes.textfield}
              label="Re-enter New Password" 
              type="password"
              InputLabelProps={{
                shrink: true,
              }} 
              inputRef={passwordConfirmRef}
              placeholder="Minimum 6 characters"
              fullWidth
              required
            />
            <Button 
              variant="contained" 
              color="secondary"
              size="medium" 
              type="submit"  
              className={classes.button}
              disabled={loading}
            >
              Confirm
            </Button> 
          </form>
          </CardContent>
        </Card>
        <Grid container justifyContent="center">
          <Link to="/profile" style={{textDecoration: "none"}}>
            <StyledLink variant="button" align="center" style={{textDecoration: "underline"}}>Back to Profile</StyledLink>
          </Link>
        </Grid> 
      </Grid>
      <Footer/>
    </Grid>
  );
}
