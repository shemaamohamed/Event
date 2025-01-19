import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import SeminarsDetails from '../../components/services/SeminarsDetails';

const Seminars = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Seminars" breadCrumb="Seminars"  name={'SeminarsBackground.png'}/>
                <SeminarsDetails />
            </div>
        </>
    );
};

export default Seminars;