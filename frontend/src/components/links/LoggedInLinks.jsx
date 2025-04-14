import React from 'react';
import { Link } from 'react-router-dom';
import LogoLink from './LogoLink';
import AccountLink from './AccountLink';
import { useLocation } from 'react-router-dom';

const LoggedInUserLinks = () => {
    const location = useLocation();

    const isLearnActive = location.pathname.startsWith('/learn');
    const isTeachActive = location.pathname.startsWith('/teach');

    return (
        <div className="w-full flex items-center">
            <div className="flex-shrink-0">
                <LogoLink />
            </div>

            <nav className="flex space-x-6 ml-6">
                <Link
                    className={`text-base font-normal hover:underline ${
                        isLearnActive
                            ? 'text-black font-medium underline'
                            : 'text-gray-600 hover:text-black'
                    }`}
                    to="/learn"
                >
                    Моё обучение
                </Link>
                <Link
                    className={`text-base font-normal hover:underline ${
                        isTeachActive
                            ? 'text-black font-medium underline'
                            : 'text-gray-600 hover:text-black'
                    }`}
                    to="/teach"
                >
                    Преподавание
                </Link>
            </nav>

            <div className="mr-1 flex-shrink-0 ml-auto">
                <AccountLink />
            </div>
        </div>
    );
};

export default LoggedInUserLinks;
