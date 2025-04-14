import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { memo } from 'react';

const learnSideBarItems = {
    'Моё обучение': '',
    Квесты: 'quests',
    Классы: 'classes',
};

const teachingSideBarItems = {
    'Моё преподавание': '',
    Квесты: 'quests',
    Классы: 'classes',
};

const SideBar = memo(() => {
    const location = useLocation();
    const [isTeaching, setIsTeaching] = useState(false);

    useEffect(() => {
        setIsTeaching(location.pathname.includes('teach'));
    }, [location.pathname]);

    const SideBarItem = ({ name, href }) => {
        const fullPath = isTeaching
            ? `/teach${href ? `/${href}` : ''}`
            : `/learn${href ? `/${href}` : ''}`;

        const isActive = href
            ? location.pathname === fullPath
            : location.pathname === (isTeaching ? '/teach' : '/learn');

        return (
            <Link
                to={fullPath}
                className={`block px-6 py-3 text-sm transition-colors font-medium ${
                    isActive
                        ? 'bg-gray-200 text-black'
                        : 'text-gray-600 hover:bg-gray-200 hover:text-black'
                }`}
            >
                {name}
            </Link>
        );
    };

    const currentItems = isTeaching ? teachingSideBarItems : learnSideBarItems;

    return (
        <div className="h-screen w-64 border-r border-gray-400 fixed top-100">
            <div className="flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <img
                        src={isTeaching ? '/img2.png' : '/img1.png'}
                        alt="Логотип"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                {isTeaching && (
                    <div className="px-6 py-2">
                        <Link to="new">
                            <button className="border border-gray-400 rounded-md px-4 py-2 text-base text-gray-800 font-normal hover:bg-gray-200">
                                + Создать квест
                            </button>
                        </Link>
                    </div>
                )}

                <nav className="flex-1">
                    {Object.entries(currentItems).map(([name, href]) => (
                        <SideBarItem key={name} name={name} href={href} />
                    ))}
                </nav>
            </div>
        </div>
    );
});

export default SideBar;
