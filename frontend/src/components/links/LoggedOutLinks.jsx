import React from 'react';
import LogoLink from './LogoLink';

const LoggedOutLinks = () => {
    return (
        <div className="w-full flex items-center">
            <div className="flex-shrink-0">
                <LogoLink />
            </div>
        </div>
    );
};

export default LoggedOutLinks;
