import React from 'react';
import EventInfo from './EventInfo';

const EventV2 = () => {
    return (
        <>
            <section className="event-info-section">
                <div className="auto-container">
                    <div className="row">
                        <div className="info-column col-lg-6 col-md-12 col-sm-12 order-lg-2 ps-30 ">
                            <EventInfo />
                        </div>
                        <div className="map-column col-lg-6 col-md-12 col-sm-12">
                            <div className="map-outer">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54162.63123254484!2d35.86073700000001!3d31.956435!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca10ff839a7bf%3A0xa854064ff6e1a48b!2zRXZlbnRzIENvbnN1bHRhbnQgY29tcGFueSAtINi02LHZg9ipINin2YTZhdiz2KrYtNin2LEg2YTZhNmF2KTYqtmF2LHYp9iq!5e0!3m2!1sen!2sus!4v1728902606826!5m2!1sen!2sus"
                                    height="435" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EventV2;