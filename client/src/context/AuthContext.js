import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Simulating a login check from localStorage (or could be API)
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser)); // Set user from localStorage if exists
        }
    }, []);

    const logIn = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
    };

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};
