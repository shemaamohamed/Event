import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AdditionalConferenceExhibitionServicesDetails from '../../components/services/AdditionalConferenceExhibitionServicesDetails';

const AdditionalConferenceExhibitionServices = () => {
    return (
        <>
            <div className="page-wrapper" >
                <span className="header-span"></span>
                <BreadCrumb title="Additional Conference Exhibition Services" breadCrumb="Additional Conference Exhibition Services"  name={'AdditionalConferenceExhibitionServicesBackground.png'}/>
                <AdditionalConferenceExhibitionServicesDetails />
            </div>
        </>
    );
};

export default AdditionalConferenceExhibitionServices;