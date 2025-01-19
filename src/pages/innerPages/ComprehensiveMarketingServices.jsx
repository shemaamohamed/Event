import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import ComprehensiveMarketingServicesDetails from '../../components/services/ComprehensiveMarketingServicesDetails ';

const ComprehensiveMarketingServices = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Comprehensive Marketing Services" breadCrumb="Comprehensive Marketing Services"  name={'ComprehensiveMarketingServicesBackground.png'}/>
                <ComprehensiveMarketingServicesDetails />
            </div>
        </>
    );
};

export default ComprehensiveMarketingServices;