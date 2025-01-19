import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'

const MainMenu = ({ parentMenu, toggleMenu, toggleMultiMenu }) => {
    return (
        <>
            <ul className="navigation clearfix">
                <li className={`dropdown ${parentMenu === 'home' ? 'current' : ''} `}>
                    <Link to={void (0)} onClick={toggleMenu}>Home</Link>
                    <ul className='sub-menu'>
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
                    <div className="dropdown-btn" ><span className="fa fa-angle-down"></span></div>
                </li>
                
                <li className={`dropdown ${parentMenu === 'services' ? 'current' : ''}`}>
                    <Link to={void (0)} onClick={toggleMenu}>Services</Link>
                    <ul className='sub-menu'>
                        <li><Link to="/conf">Conferences</Link></li>
                        <li><Link to="/expositions">Exhibitions</Link></li>
                        <li><Link to="/workshops">Workshops</Link></li>
                        <li><Link to="/seminars">Seminars</Link></li>
                        <li><Link to="/corporate_meetings">Corporate Meetings</Link></li>
                        <li><Link to="/planning">Event Planning</Link></li>
                        <li><Link to="/media_campaign">Media Campaigns</Link></li>
                        <li><Link to="/logistic_secretarial">Logistics</Link></li>
                        <li><Link to="/social_events">Social Events</Link></li>
                        <li><Link to="/concept_creation">Concept Creation</Link></li>
                        <li><Link to="/management_consulting">Management Consulting</Link></li>
                    </ul>
                    <div className="dropdown-btn"><span className="fa fa-angle-down"></span></div>
                </li>
                <li className={`dropdown ${parentMenu === ' additional services' ? 'current' : ''}`}>
                    <Link to={void (0)} onClick={toggleMenu}>Additional Services</Link>
                    <ul className='sub-menu'>
                        <li><Link to="/comprehensive-conference-management">Comprehensive Conference Management Services</Link></li>
                        <li><Link to="/conference-exhibition-solutions">Professional Conference and Exhibition Solutions – Booths Creation</Link></li>
                        <li><Link to="/marketing-video-production">Professional Marketing Video Production</Link></li>
                        <li><Link to="/comprehensive-marketing-services">Comprehensive Marketing Services</Link></li>
                        <li><Link to="/additional-conference-exhibition-services">Expanding Excellence: Additional Services for Conferences and Exhibitions</Link></li>
                    </ul>
                    <div className="dropdown-btn"><span className="fa fa-angle-down"></span></div>
                </li>
                <li className={`dropdown ${parentMenu === ' events ' ? 'current' : ''}`}>
                    <Link to={void (0)} onClick={toggleMenu}>Events </Link>
                    <ul className='sub-menu'>
                        <li><Link to="/up/event">Upcoming Events</Link></li>
                        <li><Link to="/gallery"> Previous Events</Link></li>
                        
                    </ul>
                    <div className="dropdown-btn"><span className="fa fa-angle-down"></span></div>
                </li>
                <li className={`dropdown ${parentMenu === ' Travel and Tourism ' ? 'current' : ''}`}>
                    <Link to={void (0)} onClick={toggleMenu}>Travel and Tourism </Link>
                    <ul className='sub-menu'>
                        <li><Link to="/tour_slider">Sights</Link></li>
                        
                    </ul>
                    <div className="dropdown-btn"><span className="fa fa-angle-down"></span></div>
                </li>
              
              
               
                
                <li><Link to="/contact_us">Contact</Link></li>
            </ul>
        </>
    );
};

export default MainMenu;