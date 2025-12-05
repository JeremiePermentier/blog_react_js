import { useContext, type ReactNode } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../../app/AuthContext";

interface PrivateRouteProps {
    children?: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const context = useContext(AuthContext);

    if (!context?.isAuthenticated) {
        return <Navigate to="/connexion" />;
    }
    return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;