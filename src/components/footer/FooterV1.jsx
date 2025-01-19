import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link'
import SocialShare from '../others/SocialShare';
import { Gallery } from 'react-photoswipe-gallery';
import SingleGalleryV1 from '../gallery/SingleGalleryV1';
import axios from 'axios';

const FooterV1 = () => {
     const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    
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
                                                <Link to="/#"><img src="/images/logo.png" alt="image" /></Link>
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
                                           <li><Link to="/#">Home </Link></li>
                                                                   <li><Link to="/conferences">Conferences </Link></li>
                                                                   <li><Link to="/page/exhibitions">Exhibition </Link></li>
                                           
                                           
                                                                   <li><Link to="/about-us#" >Our Story</Link></li>
                                                                   <li><Link to="/our_team" >Our Team</Link></li>
                                                                   <li><Link to="/our_clients" >Our Clients</Link></li>
                                                                   <li><Link to="/gallery" >Gallery</Link></li>
                                                                   <li><Link to="/job/list" >Careers</Link></li>
                                                                   <li><Link to="/faq" >FAQs</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="big-column col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                <div className="row">
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
                                                        <div className="text"> Rawhi Al Katabi Commercial Complex, Al Wakalat St 7, Amman,
                                                        Jordan</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                                        <div className="footer-widget widget-ps-50 instagram-widget">
                                            <h2 className="widget-title"> Gallery</h2>
                                            <div className="widget-content">
                                                <div className="outer insta-outer clearfix">
                                                    <Gallery withDownloadButton>
                                                        {images.slice(0, 6).map(album =>
                                                            <SingleGalleryV1 key={album.id} album={album} />
                                                        )}
                                                    </Gallery>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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