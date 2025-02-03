import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderV1 from './components/Header/HeaderV1';
import FooterV1 from './components/footer/FooterV1';

const UserLayout = () => {
    const noNavRoute = [
        "/registertype",
        "/register/speaker",
        "/registerPage",
        "/login",
    ];

    return (
        <div>
            <HeaderV1 headerStyle="header-style-two" />
            <main>
                <Outlet />
            </main>
            {!noNavRoute.includes(window.location.pathname) &&
                !window.location.pathname.includes("/registerPage") &&
                !window.location.pathname.includes("/other") &&
                !window.location.pathname.includes("/register/") &&
                !window.location.pathname.includes("/sponsor/stepper") && (
                    <FooterV1 />
                )}
        </div>
    );
};

export default UserLayout;
