import React, { useState, useRef, useEffect } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import NavigationBar from "./NavigationBar"
import UpdateTuteeProfile from "./UpdateTuteeProfile"

export default function SearchTuteeProfile() {
  const nameRef = useRef()
 
  const [name, setName] = useState()



  useEffect(() => {
    const selectedName = window.localStorage.getItem("selectedName")
    setName(selectedName ?? "")
  }, [])


  return (
    <>
      <NavigationBar />
      <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
        <Card.Body>
            <h2 className="text-center mb-4">Tutee's Name</h2>
            <Form>
           
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" />
                </Form.Group>
                <Button className="w-100" type="submit" onClick={()=> {
                  window.localStorage.setItem("selectedName", nameRef.current.value)
                }}>Search Tutee Profile</Button>
            </Form>
        </Card.Body>
      </Card>
      <UpdateTuteeProfile name={name}/>
    </>
  );
};
