import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const MainLayout = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="w-96 mx-auto mt-10">
        <h1>Layout main</h1>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
