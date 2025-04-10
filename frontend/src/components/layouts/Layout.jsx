import { Outlet, Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const Layout = () => {
    return (
        <div className="app">
            {/* Шапка, сайдбар и другие общие элементы */}
            <Navbar />

            {/* Динамическая часть страницы */}
            <main className="content">
                <Outlet /> {/* Здесь будут рендериться дочерние страницы */}
            </main>
        </div>
    );
};

export default Layout;
