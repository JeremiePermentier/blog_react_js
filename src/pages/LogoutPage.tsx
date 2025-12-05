import { useNavigate } from "react-router";
import AuthContext from "../app/AuthContext";
import { useContext, useEffect } from "react";

const LogoutPage: React.FC = () => {
    const { logout } = useContext(AuthContext) || {};
    const navigate = useNavigate();

    useEffect(() => {
        logout?.();
        navigate("/connexion");
    }, [logout, navigate]);

    return null;
};      

export default LogoutPage;