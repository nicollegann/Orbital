import React from 'react'
import { OverlayTrigger, Button, Tooltip, Image } from 'react-bootstrap'
import { useHistory } from "react-router-dom"

export default function Buttons(props) {
    
  const history = useHistory()

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="button-tooltip">{props.tooltip}</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <Button
            variant="secondary"
            style={{borderRadius: "50%"}}
            {...triggerHandler}
          >
          <Image ref={ref} src={props.img} alt={props.img + "-img"} roundedCircle onClick={ () => history.push(props.link)} />
          </Button>
          )}
      </OverlayTrigger>              
    </>
  )
}
