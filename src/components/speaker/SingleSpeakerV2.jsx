import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'
import SocialShare from '../others/SocialShare';

const SingleSpeakerV2 = ({ speaker }) => {
    const { id, thumb, name, designation } = speaker

    return (
        <>
                <div className="speaker-block-two col-lg-3 col-md-6 col-sm-12">
                    <div className="inner-box">
                        <div className="info-box">
                            <h4 className="name"><Link to={`/speakers-detail/${id}#`}>{name}</Link></h4>
                            <span className="designation">{designation}</span>
                        </div>
                        <div className="image-box">
                            <figure className="image"><Link to={`/speakers-detail/${id}#`}><img src={`images/resource/${thumb}`} alt="image" /></Link></figure>
                        </div>
                        <div className="social-box">
                            <ul className="social-links social-icon-colored">
                                <SocialShare />
                            </ul>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default SingleSpeakerV2;