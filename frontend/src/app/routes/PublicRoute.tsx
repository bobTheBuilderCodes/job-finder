// src/components/PublicRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactElement;  // Use ReactElement since we expect a single React element
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem('user');
  const location = useLocation();

  // Redirect to '/jobs' if a token exists, otherwise render the children
  return token ? <Navigate to="/jobs" replace state={{ from: location }} /> : children;
};

export default PublicRoute;
