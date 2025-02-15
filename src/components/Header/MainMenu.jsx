import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link'
import { useAuth } from '../../common/AuthContext';

const MainMenu = ({ parentMenu, toggleMenu, toggleMultiMenu ,handleCloseMenu}) => {
    const navigate =useNavigate();
    const handleHomeClick = (e) => {
        toggleMenu(e);
        handleCloseMenu();
        navigate('/home'); 
      };
       const {  isLoggedIn } = useAuth();
      
    return (
        <>
            <ul className="navigation clearfix">
                <li className={`dropdown ${parentMenu === 'home' ? 'current' : ''} `}>
                    <Link   to="/home" onClick={handleHomeClick}>Home</Link>
                    <ul className='sub-menu'>
                        {/* <li><Link to="/#">Home </Link></li> */}
                        <li><Link onClick={handleCloseMenu} to="/conferences">Conferences </Link></li>
                        <li><Link onClick={handleCloseMenu} to="/page/exhibitions">Exhibition </Link></li>


                        <li><Link onClick={handleCloseMenu} to="/about-us#" >Our Story</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/our_team" >Our Team</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/our_clients" >Our Clients</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/gallery" >Gallery</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/job/list" >Careers</Link></li>
                        {
                            isLoggedIn && (
                                <li><Link onClick={handleCloseMenu} to="/faq" >FAQs</Link></li>

                            )
                        }






                     
                   
                    </ul>
                    <div className="dropdown-btn" ><span className="fa fa-angle-down"></span></div>
                </li>
                
                <li className={`dropdown ${parentMenu === 'services' ? 'current' : ''}`}>
                    <Link to={void (0)} onClick={toggleMenu}>Services</Link>
                    <ul className='sub-menu'>
                        <li><Link onClick={handleCloseMenu} to="/conf">Conferences</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/expositions">Exhibitions</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/workshops">Workshops</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/seminars">Seminars</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/corporate_meetings">Corporate Meetings</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/planning">Event Planning</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/media_campaign">Media Campaigns</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/logistic_secretarial">Logistics</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/social_events">Social Events</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/concept_creation">Concept Creation</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/management_consulting">Management Consulting</Link></li>
                    </ul>
                    <div className="dropdown-btn"><span className="fa fa-angle-down"></span></div>
                </li>
                <li className={`dropdown ${parentMenu === ' additional services' ? 'current' : ''}`}>
                    <Link to={void (0)} onClick={toggleMenu}>Additional Services</Link>
                    <ul className='sub-menu'>
                        <li><Link onClick={handleCloseMenu} to="/comprehensive-conference-management"> Management </Link></li>
                        <li><Link onClick={handleCloseMenu} to="/conference-exhibition-solutions">Booths Creation</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/marketing-video-production">Video Production</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/comprehensive-marketing-services">Marketing </Link></li>
                        <li><Link onClick={handleCloseMenu} to="/additional-conference-exhibition-services">Expanding Excellence</Link></li>
                    </ul>
                    <div className="dropdown-btn"><span className="fa fa-angle-down"></span></div>
                </li>
                <li className={`dropdown ${parentMenu === ' events ' ? 'current' : ''}`}>
                    <Link to={void (0)} onClick={toggleMenu}>Events </Link>
                    <ul className='sub-menu'>
                        <li><Link onClick={handleCloseMenu} to="/up/event">Upcoming Events</Link></li>
                        <li><Link onClick={handleCloseMenu} to="/pre/con"> Previous Events</Link></li>

                        <li><Link onClick={handleCloseMenu} to="/gallery"> Gallery</Link></li>

                    </ul>
                    <div className="dropdown-btn"><span className="fa fa-angle-down"></span></div>
                </li>
                <li className={`dropdown ${parentMenu === ' Travel and Tourism ' ? 'current' : ''}`}>
                    <Link to={void (0)} onClick={toggleMenu}>Travel and Tourism </Link>
                    <ul className='sub-menu'>
                        <li><Link onClick={handleCloseMenu} to="/tour_slider">Sights</Link></li>
                        
                    </ul>
                    <div className="dropdown-btn"><span className="fa fa-angle-down"></span></div>
                </li>
              
              
               
                
                <li><Link onClick={handleCloseMenu} to="/contact_us">Contact</Link></li>
            </ul>
        </>
    );
};

export default MainMenu;