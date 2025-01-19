import React from 'react';
import { Outlet} from 'react-router-dom';
import HeaderV1 from './components/Header/HeaderV1';

const UserLayout = () => {
    return (
        <div>
            <HeaderV1 headerStyle="header-style-two"/>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;