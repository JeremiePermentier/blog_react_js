import { Outlet } from "react-router";
import styled from "styled-components";
import NavBar from '../components/NavBar';
import NavDashBoard from '../components/NavDashBoard';

const LayoutStyled = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1920px;
    margin: 0 auto;
`;

const MainStyled = styled.main`
    display: flex;
    flex-direction: row;
`;

const AdminLayout = () => {
    return (
        <LayoutStyled>
            <NavBar />
            <MainStyled>
                <NavDashBoard />
                <Outlet />
            </MainStyled>
        </LayoutStyled>
    );
};

export default AdminLayout;