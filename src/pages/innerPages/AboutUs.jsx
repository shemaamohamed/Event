import React from 'react';
import AboutV1 from '../../components/about/AboutV1';
import FactV1 from '../../components/fact/FactV1';
import FeatureV1 from '../../components/feature/FeatureV1';
import CallToActionV1 from '../../components/callToAction/CallToActionV1';
import EventV2 from '../../components/Event/EventV2';
import FooterV1 from '../../components/footer/FooterV1';

const AboutUs = () => {
    return (
        <>
            <div className="page-wrapper" style={{
                marginTop:'10vh'
            }}>
                <span className="header-span"></span>
                <AboutV1 />
                 <FactV1 />
                <FeatureV1 />
                <CallToActionV1 />
                <EventV2 /> 
               
            </div>
        </>
    );
};

export default AboutUs;