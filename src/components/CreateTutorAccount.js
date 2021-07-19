import React, { useRef, useState } from "react"
import { Card, Container, CardContent, FormControl, TextField, InputLabel } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { useAuth } from "../contexts/AuthContext"
import "./TutorManager.css"
import { useGetTutorCode } from "../hooks/useGetData"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import { Form } from "react-bootstrap";



const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",
    top: "12px",
  },
  card: {
    marginBottom: theme.spacing(8),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
    
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
    // console.log(correctCode)
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
      <div className="styling bg5" style={{height: "100% !important"}}>
      <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "2%", paddingBottom: "30%"}}>
          <Card className={classes.card, "justify-content-md-center"} style={{width: "38rem", margin: "10% auto 1%"}}>
            <CardContent className={classes.cardcontent} style={{paddingTop: "8%", paddingBottom: "5%"}}>
              <center><h2 className="text-center mb-4 bottomBorder" style={{width: "75%", }}>Create New Tutor Account</h2></center>
              {/* <br></br> */}
              <center>{error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}</center>
              <center>{message && <Alert severity="success" className={classes.alert} onClose={() => {setMessage("")}}>{message}</Alert>}</center>
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
                  style={{paddingBottom: "10%"}}
                  required
                />
                <Button 
                  disabled={loading}
                  variant="contained" 
                  color="secondary"
                  size="medium" 
                  type="submit"  
                  className={classes.button, "w-100"}
                >Confirm</Button>
                </FormControl></center>
              </form>
            </CardContent>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button href="#login">Back to Login</Button>
          </div>
          </Container>
        </div>
    );
}
