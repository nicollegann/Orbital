import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import "./TutorManager.css"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import { Card, Container, CardContent, FormControl, TextField, InputLabel } from '@material-ui/core'
import { Alert } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",
    top: "12px",
  },
  card: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "70%",
    align: "center",
  },
  formControl: {
    width: "80%",
    textAlign: "left",
  },
  input: {
    paddingBottom: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(2),
    width: "85%",
  },
}))

export default function ForgotPassword() {   
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles()

    
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setMessage("")
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions.") 
    } catch {
      setError("Failed to reset password.");
    }    
    setLoading(false)
  }

  return (
    <div className="styling bg9" style={{height: "100% !important"}}>
    <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "2%", paddingBottom: "30%"}}>
      <Card className={classes.card, "justify-content-md-center"}  style={{paddingBottom: "2%", width: "35rem", margin: "10% auto 2%"}}>
        <CardContent className={classes.cardContent}>
          <center><h2 className="bottomBorder text-center mb-4" style={{width: "48%", paddingTop: "3%"}}>Reset Password</h2></center>
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
            <Button 
              disabled={loading} 
              variant="contained" 
              color="secondary"
              size="medium" 
              type="submit" 
              className={classes.button, "w-100"}
            >Reset Password</Button>
          </FormControl></center>
          </form>
          <div className="w-100 text-center mt-3">
            <Button href="#login" color="darkgreen">Back to Login</Button>
          </div>
        </CardContent>
      </Card>
      </Container>
    </div>
  );
}
