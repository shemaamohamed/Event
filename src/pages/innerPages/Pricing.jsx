import React from 'react';
import PriceV1 from '../../components/price/PriceV1';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import PriceV2 from '../../components/price/PriceV2';
import PriceV3 from '../../components/price/PriceV3';

const Pricing = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="pricing" breadCrumb="pricing" />
                <PriceV1 />
                <PriceV2 pricingClass="alternate" />
                <PriceV3 />
            </div>
        </>
    );
};

export default Pricing;