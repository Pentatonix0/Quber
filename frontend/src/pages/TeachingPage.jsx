import React from 'react';
import SideBar from '../components/SideBar';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const TeachingPage = () => {
    return (
        <>
            <div className="min-h-screen bg-[#FCFCFC]">
                <div className="flex max-w-7xl mx-auto border-r border-gray-400">
                    <div>
                        <SideBar isTeaching={true} />
                    </div>
                    <div className="flex-1 min-w-0 min-h-screen bg-white ml-64">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeachingPage;
