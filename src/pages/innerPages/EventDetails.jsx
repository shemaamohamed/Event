import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import EventDetailsContent from '../../components/event/EventDetailsContent';

const EventDetails = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Conferences & Events" breadCrumb="Conferences & Events" />
                <EventDetailsContent />
            </div>
        </>
    );
};

export default EventDetails;