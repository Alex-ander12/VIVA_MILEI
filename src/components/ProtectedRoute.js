import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser, hasAccess } from '../utils/auth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && !hasAccess(user.role, requiredRole)) return <Navigate to="/dashboard" />;
  return children;
};

export default ProtectedRoute;