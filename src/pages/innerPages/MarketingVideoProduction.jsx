import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import MarketingVideoProductionDetails from '../../components/services/MarketingVideoProductionDetails';

const MarketingVideoProduction = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Marketing Video Production" breadCrumb="Marketing Video Production"  name={'MarketingVideoProductionBackground.png'}/>
                <MarketingVideoProductionDetails />
            </div>
        </>
    );
};

export default MarketingVideoProduction;