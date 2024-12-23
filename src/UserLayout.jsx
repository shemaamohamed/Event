import React from 'react';
import { Outlet} from 'react-router-dom';
import NavBar from './components/Navbar';

const UserLayout = () => {
    return (
        <div>
            <NavBar/>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;