import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Auth';
import AuthRequiredPage from './AuthRequiredPage';

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [logged] = useAuth();

    useEffect(() => {
        setLoading(false);
    }, [logged]);

    if (loading) {
        return null;
    }

    if (!logged) {
        return <AuthRequiredPage />;
    }

    return children;
};

export default PrivateRoute;
