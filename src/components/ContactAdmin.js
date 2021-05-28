import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ContactAdmin() {
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Contact Admin</h2>
                    <p>Contact the administrator at email@email.com to create an account.</p>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    );
}
