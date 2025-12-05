import React, { useState, useEffect, type ReactNode } from "react";
import { getCookie } from "../utils/cookie";

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    logout: () => void;
    token: string | null;
};

const AuthContext = React.createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    logout: () => {},
    token: null,
});

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const initialToken = getCookie("access_token");
    const [token, setToken] = useState<string | null>(initialToken);
    const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken);

    useEffect(() => {
        const tokenFromCookie = getCookie("access_token");
        if (tokenFromCookie !== token) {
            setToken(tokenFromCookie);
            setIsAuthenticated(!!tokenFromCookie);
        }
    }, [token]);

    const logout = () => {
        document.cookie = "access_token=; Max-Age=0; path=/; samesite=lax;";
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
