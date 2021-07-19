import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import "./TutorManager.css"
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import { Card, Container, CardContent, FormControl, TextField, InputLabel } from '@material-ui/core'
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",
    top: "12px",
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: 30,
    marginLeft: 30,
  },
  input: {
    paddingBottom: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(2),
    width: "85%",
  },
}))

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
      history.push("/")
    } catch {
      setError("Failed to sign in.")
    }  
      setLoading(false)
    }

  return (
    <div className="styling bg7" style={{height: "100% !important"}}>
      <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "2%", paddingBottom: "30%"}}>
        <Card className={classes.card, "justify-content-md-center"} style={{width: "35rem", margin: "10% auto 2%"}}>
          <CardContent className={classes.cardContent}>
            <center><h2 className="text-center mb-4 bottomBorder">TutorManager</h2></center>
            <center>{error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}</center>
            <form onSubmit={handleSubmit}>
            <center><FormControl className={classes.formControl}>
                <TextField
                  textAlign="center"
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
                  style={{paddingBottom: "10%"}}
                  variant="filled"
                  required
                />
              <Button variant="contained" 
                color="secondary"
                size="medium" 
                type="submit" 
                className={classes.button, "w-100"}
              >Login</Button>
              </FormControl></center>
            </form>
            <div className="w-100 text-center mt-3">
              <Button href="#forgot-password" color="darkgreen">Forgot Password?</Button>
            </div>
            <div className="w-100 text-center mt-2">
              Need an account? <Button color="darkgreen" href="#create-account">Sign Up</Button>
            </div>
            <div className="w-100 text-center mt-2">
              Schedule your next lesson <Button color="darkgreen" href="#tutee-schedule-lesson">here</Button> (for tutees)
            </div>
          </CardContent>
        </Card>
        
      </Container>
    </div>
  );
}


