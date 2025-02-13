import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/AuthContext';
import NotificationDropdown from "../Notification";
import styled from 'styled-components';
import { FaEnvelope, FaFacebookSquare, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaYoutube } from 'react-icons/fa';
import { Box } from '@mui/material';
import { IoLogoWhatsapp } from 'react-icons/io';
import { Link } from "react-router-dom";


const StyledLink = styled(Link)`
  color: gray;
  text-decoration: underline;
  font-size: 0.9rem;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    color: #f1f1f1;
  }
`;
const StyledBox = styled(Box)`
 color: gray;
  text-decoration: none;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    color: #f1f1f1;
  },
`;

const CustomNavbar = styled(Navbar)`
  width: 98%;
  margin: auto;
  border: none;
`;

const CustomBrand = styled(Navbar.Brand)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff !important;
  cursor: pointer;
  
  img {
    width: 80px; /* Adjusted for responsiveness */
  }
`;

const CustomNav = styled(Nav)`
  .nav-link {
    background-color: #ffffff !important;
    color: #c82333 !important;
    font-family: "Arial", sans-serif;
    font-size: 1rem;
    
    &:hover {
      color: #d90429!important;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthButton = styled.div`
  background-color: #c82333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #c82333;

  &:hover {
    background-color: #d90429;
  }
`;

const RegisterButton = styled(AuthButton)`
  background-color: transparent;
  color: #c82333;

  &:hover {
    background-color: #c82333;
    color: #fff;
  }
`;

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, isLoggedIn } = useAuth();
  const [expanded, setExpanded] = useState(false); // Track the state of the Navbar

  const handleClose = () => setExpanded(false); // Function to close the menu

  const menuItems = [
    {
      title: "Home",
      links: [
        { label: "Home", url: "/home" },
        { label: "Conferences", url: "/conferences" },
        { label: "Exhibitions", url: "/page/exhibitions" },
        { label: "Our Story", url: "/about_us" },
        { label: "Team", url: "/our_team" },
        { label: "Clients", url: "/our_clients" },
        { label: "Gallery", url: "/gallery" },
        { label: "Careers", url: "/job/list" },
        { label: "FAQs", url: "/faq" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Conferences", url: "/conf" },
        { label: "Exposition", url: "/expositions" },
        { label: "Workshops", url: "/workshops" },
        { label: "Seminars", url: "/seminars" },
        { label: "Corporate Meetings", url: "/corporate_meetings" },
        { label: "Event Planning", url: "/planning" },
        { label: "Media Campaigns", url: "/media_campaign" },
        { label: "Logistics", url: "/logistic_secretarial" },
        { label: "Social Events", url: "/social_events" },
        { label: "Concept Creation", url: "/concept_creation" },
        { label: "Management Consulting", url: "/management_consulting" },
      ],
    },
    {
      title: "Events",
      links: [
        { label: "Upcoming Events", url: "/up/event" },
        { label: "Previous Events", url: "/gallery" },
      ],
    },
    {
      title: "Travel & Tourism",
      links: [{ label: "Sights", url: "/tour_slider" }],
    },
  ];

  const renderMenu = () =>
    menuItems.map((menuItem, index) => (
      <NavDropdown
      style={{
        display: 'flex',
      justifyContent: 'center',
      }}
       key={index} title={menuItem.title} id={`offcanvas-navbar-dropdown-${index}`}>
        {menuItem.links.map((link, linkIndex) => (
          <NavDropdown.Item key={linkIndex} onClick={() =>{ navigate(link.url);handleClose();}}>
            {link.label}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    ));

  return (
    <CustomNavbar expand="lg"  expanded={expanded}>
      <Container fluid sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CustomBrand onClick={() => navigate("/home")}>
          <img src={require("./logo.png")} alt="Logo" />
        </CustomBrand>

        <Navbar.Toggle aria-controls="offcanvasNavbar"
            onClick={() => setExpanded(!expanded)} 
         />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          onHide={() => setExpanded(false)}


        >
          <Offcanvas.Header closeButton>
          </Offcanvas.Header>
          <Offcanvas.Body 
             className="d-flex align-items-center justify-content-between flex-column flex-lg-row"

          
          >
            <CustomNav 
            style={{
              display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
            >
              {renderMenu()}
              <Nav.Link onClick={() =>{ navigate("/contact_us");  handleClose();}}>Contact Us</Nav.Link>
              <Nav.Link onClick={() =>{ navigate("/about");  handleClose();}}>About</Nav.Link>
              <Box
          sx={{
            display: {
              sm:'flex',
              xs:'flex',
              md:'none',
              lg:'none',
              xl:'none',
            },
            justifyContent: "center",
            marginTop: "1rem",
            gap: 2,
          }}
        >
          <a
            href="https://api.whatsapp.com/send?phone=%2B962799602002"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <Box
              sx={{
                backgroundColor: "#25d366",
                borderRadius: "50%",
                padding: "0.5rem",
                border: "1px solid #25d366",
                transition: "0.5s ease-in-out",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <IoLogoWhatsapp size={30} color="white" />
            </Box>
          </a>
          <a
            href="https://www.youtube.com/channel/UC6wJycA901VnU6chdmqP58Q"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <Box
              sx={{
                backgroundColor: "#ff0000",
                borderRadius: "50%",
                padding: "0.5rem",
                border: "1px solid #ff0000",
                transition: "0.5s ease-in-out",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <FaYoutube size={30} color="white" />
            </Box>
          </a>
          <a
            href="https://www.linkedin.com/company/events-consultant/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <Box
              sx={{
                backgroundColor: "#0077b5",
                borderRadius: "50%",
                padding: "0.5rem",
                transition: "0.5s ease-in-out",
                border: "1px solid #0077b5",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <FaLinkedin size={30} color="white" />
            </Box>
          </a>
          <a
            href="https://www.facebook.com/eventscons/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <Box
              sx={{
                backgroundColor: "#3b5998",
                borderRadius: "50%",
                padding: "0.5rem",
                transition: "0.5s ease-in-out",
                border: "1px solid #3b5998",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <FaFacebookSquare size={30} color="white" />
            </Box>
          </a>
              </Box>
                <Box
                            component="ul"
                            sx={{
                              listStyleType: "none",
                              padding: 0,
                              transition: "color 0.5s ease-in-out",
                              flexDirection:'row',
                             
                              marginTop:'1.5rem',
                              gap: 1,
                              display: {
                                sm:'flex',
                                xs:'flex',
                                md:'none',
                                lg:'none',
                                xl:'none',
                              },
                            }}
                          >
                            <Box
                              component="li"
                              sx={{
                                display: "flex",
                                gap: 2,
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'column',
                                width:'20%'

                                
                              }}
                            >
                              <FaPhoneAlt color="gray" />
              
                              <FaEnvelope color="gray" />

                            </Box>
                            <Box
                              component="li"
                              sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent:'center',
                                flexDirection:'column',
                                width:'80%'

                                
                              }}
                            >
                              <StyledLink href="tel:+962799602002">
                                +962 79 960 2002
                              </StyledLink>
                              <StyledLink href="mailto:info@eventscons.com">
                                info@eventscons.com
                              </StyledLink>
                            </Box>
                           
                          </Box>
                           <StyledBox
                              component="li"
                              sx={{
                                gap: 2,
                                display: {
                                  sm:'flex',
                                  xs:'flex',
                                  md:'none',
                                  lg:'none',
                                  xl:'none',
                                },
                                
                              }}
                            >
                              <FaMapMarkerAlt color="gray" />
                              Rawhi Al Katabi Commercial Complex, Al Wakalat St 7, Amman,
                              Jordan
                            </StyledBox>
              
                         
            </CustomNav>

            <Nav>
              {isLoggedIn ? (
                <ButtonWrapper>
                  <NotificationDropdown />
                  <AuthButton
                    onClick={() => {
                      logout();
                      navigate("/login");
                      handleClose();
                    }}
                  >
                    Logout
                  </AuthButton>
                </ButtonWrapper>
              ) : (
                <ButtonWrapper 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                  <AuthButton onClick={() => {navigate("/login"); handleClose();}}>Login</AuthButton>
                  <RegisterButton onClick={() => {navigate("/registertype"); handleClose();}}>Register</RegisterButton>
                </ButtonWrapper>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </CustomNavbar>
  );
};

export default NavBar;
