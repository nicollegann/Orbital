import React from 'react'
import { Image } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { useHistory } from "react-router-dom"
import { withStyles, makeStyles } from '@material-ui/styles'

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#c7d6c2"),
    backgroundColor: "#c7d6c2",
    borderRadius: "50%",
    border: '3px solid',
    borderColor: "#b9ccb3",
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Buttons(props) {
  const classes = useStyles()
  const history = useHistory()
  

  return (
    <ColorButton variant="contained" color="secondary" className={classes.margin}>
      <Image src={props.img} alt={props.img + "-img"} roundedCircle onClick={ () => history.push(props.link)} />
    </ColorButton>
  )
}
