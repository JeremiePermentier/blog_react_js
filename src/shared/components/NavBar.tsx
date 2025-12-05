import styled from "styled-components";
import { Link } from "react-router";
import AuthContext from "../../app/AuthContext";
import { useContext, useState } from "react";
import { useLocation } from "react-router";
import UserContext from "../../app/UserContext";

const StyledNavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ccc;

    a {
        text-decoration: none;
        padding: 0.25rem;
    }
`;

const StyledProfil = styled.div`
    background-color: #ccc;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledProfilModal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: absolute;
    top: 10%;
    right: 1%;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
`;

const NavBar = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [isOpenProfil, setIsOpenProfil] = useState(false);

  // Détecte si on est dans l'admin
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <StyledNavBar>
      <div>
        {authContext?.isAuthenticated && <Link to="/">Blog</Link>}
      </div>
      <div>
        {!authContext?.isAuthenticated && <Link to="/connexion">Connexion</Link>}
        {!authContext?.isAuthenticated && <Link to="/inscription">Inscription</Link>}

        
        
        {/* {authContext?.isAuthenticated && <Link to="/blog">Blog</Link>} */}
      </div>
      {authContext?.isAuthenticated && <StyledProfil onClick={() => setIsOpenProfil(!isOpenProfil)}>{userContext?.user?.username.slice(0, 1).toUpperCase()}</StyledProfil>}
      {isOpenProfil && <StyledProfilModal>
        {authContext?.isAuthenticated && <Link to="/" onClick={() => setIsOpenProfil(false)}>Accueil</Link>}
        {authContext?.isAuthenticated && !isAdminPage && <Link to="/admin" onClick={() => setIsOpenProfil(false)}>Dashboard</Link>}
        {authContext?.isAuthenticated && <Link to="/deconnexion" onClick={() => setIsOpenProfil(false)}>Déconnexion</Link>}
      </StyledProfilModal>}
    </StyledNavBar>
  );
};

export default NavBar;