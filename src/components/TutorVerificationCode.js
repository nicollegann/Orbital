import React, { useState, useRef } from "react"
import { Form, Button, Card, Container, Alert, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { db } from "./../firebase"
import { useGetTutorCode } from "./../hooks/useGetData"
import NavigationBar from "./NavigationBar"

export default function TutorVerificationCode() {
    const [disabled, setDisabled] = useState(true)
    const codeRef = useRef()
    const currentCode = useGetTutorCode()

    function handleSetCode(event) {
        event.preventDefault()
        
        if (disabled) {
            setDisabled(false)
        } else {
            db.collection("TutorProfile")
            .doc("VerificationCode")
            .set({
                code: codeRef.current.value
            })
            setDisabled(true)  
        }
    }
        
    return (
        <div className="bg5 styling">
        <NavigationBar />
        <Container fluid style={{paddingLeft: "0", paddingRight: "0", paddingTop: "0", paddingBottom: "30%"}}>
          <Card className="justify-content-md-center" style={{width: "70rem", margin: "5% auto 1%"}}>
            <Card.Body className="mt-3 mb-3" style={{width: "50%"}}>
              <Form onSubmit={handleSetCode}>
                <Form.Group className="mb-3">
                  <Form.Label>Verification Code</Form.Label>
                  <Form.Control type="text" ref={codeRef} defaultValue={currentCode} disabled={disabled}/>
                </Form.Group>
                <Button type="submit">{disabled ? "Change" : "Update"}</Button>
              </Form> 
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
}