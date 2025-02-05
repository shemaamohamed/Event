import React from 'react';
import { backendUrlImages } from "../../constant/config";



const SingleSpeakerV2 = ({ speaker }) => {
    
    
    

    return (
        <>
                 <div className="inner-box" style={{
                width:'250px',
                height:'250px'

            }}>
                {speaker.image ? (
                              <div className="image-box">
                    <figure className="image" 
                    
                    ><img src={`${backendUrlImages}/${speaker.image}`} alt="name"
                    style={{
                        marginTop:'0px'
            
                    }}      
                   
                     /></figure>
                </div>
                            ) : (
                              <div className="image-placeholder">No Image</div>
                            )}
                
                <div className="info-box">
                    <div className="inner">
                        <h4 className="name">{speaker.title}{' '}{speaker.name}</h4>
                        <span className="designation">{speaker.country_of_residence}</span>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleSpeakerV2;