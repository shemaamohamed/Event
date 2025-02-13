import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import mamoun from './Mamoun.png'

const AboutM = () => {

    

    return (
        <>
            <section className="about-section">
                <div className="anim-icons full-width">
                    <span className="icon icon-circle-blue"></span>
                  
                            <span className="icon icon-circle-1"></span>
                </div>
                <div className="auto-container">
                    <div className="row">
                        <div className="content-column col-lg-8 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="sec-title">
                                   
                                    <div className="text">
                                    Dear Valued Clients,
                                    <br/>
                                        Welcome to Events Consultant Co., a space where innovation, professionalism, and passion come together to redefine the world of events management. My name is Mamoun Khraisheh, and it is my honor to share with you the story and vision behind our company.</div>
                                </div>
                              
                                <div className="btn-box"
                                    style={{ display: 'flex', justifyContent: 'center',  
                                     }}
                                    
                                >
                                    <Link to="/Mamoun" className="theme-btn btn-style-three">
                                        <span className="btn-title">Read more</span>
                                    </Link>
                                   
                    
                                </div>
                                
                            </div>
                        </div>
                        <div className="image-column col-lg-4 col-md-12 col-sm-12">
                            <div className="image-box"
                            style={{
                                width:'320px'
                            }}
                            >
                                        <figure className="image" style={{
                                width:'320px'
                            }}
                                        >
                                            <img
                                             style={{
                                                width:'320px'
                                            }}
                                             src={mamoun} alt="image" />
                                        </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutM;
