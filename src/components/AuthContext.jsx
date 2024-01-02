import React, { createContext, useState, useContext } from 'react';

// Create a context for the authentication
const AuthContext = createContext();

// Create a provider which holds the state and function to update it
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    const handleAuth = (authInfo) => {
        setAuth(authInfo);
    };

    const login = async (email, password) => {
        return fetch('../data/users.json')
            .then(res => res.json())
            .then(res => {
                const users = res.filter((u) => {
                    return u.email === email && u.password === password
                })
                return users[0]
            })
    }

    return (
        <AuthContext.Provider value={{ auth, handleAuth, login }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a hook to use the auth context
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };