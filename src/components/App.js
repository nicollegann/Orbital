import React from "react";
import CreateAccount from "./CreateAccount";
import { Container } from 'react-bootstrap';
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import ContactAdmin from "./ContactAdmin";

function App() {
  return (
      <Container 
        className="d-flex align-items-center justify-content-center" 
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component = {Dashboard} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute path="/create-account" component={CreateAccount} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/contact-admin" component={ContactAdmin} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  );
}

export default App;
