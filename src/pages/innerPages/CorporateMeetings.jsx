import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import CorporateMeetingsDetails from '../../components/services/CorporateMeetingsDetails';

const CorporateMeetings = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Corporate Meetings" breadCrumb="Corporate Meetings"  name={'CorporateMeetingsBackground.png'}/>
                <CorporateMeetingsDetails />
            </div>
        </>
    );
};

export default CorporateMeetings;