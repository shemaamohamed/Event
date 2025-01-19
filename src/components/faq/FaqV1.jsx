import React from 'react';
import FaqAccordionDataV1 from '../../jsonData/faq/FaqAccordionDataV1.json'
import FaqAccordionDataV2 from '../../jsonData/faq/FaqAccordionDataV2.json'
import FaqAccordionDataV3 from '../../jsonData/faq/FaqAccordionDataV3.json'

import SingleFaqV1 from './SingleFaqV1';

const FaqV1 = () => {
    return (
        <>
            <section className="faq-section">
                <div className="auto-container">
                    <div className="sec-title">
                        <span className="title">FAQS</span>
                        <h2>Registration</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="content-column col-lg-12 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <ul className="accordion-box" id="faqAccordion">
                                    {FaqAccordionDataV1.map(faq =>
                                        <SingleFaqV1 faq={faq} key={faq.id} />
                                    )}
                                </ul>
                            </div>
                        </div>
                      
                    </div>
                </div>
                <div className="auto-container">
                    <div className="sec-title">
                        <span className="title">FAQS</span>
                        <h2>Speakers</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="content-column col-lg-12 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <ul className="accordion-box" id="faqAccordion">
                                    {FaqAccordionDataV2.map(faq =>
                                        <SingleFaqV1 faq={faq} key={faq.id} />
                                    )}
                                </ul>
                            </div>
                        </div>
                      
                    </div>
                </div>
                <div className="auto-container">
                    <div className="sec-title">
                        <span className="title">FAQS</span>
                        <h2>Abstract</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="content-column col-lg-12 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <ul className="accordion-box" id="faqAccordion">
                                    {FaqAccordionDataV3.map(faq =>
                                        <SingleFaqV1 faq={faq} key={faq.id} />
                                    )}
                                </ul>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </section>
        </>
    );
};

export default FaqV1;