import React from 'react';
import SingleSponserV1 from './SingleSponserV1';

const SponserV1 = ({ spo }) => {
    const data = {
        "Platinum": [],
        "Gold": [],
        "Silver": [],
        "Bronze": [],
        "Diamond": [],
        "participant":[]
       
    };

    spo.forEach(element => {
        if (element.sponsorship_items.length > 0) {
            element.sponsorship_items.forEach(type => {
                if(element.logo!==null){
                    data[type].push({
                        user_id: element.user_id,
                        logo: element.logo
                    });

                }
               
            });
        } else {
            if(element.logo!==null){
                data["participant"].push({
                    user_id: element.user_id,
                    logo: element.logo
                });

            }
           
        }
    });
    


    return (
        <>
            <section className="clients-section">
                <div className="anim-icons">
                    <span className="icon icon-dots-3"></span>
                    <span className="icon icon-circle-blue"></span>
                </div>
                <div className="auto-container">
                    <div className="sec-title">
                        <h2>Official Sponsors</h2>
                    </div>
                    {Object.entries(data).map(([key, sponsors]) =>
                        sponsors.length > 0 && (
                            <SingleSponserV1
                                key={key} 
                                title={key}
                                sponsors={sponsors}
                            />
                        )
                    )}
                </div>
            </section>
        </>
    );
};

export default SponserV1;
