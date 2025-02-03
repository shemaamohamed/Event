import React from 'react';
import SingleTeamV1 from './SingleSpeakerV1';
import MamounImage from './image/Mamoun.png';
import AmeeraImage from './image/ameera.png';
import AhmadImage from './image/ahmad2.png';
import MohammadImage from './image/mhammd4.png';
import DanaImage from './image/Dana.png';
import FarahImage from './image/farah4.png';
import BakerImage from './image/baker4.png';
import GhadiImage from './image/ghadi.png';

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
            <section className="speakers-section" style={{ backgroundImage: "url(images/background/6.jpeg)" }}>
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