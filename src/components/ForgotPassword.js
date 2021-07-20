import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import "./TutorManager.css"
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, FormControl, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100%",
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(5)
  },
  card: {
    width: "35%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(8),
    paddingBottom: theme.spacing(2),
  },
  cardcontent: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "80%",
    align: "center",
  },
  formControl: {
    width: "80%",
    textAlign: "left",
  },
  input: {
    paddingBottom: theme.spacing(2)
  },
  button: {
    marginBottom: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(2),
    width: "85%",
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
    <Grid className="styling bg7">
      <Grid item xs={12} className={classes.grid} > 
        <Card className={classes.card}>
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
                className={classes.button}
              >Reset Password</Button>
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
