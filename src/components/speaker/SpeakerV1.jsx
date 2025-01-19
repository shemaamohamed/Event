import React from 'react';
import SpeakerV1Data from '../../jsonData/speaker/SpeakerV1Data.json'
import SingleTeamV1 from './SingleSpeakerV1';

const TeamV1 = () => {
    return (
        <>
            <section className="speakers-section" style={{ backgroundImage: "url(images/background/6.jpg)" }}>
                <div className="auto-container">
                    <div className="sec-title light text-center">
                        <h2>Our Team</h2>
                    </div>
                    <div className="row">
                        {SpeakerV1Data.map(speaker =>
                            <div className="speaker-block col-lg-3 col-md-6 col-sm-12" key={speaker.id}>
                                <SingleTeamV1 speaker={speaker} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamV1;