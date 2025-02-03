import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link'
import SocialShare from '../others/SocialShare';
import { Gallery } from 'react-photoswipe-gallery';
import SingleGalleryV1 from '../gallery/SingleGalleryV1';
import axios from 'axios';
import { Box } from '@mui/material';
import { useAuth } from '../../common/AuthContext';

const FooterV1 = () => {
     const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
     const {  isLoggedIn } = useAuth();
    
    const [images, setImages] = useState([]); // Initialize state as an empty array
    const [loading, setLoading] = useState(false); 
    const fetchImages = async (page = 1) => {
        setLoading(true);
        try {
          const response = await axios.get(`https://panel.mayazin.co/api/get/image?page=${page}`);
          setImages(response.data.data.data); // Assuming response contains data.data.data
          setCurrentPage(page);
        } catch (error) {
          console.error("Error fetching images:", error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchImages(currentPage);
      }, [currentPage]);
    return (
        <>
            <footer className="main-footer">
                <div className="widgets-section">
                    <div className="auto-container">
                        <div className="row">
                            <div className="big-column col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className="footer-column col-xl-7 col-lg-6 col-md-6 col-sm-12">
                                        <div className="footer-widget about-widget">
                                            <div className="logo">
                                                <Link to="/#"><img src="/images/logo-2.png" alt="image" /></Link>
                                            </div>
                                            <div className="text">
                                                <p>Empowering Success Through Exceptional Events – We are Your Trusted Partner in Conference and Exhibition Management.</p>
                                            </div>
                                            <ul className="social-icon-one social-icon-colored">
                                                <SocialShare />
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer-column col-xl-5 col-lg-6 col-md-6 col-sm-12">
                                        <div className="footer-widget widget-ps-50">
                                            <h2 className="widget-title">Useful Links</h2>
                                            <ul className="user-links">
                                           <li><Link to="/home">Home </Link></li>
                                                                   <li><Link to="/conferences">Conferences </Link></li>
                                                                   <li><Link to="/page/exhibitions">Exhibition </Link></li>
                                           
                                           
                                                                   <li><Link to="/about-us#" >Our Story</Link></li>
                                                                   <li><Link to="/our_team" >Our Team</Link></li>
                                                                   <li><Link to="/our_clients" >Our Clients</Link></li>
                                                                   <li><Link to="/gallery" >Gallery</Link></li>
                                                                   <li><Link to="/job/list" >Careers</Link></li>
                                                                   {
                            isLoggedIn && (
                                <li><Link  to="/faq" >FAQs</Link></li>

                            )
                        }
                        {
                            !isLoggedIn&&(

                                <li><Link to="/login" >FAQs</Link></li>

                            )
                        }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="big-column col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                <div className="row">
                                <div className="footer-column col-xl-5 col-lg-6 col-md-6 col-sm-12">
                                        <div className="footer-widget widget-ps-50">
                                            <h2 className="widget-title">Events</h2>
                                            <ul className="user-links">
                                                                   <li><Link to="/up/event">Up Coming Events </Link></li>
                                                                   <li><Link to="/pre/con">Previous Events </Link></li>
                                           
                                           
                                            </ul>
                                        </div>
                                        <div className="footer-widget widget-ps-50">
                                            <h2 className="widget-title">Travel </h2>
                                            <ul className="user-links">
                                                                   <li><Link to="/tour_slider">Sights </Link></li>
                                           
                                           
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                                        <div className="footer-widget contact-widget">
                                            <h2 className="widget-title">Contact Us</h2>
                                            <div className="widget-content">
                                                <ul className="contact-list">
                                                    <li>
                                                        <span className="icon flaticon-clock"></span>
                                                        <div className="text">Mon - Fri: 09:00 - 18:00</div>
                                                    </li>
                                                    <li>
                                                        <span className="icon flaticon-phone"></span>
                                                        <div className="text"><Link to="tel:+962799602002">+962 79 960 2002</Link></div>
                                                    </li>
                                                    <li>
                                                        <span className="icon flaticon-paper-plane"></span>
                                                        <div className="text"><Link to="mailto:info@eventscons.com">info@eventscons.com</Link></div>
                                                    </li>
                                                    <li>
                                                        <span className="icon flaticon-worldwide"></span>
                                                        <div className="text"> Rawhi Al Qutabi Commercial Complex, Al Swaifieh Al Wakalat St,  7, Amman, Jordan</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                  
                                    
                                </div>
                            </div>
                            <div className=" col-lg-12 col-md-12 col-sm-12">
                                    <Box
              sx={{
                marginTop: "1rem",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                width:'100%',
                margin:'auto'
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54162.63123254484!2d35.86073700000001!3d31.956435!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca10ff839a7bf%3A0xa854064ff6e1a48b!2zRXZlbnRzIENvbnN1bHRhbnQgY29tcGFueSAtINi02LHZg9ipINin2YTZhdiz2KrYtNin2LEg2YTZhNmF2KTYqtmF2LHYp9iq!5e0!3m2!1sen!2sus!4v1728902606826!5m2!1sen!2sus"
                width="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: "0", borderRadius: "8px" }}
              ></iframe>
            </Box>
                                    </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
           
                    <div className="auto-container">
                        <div className="inner-container clearfix">
                            <div className="copyright-text">
                                <p>&copy; Copyright {(new Date().getFullYear())} All Rights Reserved by <Link to="" target='_blank'>Event Consultant.</Link></p>

                            </div>
                            <p> Designed and Developed by   <Link to="https://mayazin.net/" target='_blank'>  MAYAZIN</Link></p>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterV1;