import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'
import { backendUrlImages } from '../../constant/config';

const SingleBannerV1 = ({ banner }) => {

    return (
        <>
            <div className="slide-item" style={{ backgroundImage: `url(${backendUrlImages}${banner.image})` }}>
                <div className="auto-container">
                     <div className="content-box">
                        <span className="title">
                        {new Date(banner.start_date).toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long', 
  day: 'numeric',
})}
                        </span>
                        <h2> 
                             { banner.title} </h2>
                       
                        <div className="btn-box"><Link to={`/login#`} className="theme-btn btn-style-two"><span className="btn-title">Book Ticket</span ></Link></div>
                    </div> 
                </div>
            </div >
        </>
    );
};

export default SingleBannerV1;