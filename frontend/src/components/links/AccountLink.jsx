import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../Auth';

const AccountLink = () => (
    <Link
        to="/"
        onClick={() => {
            logout();
        }}
        className="text-xs hover:underline"
    >
        выйти
    </Link>
);

export default AccountLink;
