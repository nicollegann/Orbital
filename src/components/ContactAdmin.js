import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import NavigationBar from "./NavigationBar"

export default function ContactAdmin() {
  return (
      <>
          <NavigationBar />
            <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
              <Card.Body>
                <h2 className="text-center mb-4">Contact Admin</h2>
                <p>Contact the administrator at email@email.com to create an account.</p>
            </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
      </>
  );
}
