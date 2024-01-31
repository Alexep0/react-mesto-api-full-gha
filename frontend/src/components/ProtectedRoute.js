import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, ...props }) => {
  const { pathname } = useLocation();
  return (props.isLoggedIn ? (
    children
  ) : (
    <Navigate to='/sign-in' state={{ backUrl: pathname }} replace />
  ));
};

export default ProtectedRoute;