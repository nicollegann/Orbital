import React, { useState } from "react"
import { Alert, Navbar, Nav } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import "./NavigationBar.css"
import "./TutorManager.css"

export default function NavigationBar() {
  const [error, setError] = useState("")
  const { logout } = useAuth()
  const history = useHistory()
    
  async function handleLogout() {
    setError("")

    try {
      window.localStorage.clear()
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out.")
    }
  }
      
  return (
      <div style={{ fontFamily: "Georgia"}}>  
      <Navbar className="backgroundcolor" variant="dark" id="nav" style={{ padding: "15px 20px"}}>
        <Navbar.Brand>TutorManager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link onClick={ () => history.push("/") }>Dashboard</Nav.Link>
            </Nav>
            <Nav className="justify-content-end" style={{ width: "93%" }}>
              <Nav.Link onClick={ () => history.push("/profile")}>My Profile</Nav.Link>
              {error && <Alert variant="danger">{error}</Alert>}
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>     
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
  )
}