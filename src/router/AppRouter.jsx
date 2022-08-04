import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import ProtectedRoutes from './ProtectedRoutes';
// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AdminHomePage from '../pages/AdminHomePage';
import Page404 from '../pages/Page404';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />}></Route>
      </Route>

      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/auth/admin" element={<AdminHomePage />}></Route>
      </Route>

      <Route path="/auth/admin/login" element={<LoginPage />}></Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRouter;
