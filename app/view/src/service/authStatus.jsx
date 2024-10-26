import React, { createContext, useContext, useState, useEffect } from "react";
import { apiGetUser, apiUserByToken, setToken_ApiCalls } from "./api_calls";
// Erstelle den AuthContext
const AuthContext = createContext();

// Der Provider stellt den Zustand allen Komponenten zur Verfügung
export const AuthProvider = ({ children }) => {
    const [isLoggedIn_AuthService, setIsLoggedIn_AuthService] = useState(false);
    const [token_AuthService, setToken_AuthService] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token.trim() !== "") {
            setToken_AuthService(token);
            setIsLoggedIn_AuthService(true);
        }
    }, []);

    useEffect(() => {
        const user = async (token) => {
            const response = await apiUserByToken(token);
            console.log(response);
            response.isAdmin && setIsAdmin(true);
        };
        if (token_AuthService !== "") {
            localStorage.setItem("token", token_AuthService);
            setToken_ApiCalls(token_AuthService);
            const data = user(token_AuthService);

            setIsLoggedIn_AuthService(true);
        } else {
            localStorage.removeItem("token");
            setToken_ApiCalls("");
            setIsLoggedIn_AuthService(false);
            setIsAdmin(false);
        }
    }, [token_AuthService]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn_AuthService,
                setIsLoggedIn_AuthService,
                isAdmin,
                setIsAdmin,
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
