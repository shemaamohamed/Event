import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import ErrorPageContent from '../../components/errorPage/ErrorPageContent';

const ErrorPage = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb />
                <ErrorPageContent />
            </div>
        </>
    );
};

export default ErrorPage;