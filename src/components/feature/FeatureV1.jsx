import React from 'react';
import featureV1Data from '../../jsonData/feature/featureV1Data.json'
import SingleFeatureV1 from './SingleFeatureV1';
import CustomBoothDesigns from "./CustomBoothDesigns.png"

const FeatureV1 = () => {
    return (
        <>
            <section className="features-section-two">
                <div className="auto-container">
                    <div className="anim-icons">
                        <span className="icon twist-line-1"></span>
                            <span className="icon twist-line-2"></span>
                            <span className="icon twist-line-3"></span>
                    </div>
                    <div className="row">
                        <div className="title-block col-lg-4 col-md-12 col-sm-12 wow fadeInUp">
                            <div className="inner-box">
                                <div className="sec-title">
                                    <span className="title">Features</span>
                                    <h2>Our Feature</h2>
                                </div>
                            </div>
                        </div>
                        <div className="feature-block-two col-lg-4 col-md-6 col-sm-12 wow fadeInUp" >
                        <div className="inner-box">
                <div className="icon-box"><span className={`icon `}>
                    <img src={CustomBoothDesigns} className='icon' alt="icon"
                    width="70px" height="100px"
                    />
                    </span></div>
                <h4>Custom Booth Designs</h4>
                <div className="text">We create innovative and tailored booth designs that reflect your brand identity.</div>
                <div className="text">We create innovative and tailored booth designs that reflect your brand identity.</div>

            </div>
                            </div>
                        {featureV1Data.map(feature =>
                            <div className="feature-block-two col-lg-4 col-md-6 col-sm-12 wow fadeInUp" key={feature.id}>
                                <SingleFeatureV1 feature={feature} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeatureV1;