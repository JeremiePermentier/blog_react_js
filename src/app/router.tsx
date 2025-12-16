import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import Layout from "../shared/layout/Layout";
import AdminLayout from "../shared/layout/AdminLayout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../features/auth/PrivateRoute";
import LogoutPage from "../pages/LogoutPage";
import PostPage from "../pages/PostPage";
import AdminPage from "../pages/AdminPage";
import AdminListPost from "../pages/AdminListPost";
import AdminListCategory from "../pages/AdminListCategory";
import AdminListTags from "../pages/AdminListTag";
import CategoryPage from "../pages/CategoryPage";
import TagPage from "../pages/TagPage";

const router = createBrowserRouter([
  // Layout principal (site public)
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
        path: "deconnexion",
        element: (
          <PrivateRoute>
            <LogoutPage />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Layout ADMIN séparé
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "ajouter-un-article",
        element: <PostPage />,
      },
      {
        path: "modifier-un-article/:id",
        element: <PostPage />,
      },
      {
        path: "liste-des-articles",
        element: <AdminListPost />,
      },
      {
        path: "modifier-un-article/:id",
        element: <PostPage />,
      },
      {
        path: "ajouter-une-categorie",
        element: <CategoryPage />,
      },
      {
        path: "ajouter-un-tag",
        element: <TagPage />,
      },
      {
        path: "liste-des-categories",
        element: <AdminListCategory />,
      },
      {
        path: "liste-des-tags",
        element: <AdminListTags />,
      }
    ],
  },
]);

export default router;
