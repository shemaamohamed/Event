import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import TravelConsultantDetails from '../../components/services/TravelConsultantDetails ';

const TravelConsultant = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="TravelConsultant" breadCrumb="TravelConsultant"  name={'MediaCampaignBackground.png'}/>
                <TravelConsultantDetails />
            </div>
        </>
    );
};

export default TravelConsultant;