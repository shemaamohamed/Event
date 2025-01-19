import React from 'react';
import HeaderV1 from '../../components/Header/HeaderV1';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import LoginForm from '../../components/form/LoginForm';

const Login = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <HeaderV1 headerStyle="header-style-two" parentMenu='schedule' />
                <BreadCrumb title="login" breadCrumb="login" />
                <LoginForm />
            </div>
        </>
    );
};

export default Login;