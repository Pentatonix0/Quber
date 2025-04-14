import { Outlet, Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const Layout = () => {
    return (
        <div className="app">
            <Navbar />
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
