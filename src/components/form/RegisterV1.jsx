import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterV1 = () => {
    return (
        <>
            <section className="register-section">
                <div className="auto-container">
                    <div className="anim-icons full-width">
                        <span className="icon icon-circle-3 wow zoomIn"></span>
                    </div>
                    <div className="outer-box">
                        <div className="row no-gutters">
                            <div className="title-column col-lg-4 col-md-6 col-sm-12">
                                <div className="inner">
                                    <div className="sec-title light">
                                        <div className="icon-box"><span className="icon flaticon-rocket-ship"></span></div>
                                        <h2>REGISTER NOW</h2>
                                        <div className="text">Ready to host an unforgettable conference? Don't wait—contact us today and let's bring your vision to life with professionalism and excellence!</div>
                                    </div>
                                </div>
                            </div>
                            <div className="register-form col-lg-8 col-md-6 col-sm-12">

                                <div className="form-inner">
                                <h3>Event Request Form</h3>
                                <p>
            Thank you for considering our services to plan your upcoming event or conference. Please complete the form below, and our team will contact you shortly to discuss your requirements.
        </p>
                                    <RegisterForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RegisterV1;