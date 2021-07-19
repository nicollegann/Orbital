import React from 'react'
import { OverlayTrigger, Tooltip, Image } from 'react-bootstrap'
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
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="button-tooltip">{props.tooltip}</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <ColorButton
            variant="contained" color="secondary" className={classes.margin}
            {...triggerHandler}
          >
          <Image ref={ref} src={props.img} alt={props.img + "-img"} roundedCircle onClick={ () => history.push(props.link)} />
          </ColorButton>
          )}
      </OverlayTrigger>              
    </>
  )
}
