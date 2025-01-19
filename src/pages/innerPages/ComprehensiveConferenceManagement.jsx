import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import ComprehensiveConferenceManagementDetails from '../../components/services/ComprehensiveConferenceManagementDetails ';

const ComprehensiveConferenceManagement = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Comprehensive Conference Management" breadCrumb="Comprehensive Conference Management"  name={'ComprehensiveConferenceManagementBackground.png'}/>
                <ComprehensiveConferenceManagementDetails />
            </div>
        </>
    );
};

export default ComprehensiveConferenceManagement;