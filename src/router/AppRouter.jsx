import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />}></Route>
      </Route>

      <Route path="/auth/admin/login" element={<LoginPage></LoginPage>}></Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRouter;
