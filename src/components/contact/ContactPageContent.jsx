import React from 'react';
import SocialShare from '../others/SocialShare';
import ContactForm from '../form/ContactForm';

const ContactPageContent = () => {
    return (
        <>
            <section className="contact-page-section">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="contact-column col-lg-4 col-md-12 col-sm-12 order-lg-2">
                            <div className="inner-column">
                                <div className="sec-title">
                                    <h2>Contact Info</h2>
                                </div>
                                <ul className="contact-info">
                                    <li>
                                        <span className="icon fa fa-map-marker-alt"></span>
                                        <p><strong>Rawhi Al Qutabi Commercial Complex,</strong></p>
                                        <p> Al Swaifieh Al Wakalat St,  7, Amman, Jordan</p>
                                    </li>
                                    <li>
                                        <span className="icon fa fa-phone-volume"></span>
                                        <p><strong>Call Us</strong></p>
                                        <p><a href="tel:+962 79 960 2002">+962 79 960 2002</a></p>
                                    </li>
                                    <li>
                                        <span className="icon fa fa-envelope"></span>
                                        <p><strong>Mail Us</strong></p>
                                        <p><a href="mailto:info@eventscons.com">info@eventscons.com</a></p>
                                    </li>
                                    <li>
                                        <span className="icon fa fa-clock"></span>
                                        <p><strong>Opening Time</strong></p>
                                        <p>Mon - Sat: 09.00am to 18.00pm</p>
                                    </li>
                                </ul>
                                <ul className="social-icon-two social-icon-colored">
                                    <SocialShare />
                                </ul>
                            </div>
                        </div>
                        <div className="form-column col-lg-8 col-md-12 col-sm-12">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <div className="map-section">
                <div className="auto-container">
                    <div className="map-outer">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54162.63123254484!2d35.86073700000001!3d31.956435!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca10ff839a7bf%3A0xa854064ff6e1a48b!2zRXZlbnRzIENvbnN1bHRhbnQgY29tcGFueSAtINi02LHZg9ipINin2YTZhdiz2KrYtNin2LEg2YTZhNmF2KTYqtmF2LHYp9iq!5e0!3m2!1sen!2sus!4v1728902606826!5m2!1sen!2sus"></iframe>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ContactPageContent;