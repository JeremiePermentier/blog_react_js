import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';
import styled from 'styled-components';

const LayoutStyled = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1920px;
    margin: 0 auto;
`;

const Layout = () => {
  return (
    <LayoutStyled>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </LayoutStyled>
  );
};

export default Layout;
