import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import ScheduleV1 from '../../components/schedule/ScheduleV1';
import SubscribeV2 from '../../components/subscribe/SubscribeV2';

const Schedule = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Schedule" breadCrumb="schedule" />
                <ScheduleV1 />
                <SubscribeV2 />
            </div>
        </>
    );
};

export default Schedule;