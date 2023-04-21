import React, { useState, useContext, useEffect } from 'react';
//import { auth } from "../api/firebase"
import firebase from "../api/firebase"

export const Context = React.createContext();

export const useAuth = () => {
    return useContext(Context)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true)
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const signin = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const signout = () => {
        return auth.signOut()
    }

    useEffect(() => {
        //const unsubscribe = auth.onAuthStateChanged(user => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    return (
        <Context.Provider
            value={{
                currentUser,
                signup,
                signin,
                signout
            }}>
            {!loading && children}
        </Context.Provider>
    )
}