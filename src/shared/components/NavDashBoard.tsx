import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../../app/AuthContext";
import { Link, useLocation } from "react-router";

const StyledNavDashBoard = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    height: 100%;
    background-color: #f5f5f5;
    width: 15%;
`;

const NavDashBoard = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin");
    const authContext = useContext(AuthContext);

    return (
        <StyledNavDashBoard>
            {authContext?.isAuthenticated && isAdminPage && (
                <Link to="/admin/liste-des-articles">Articles</Link>
            )}
            {authContext?.isAuthenticated && isAdminPage && (
                <Link to="/admin/liste-des-categories">Catégories</Link>
            )}
            {authContext?.isAuthenticated && isAdminPage && (
                <Link to="/admin/liste-des-tags">Tags</Link>
            )}
        </StyledNavDashBoard>
    );
};

export default NavDashBoard;
