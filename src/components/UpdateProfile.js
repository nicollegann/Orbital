import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, /*useHistory*/ } from "react-router-dom"

export default function UpdateProfile() {   
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, /*updateEmail*/ } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    //const history = useHistory();

    
    function handleSubmit(event) {
        event.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match.");
        }

        const promises = [];
        setLoading(true);
        setError("");
        
        /*
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }*/

        if (passwordRef.current.value !== currentUser.password) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        
        
        Promise.all(promises).then(() => {
            setMessage("Successfully updated account.")
            //history.push("/")
        }).catch(() => {
            setError("Failed to update account.")
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} disabled={true} />
                        </Form.Group>
                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep password unchanged" />
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mb-4">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep password unchanged"/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/profile">Back to Profile</Link>
            </div>
        </div>
    );
}

