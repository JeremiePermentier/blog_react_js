import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import Layout from "../shared/layout/Layout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../features/auth/PrivateRoute";
import LogoutPage from "../pages/LogoutPage";
import PostPage from "../pages/PostPage";
import AdminPage from "../pages/AdminPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "inscription",
                element: <RegisterPage />,
            },
            {
                path: "connexion",
                element: <LoginPage />,
            },
            {
                path: "admin",
                element: <PrivateRoute><AdminPage /></PrivateRoute>,
            },
            {
                path: "deconnexion",
                element: <PrivateRoute><LogoutPage /></PrivateRoute>,
            },
            {
                path: "admin/ajouter-un-article",
                element: <PrivateRoute><PostPage /></PrivateRoute>,
            },
        ],
    },
]); 

export default router;