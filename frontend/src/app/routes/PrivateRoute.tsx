// src/components/PrivateRoute.tsx
import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('user');
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
