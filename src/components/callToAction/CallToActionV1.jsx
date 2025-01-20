import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'

const CallToActionV1 = () => {
    return (
        <>
            <section className="call-to-action" style={{ backgroundImage: "url(../images/background/11.jpg)" }} >
                <div className="auto-container">
                    <div className="content-box">
                        <div className="text">WE ARE A LEADING MEETUP COMPANY</div>
                        <h2>With our expertise and commitment to excellence <br /> we transform your ideas into memorable and impactful events.</h2>

                        <div className="btn-box">
                            <Link to="/contact_us#" className="theme-btn btn-style-one"><span className="btn-title">Contact
                                Us</span></Link>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default CallToActionV1;