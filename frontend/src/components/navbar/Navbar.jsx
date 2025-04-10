import React from 'react';
import LoggedInLinks from '../links/LoggedInLinks';
import LoggedOutLinks from '../links/LoggedOutLinks';
import { useAuth } from '../../Auth';
// import UserValidator from "./UserValidation";
// import LoggedOutLinks from "./Links/LoggedOutLinks";
// import LoggedInUserLinks from "./Links/LoggedInUserLinks";
// import LoggedInAdminLinks from "./Links/LoggedInAdminLinks";

const Navbar = () => {
    const [logged] = useAuth();
    return (
        <header className="sticky top-0 z-50">
            <div className="border-t-2 border-orange-500"></div>
            <nav className="bg-white p-2 border-b border-gray-400">
                {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
            </nav>
        </header>
    );
};

export default Navbar;
