import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Box } from '@chakra-ui/react';

const MainLayout = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Box className="w-96 mx-auto mt-10">
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
