import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import styled from 'styled-components/macro';

import Header from '../components/admin/Header';

const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  if (!user) {
    return <Navigate to="/auth/admin/login" />;
  }

  const sidebarWidth = '150px';

  return (
    <>
      <Header title="8 Bits Store BQ" sidebarWidth={sidebarWidth} />
      <MainContainer sidebarWidth={sidebarWidth}>
        <Outlet />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  margin: 1rem auto;

  @media screen and (min-width: 700px) {
    position: relative;
    width: calc(95% - ${(props) => props.sidebarWidth});
    left: ${(props) => props.sidebarWidth};
    margin: 1rem;
  }
`;

export default ProtectedRoutes;
