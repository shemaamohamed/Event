import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/AuthContext';
import NotificationDropdown from "../Notification";
import styled from 'styled-components';

const CustomNavbar = styled(Navbar)`
  width: 98%;
  margin: auto;
  border:none
`;

const CustomBrand = styled(Navbar.Brand)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff !important;
  cursor: pointer;
  
  img {
    width: 100px;
  }
`;

const CustomNav = styled(Nav)`
  .nav-link {
    background-color: #ffffff !important; /* White background */
    color: #c82333 !important; /* Red text */
    font-family: "Arial", sans-serif;
    font-size: 1rem;
    
    &:hover {
      color: #d90429!important;
    }
  }
`;

const AuthButton = styled.div`
  background-color: #c82333; /* Red button background */
  color: #fff;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px; /* Adjust margin as needed */
  border: 1px solid #c82333; /* Red border */

  &:hover {
    background-color: #d90429; /* Darker red on hover */
  }
`;

const RegisterButton = styled.div`
  background-color: transparent;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #c82333; /* Red text for register button */
  border: 1px solid #c82333; /* Red border */

  &:hover {
    background-color: #c82333; /* Red background on hover */
    color: #fff; /* White text on hover */
  }
`;
const StyledNotificationDropdown = styled(NotificationDropdown)`
  margin: 10px 20px;  /* Adjust the margins */
  padding: 5px;       /* Add padding */
  background-color: #f8f9fa;  /* Set background color */
  border-radius: 8px;   /* Add rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Optional shadow for effect */

  &:hover {
    background-color: #e9ecef;  /* Change background on hover */
  }
`;

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, isLoggedIn } = useAuth();

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
        {
          label: "Upcoming Events",
          url: "#",
          subMenu: "upcoming",
          subLinks: [
            { label: "Event", url: "up/event" },
          ],
        },
        {
          label: "Previous Events",
          url: "#",
          subMenu: "previous",
          subLinks: [{ label: "Gallery", url: "/gallery" }],
        },
      ],
    },
    {
      title: "Travel & Tourism",
      links: [{ label: "Sights", url: "/tour_slider" }],
    },
   
  ];

  const renderMenu = () => {
    return menuItems.map((menuItem, index) => (
      <NavDropdown key={index} title={menuItem.title} id={`navbar-dropdown-${index}`}>
        {menuItem.links.map((link, linkIndex) => (
          link.subLinks ? (
            <NavDropdown.Item key={linkIndex} >
              {link.label}
              <NavDropdown.Divider />
              {link.subLinks.map((subLink, subIndex) => (
                <NavDropdown.Item key={subIndex} onClick={() => navigate(subLink.url)}>
                  {subLink.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown.Item>
          ) : (
            <NavDropdown.Item key={linkIndex} onClick={() => navigate(link.url)}>
              {link.label}
            </NavDropdown.Item>
          )
        ))}
      </NavDropdown>
    ));
  };

  return (
    <CustomNavbar expand="lg">
        <CustomBrand onClick={() => navigate("/home")}>
          <img src={require("./logo.png")} alt="Logo" />
        </CustomBrand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <CustomNav className="me-auto">
          {renderMenu()}
          <Nav.Link onClick={() => navigate("/contact_us")}>Contact Us</Nav.Link>
        <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
        </CustomNav>
        

        <Nav>
          {isLoggedIn ? (
            <div className="d-flex align-items-center ">
                <div style={{ margin: '10px 20px' }}>
                        <NotificationDropdown />
                      </div>            


              <AuthButton
                onClick={() => {
                  logout();
                  navigate("/login");
                }}

              >
                Logout
              </AuthButton>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-evenly">
              <AuthButton onClick={() => navigate("/login")} className="marginrigt">Login</AuthButton>
              <RegisterButton onClick={() => navigate("/registertype")}>Register</RegisterButton>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </CustomNavbar>
  );
};

export default NavBar;
