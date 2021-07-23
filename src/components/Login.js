import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import "./TutorManager.css"
import { useHistory } from "react-router-dom"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, FormControl, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Alert } from '@material-ui/lab'
import "./TutorManager.css"

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: "8%",
  },
  formControl: {
    width: "80%",
    textAlign: "left",
    marginBottom: theme.spacing(2)

  },
  card: {
    width: "65%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    paddingBottom: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(2),
    width: "90%",
  },
  link: {
    marginTop: theme.spacing(1)
  }
}))

const StyledButton = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.secondary.dark,
   },
  },
}))(Button);

export default function Login() {   
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const classes = useStyles()

    
  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setError("")
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.replace("/")
    } catch {
      setError("Failed to sign in.")
    }  
      setLoading(false)
    }

  return (
    <Grid className="styling bg7">
      <Grid item xs={12} className={classes.grid} > 
        <Card className={classes.card} style={{width: "35rem"}}>
          <CardContent>
            <center><h2 className="bottomBorder" style={{marginBottom: "5%"}}>TutorManager</h2></center>
            <center>{error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}</center>
            <form onSubmit={handleSubmit}>
            <center>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Email" 
                  type="email"
                  inputRef={emailRef} 
                  InputLabelProps={{shrink: true,}}
                  fullWidth
                  size="small"
                  className={classes.input}
                  variant="filled"
                  required
                />
                <TextField 
                  label="Password" 
                  type="password"
                  inputRef={passwordRef} 
                  InputLabelProps={{shrink: true,}}
                  fullWidth
                  style={{paddingBottom: "10%"}}
                  variant="filled"
                  size="small"
                  required
                />
                <Button variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="submit" 
                  disabled={loading}
                >Login</Button>
              </FormControl>
            </center>
            </form>
            <Grid container justifyContent="center" className={classes.link}>
              <StyledButton href="#forgot-password">Forgot Password?</StyledButton>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" className={classes.link}>
              <Grid item>Need an account?</Grid>
              <Grid item><StyledButton href="#create-account">Sign Up</StyledButton></Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" className={classes.link}>
              <Grid item>Schedule your next lesson </Grid>
              <Grid item><StyledButton href="#tutee-schedule-lesson">here</StyledButton></Grid>
              <Grid item>(for tutees)</Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}


