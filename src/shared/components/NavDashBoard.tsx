import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../../app/AuthContext";
import { Link, useLocation } from "react-router";

const StyledNavDashBoard = styled.nav`
    display: flex;
    justify-content: center;
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
                <Link to="/admin/ajouter-un-article">Ajouter un article</Link>
            )}
        </StyledNavDashBoard>
    );
};

export default NavDashBoard;
