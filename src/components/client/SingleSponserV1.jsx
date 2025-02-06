import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { backendUrlImages } from '../../constant/config';

const SingleSponserV1 = ({ title, sponsors }) => {
    const colorMapping = {
        "Platinum": "#d3d3d3",  
        "Gold": "gold",        
        "Silver": "#808080",   
        "Bronze": "#cd7f32",   
        "Diamond": "#c5c5c5",   
        "Default": "#01AEF2"    
    };

    const backgroundColor = colorMapping[title] || colorMapping["Default"]; 

    return (
        <div className="sponsors-outer">
            <h3 style={{ backgroundColor }}>{title}</h3>
            <div className="row">
                {sponsors.map((thumb, index) => (
                    <div className="client-block col-lg-3 col-md-6 col-sm-12" key={index}>
                        <figure className="image-box">
                            <Link to={void (0)}>
                                <img
                                    src={`${backendUrlImages}${thumb.logo}`}
                                    alt={`spo-${index}`}
                                />
                            </Link>
                        </figure>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SingleSponserV1;
