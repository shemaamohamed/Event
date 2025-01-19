import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import WorkshopsDetails from '../../components/services/WorkshopsDetails';

const Workshops = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Workshops" breadCrumb="Workshops"  name={'WorkshopsBackground.png'}/>
                <WorkshopsDetails />
            </div>
        </>
    );
};

export default Workshops;