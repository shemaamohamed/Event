import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import ManagementConsultingDetails from '../../components/services/ManagementConsultingDetails';

const ManagementConsulting = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Management Consulting" breadCrumb="Management Consulting"  name={'MediaCampaignBackground.png'}/>
                <ManagementConsultingDetails />
            </div>
        </>
    );
};

export default ManagementConsulting;