import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Button, AppBar, Toolbar, IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import "./TutorManager.css"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  alert: {
    marginBottom: theme.spacing(3)
  },
}))

const StyledAppBar = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
  },
}))(AppBar);

const StyledButton = withStyles((theme) => ({
  root: {
    '&:hover': {
      color: theme.palette.common.white,
   },
  },
}))(Button);

const StyledIconButton = withStyles((theme) => ({
  root: {
    '&:hover': {
      color: theme.palette.common.white,
   },
  },
}))(IconButton);

export default function NavigationBar() {
  const classes = useStyles()
  
  const [error, setError] = useState("")
  const { logout } = useAuth()
  const history = useHistory()
    
  async function handleLogout() {
    setError("")

    try {
      window.localStorage.clear()
      await logout()
      history.replace("/login")
    } catch {
      setError("Failed to log out.")
    }
  }
      
  return (
    <div className={classes.root}>  
      <StyledAppBar position="static">
        <Toolbar>
          <StyledIconButton edge="start" color="inherit" href="#">
            <MenuBookIcon fontSize="medium"/>
          </StyledIconButton>
          <Typography variant="h6" className={classes.title} style={{ fontFamily: "Georgia" }}>
            TutorManager
          </Typography>
          <StyledButton className={classes.menuButton} color="inherit" href="#" startIcon={<HomeIcon/>}>Dashboard</StyledButton>
          <StyledButton className={classes.menuButton} color="inherit" href="#profile" startIcon={<AccountCircleIcon/>}>My Profile</StyledButton>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon/>}>Logout</Button>
        </Toolbar>
      </StyledAppBar>
      {error && <Alert severity="error" className={classes.alert} onClose={() => {setError("")}}>{error}</Alert>}
    </div>
  )
}

