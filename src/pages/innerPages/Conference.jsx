import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import ConferencesDetails from '../../components/services/ConferencesDetails';

const Conference = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Conferences & Events" breadCrumb="Conferences & Events"  name={'confbackground1.png'}/>
                <ConferencesDetails />
            </div>
        </>
    );
};

export default Conference;