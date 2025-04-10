import React from 'react';
import SideBar from '../components/SideBar';
import Navbar from '../components/navbar/Navbar';
import { useAuth } from '../Auth';
import LoggedOutPageContent from '../components/contents/LogOutPageContent';
import LogInPageContent from '../components/contents/LogInPageContent';

const HomePage = () => {
    const [logged] = useAuth();
    return (
        <>
            {logged ? (
                <div className="min-h-screen bg-[#FCFCFC]">
                    <LogInPageContent />
                </div>
            ) : (
                <LoggedOutPageContent />
            )}
        </>
    );
};

export default HomePage;
