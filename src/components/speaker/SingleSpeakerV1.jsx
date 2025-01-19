import React from 'react';

const SingleTeamV1 = ({ team }) => {
    const {  image, name, role } = team

    return (
        <>
            <div className="inner-box" style={{
                width:'320px',
                height:'300px'

            }}>
                <div className="image-box">
                    <figure className="image" 
                    
                    ><img src={image} alt="name" /></figure>
                </div>
                <div className="info-box">
                    <div className="inner">
                        <h4 className="name">{name}</h4>
                        <span className="designation">{role}</span>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleTeamV1;