import React from 'react';
import { Link } from 'react-router-dom';

const LogoLink = () => (
    <Link to="/" className="flex items-center">
        <img
            src="/logo.svg" // Убрано 'public/'
            alt="Логотип"
            className="h-6 w-auto"
        />
    </Link>
);

export default LogoLink;
