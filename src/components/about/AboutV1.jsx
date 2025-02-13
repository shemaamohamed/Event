import React, { useState, useEffect } from 'react';
import AboutV1Data from '../../jsonData/about/AboutV1Data.json';
import { HashLink as Link } from 'react-router-hash-link';
import profile from './profil.pdf'

const AboutV1 = () => {

    

    return (
        <>
            <section className="about-section">
                <div className="anim-icons full-width">
                    <span className="icon icon-circle-blue"></span>
                  
                            <span className="icon icon-dots"></span>
                            <span className="icon icon-circle-1"></span>
                </div>
                <div className="auto-container">
                    <div className="row">
                        <div className="content-column col-lg-6 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="sec-title">
                                    <span className="title">ABOUT COMPANY</span>
                                    <h2>Welcome to Event Consultant </h2>
                                    <div className="text">Event Consultant is a company specializing in the preparation, organization, and marketing of scientific conferences, exhibitions, workshops, and seminars in Jordan.</div>
                                </div>
                                <ul className="list-style-one">
                                    {AboutV1Data.map(aboutData =>
                                        <li key={aboutData.id}>{aboutData.listData}</li>
                                    )}
                                </ul>
                                <div className="btn-box"
                                    style={{ display: 'flex',
                                        justifyContent:'center',
                                        gap:'10px'
                                       
                                     }}
                                >
                                    <Link to="/registertype#" className="theme-btn btn-style-three">
                                        <span className="btn-title">Register Now</span>
                                    </Link>
                                    <a  href={profile} download className="theme-btn btn-style-three ">
                                        <span className="btn-title">Company Profile</span>
                                    </a>
                    
                                </div>
                                
                            </div>
                        </div>
                        <div className="image-column col-lg-6 col-md-12 col-sm-12">
                            <div className="image-box">
                                        <figure className="image">
                                            <img src="../images/resource/about-img-1.png" alt="image" />
                                        </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutV1;
