import React from 'react'
import "./Footer.css"

export default function Footer(props) {
  return (
    <div className="footer" style={{width: "100%"}}>
      <p>Orbital 2021</p>
      <p>To Infinity and Beyond</p>
      {props.credit && <p>{props.credit}</p>}
    </div>
    )
}
