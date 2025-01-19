import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import SocialEventsDetails from '../../components/services/SocialEventsDetails';

const SocialEvents = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Social Events" breadCrumb="Social Events"  name={'SocialEBackground.png'}/>
                <SocialEventsDetails />
            </div>
        </>
    );
};

export default SocialEvents;