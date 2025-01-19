import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import ExhibitionsDetails from '../../components/services/ExhibitionsDetails.';

const Expositions = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Expositions & Exhibitions" breadCrumb="Expositions & Exhibitions"  name={'Expositionsbackground.png'}/>
                <ExhibitionsDetails />
            </div>
        </>
    );
};

export default Expositions;