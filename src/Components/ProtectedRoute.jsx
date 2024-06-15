import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
        return <Navigate to="/login" />;
    }
    
    return <Component {...rest} />;
};

export default ProtectedRoute;
