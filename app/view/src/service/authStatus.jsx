import React, { createContext, useContext, useState, useEffect } from "react";

// Erstelle den AuthContext
const AuthContext = createContext();

// Der Provider stellt den Zustand allen Komponenten zur Verfügung
export const AuthProvider = ({ children }) => {
    const [isLoggedIn_AuthService, setIsLoggedIn_AuthService] = useState(false);
    const [token_AuthService, setToken_AuthService] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token.trim() !== "") {
            setToken_AuthService(token);
            setIsLoggedIn_AuthService(true);
        }
    }, []);

    useEffect(() => {
        if (token_AuthService !== "") {
            localStorage.setItem("token", token_AuthService);
            setIsLoggedIn_AuthService(true);
        } else {
            localStorage.removeItem("token");
            setIsLoggedIn_AuthService(false);
        }
    }, [token_AuthService]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn_AuthService,
                setIsLoggedIn_AuthService,
                token_AuthService,
                setToken_AuthService,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook, um den Auth-Context zu nutzen
export const useAuth = () => {
    return useContext(AuthContext);
};
