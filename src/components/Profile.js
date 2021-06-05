import React from "react"
import { Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import NavigationBar from "./NavigationBar"
import GetData from "./GetUserData"

export default function Profile() {
  const { currentUser } = useAuth()

  // retrieve user data from firestore
  const getData = GetData();

  return (
    <> 
      <NavigationBar />
      <Card className="justify-content-md-center" style={{width: "35rem", margin: "10% auto 1%"}}>
        <Card.Body>
          <h2 className="text-center mb-4">My Profile</h2>
          {getData[1] && <Alert variant="danger">{getData[1]}</Alert>}
          <strong>Name:</strong> {getData[0] && getData[0].Name}
          <br />
          <strong>Email:</strong> {currentUser.email}
          <br />
          <strong>Contact:</strong> {getData[0] && getData[0].Contact}
          <br />
          <strong>Emergency Contact:</strong> {getData[0] && getData[0].EmergencyContact}
          <br />
          <strong>Age:</strong> {getData[0] && getData[0].Age}
          <br />
          <strong>School:</strong> {getData[0] && getData[0].School}
          <br />
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
          <Link to="/create-account" className="btn btn-primary w-100 mt-3">Create Account</Link>
          <Link to="/change-password" className="btn btn-primary w-100 mt-3">Change Password</Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
          <Link to="/">Back to Dashboard</Link>
      </div>
    </>
  )
}
