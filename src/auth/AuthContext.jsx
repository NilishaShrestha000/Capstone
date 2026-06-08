import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token")
    });

    const login = (jwtToken) => {
        localStorage.setItem("token", jwtToken);
        setToken("token");
    };

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider >
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}