import React from "react"
import { Card } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import NavigationBar from "./NavigationBar"
import "./TutorManager.css"
import { useGetProfile } from "../hooks/useGetData"

export default function Profile() {
  const { currentUser } = useAuth()

  // retrieve user data from firestore
  const getUserData = useGetProfile()

    return (
    <div className="bg5" style={{paddingBottom: "20%"}}>
      <NavigationBar />
      <Card className="justify-content-md-center styling" style={{width: "35rem", height: "100%", margin: "10% auto 1%", border: "none"}}>
        <Card.Body style={{height: "100%"}}>
          <center><h2 className="text-center mb-4 bottomBorder">My Profile</h2></center>
          <strong>Name:</strong> {getUserData && getUserData.name}
          <br />
          <strong>Email:</strong> {currentUser.email}
          <br />
          <strong>Contact:</strong> {getUserData && getUserData.contact}
          <br />
          <strong>Emergency Contact:</strong> {getUserData && getUserData.emergencyContact}
          <br />
          <strong>Date Of Birth:</strong> {getUserData && getUserData.dateOfBirth}
          <br />
          <strong>School:</strong> {getUserData && getUserData.school}
          <br />
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Edit Profile</Link>
          <Link to="/change-password" className="btn btn-primary w-100 mt-3">Change Password</Link>
        </Card.Body>
        
      </Card>
      <div className="w-100 text-center mt-4">
        <Link to="/">Back to Dashboard</Link>
      </div>
    </div>
  )
}