import React, { useContext, useState, useEffect } from 'react';
import { auth, secAuth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    /*
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);    
    }*/

    function createAccount(email, password) {
        secAuth.createUserWithEmailAndPassword(email, password)
            .then(secAuth.signOut());
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    /*
    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }*/

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function getEmail() {
        if (currentUser != null) {
            return currentUser.email
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe;
    }, []) 
   
    const value = {
        currentUser,
        login,
        createAccount,
        logout,
        resetPassword,
        updatePassword,
        getEmail,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
