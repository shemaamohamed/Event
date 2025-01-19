import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import PlanningDetails from '../../components/services/PlanningDetails';

const Planning = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Event Planning" breadCrumb="Event Planning"  name={'EventPlanningBackground.png'}/>
                <PlanningDetails />
            </div>
        </>
    );
};

export default Planning;