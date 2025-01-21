import React from 'react';
import SpeakerV1Data from '../../jsonData/speaker/SpeakerV1Data.json'
import SingleTeamV1 from './SingleSpeakerV1';
import MamounImage from './image/Mamoun4-removebg-preview.png';
import AmeeraImage from './image/ameera.png';
import AhmadImage from './image/ahmad4-removebg-preview.png';
import MohammadImage from './image/mhammd4-removebg-preview.png';
import DanaImage from './image/dana4-removebg-preview.png';
import FarahImage from './image/farah4-removebg-preview.png';
import BakerImage from './image/baker4-removebg-preview.png';
import GhadiImage from './image/ghadi.jpg';

const TeamV1 = () => {
    const teamMembers = [
        { name: 'Mamoun Khraisheh', role: 'General Manager', image: MamounImage },
        { name: 'Ameera Abu Saif', role: 'Executive Secretary', image: AmeeraImage },
        { name: 'Ahmad Hassan', role: 'Admin Assistant', image: AhmadImage },
        { name: 'Mohammad Abu Laila', role: 'IT Supervisor', image: MohammadImage },
        { name: 'Dana Al Sabbar', role: 'Events Manager', image: DanaImage },
        { name: 'Farah Jamal', role: 'Public Relations', image: FarahImage },
        { name: 'Baker Helmi', role: 'Designer', image: BakerImage },
        { name: 'Ghaida Sami', role: 'Events Coordinator', image:GhadiImage },
      ];
    return (
        <>
            <section className="speakers-section" style={{ backgroundImage: "url(images/background/6.jpg)" }}>
                <div className="auto-container">
                    <div className="sec-title light text-center">
                        <h2>Our Team</h2>
                    </div>
                    <div className="row">
                        {teamMembers.map(team =>
                            <div className="speaker-block col-lg-3 col-md-6 col-sm-12" key={team.id}>
                                <SingleTeamV1 team={team} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamV1;