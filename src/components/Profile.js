import React from 'react'
import { Card } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function Profile() {
    const { currentUser } = useAuth();

    return (
        <div> 
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">My Profile</h2>
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                    <Link to="/create-account" className="btn btn-primary w-100 mt-3">Create Account</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Back to Dashboard</Link>
            </div>
        </div>
    )
}
