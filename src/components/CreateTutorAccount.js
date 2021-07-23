import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useGetTutorCode } from "../hooks/useGetData"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, FormControl, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import "./TutorManager.css"


const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(4)
  },
  card: {
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(8),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "95%",
  },
  formControl: {
    width: "87%",
    textAlign: "left",
    marginBottom: theme.spacing(2)
  },
  input: {
    paddingBottom: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(2),
    width: "93%",
  },
}))

const StyledButton = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.secondary.dark,
   },
  },
}))(Button);


export default function CreateTutorAccount() {   
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const codeRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const correctCode = useGetTutorCode()
  const classes = useStyles()

    
  async function handleSubmit(event) {
    event.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.")
    }

    //Check if verification code is correct
    if (codeRef.current.value !== correctCode) {
      setMessage("")
      return setError("Invalid verification code. Please contact admin for assistance.")
    }

    try {
      setError("")
      setMessage("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      setMessage("Successfully created new account.")
    } catch (e) {
      setError(e.message || "Failed to create an account.")
    }
    setLoading(false)
  }

    return (
      <Grid className="styling bg7">
        <Grid item xs={12} className={classes.grid} > 
          <Card className={classes.card}>
            <CardContent className={classes.cardcontent} style={{paddingTop: "8%", paddingBottom: "5%"}}>
              <center><h2 className="bottomBorder" style={{width: "65%", marginBottom: "5%"}}>Create Tutor Account</h2></center>
              <center>{error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}</center>
              <center>{message && <Alert severity="success" className={classes.alert} onClose={() => {setMessage("")}}>{message}</Alert>}</center>
              <form onSubmit={handleSubmit}>
              <center><FormControl className={classes.formControl}>
                <TextField
                  label="Email" 
                  type="email"
                  inputRef={emailRef} 
                  InputLabelProps={{shrink: true,}}
                  fullWidth
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
                  className={classes.input}
                  variant="filled"
                  required
                />
                <TextField 
                  label="Password Confirmation" 
                  type="password"
                  inputRef={passwordConfirmRef} 
                  InputLabelProps={{shrink: true,}}
                  fullWidth
                  className={classes.input}
                  variant="filled"
                  required
                />
                <TextField 
                  label="Verification Code" 
                  type="password"
                  inputRef={codeRef} 
                  InputLabelProps={{shrink: true,}}
                  fullWidth
                  className={classes.input}
                  variant="filled"
                  style={{paddingBottom: "8%"}}
                  required
                />
                <Button 
                  disabled={loading}
                  variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="submit"  
                  className={classes.button}
                >Confirm</Button>
                </FormControl></center>
              </form>
            </CardContent>
            <Grid container justifyContent="center" alignItems="center">
              <StyledButton href="#login">Back to Login</StyledButton>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
}
