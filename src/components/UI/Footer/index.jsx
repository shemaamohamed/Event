import React from "react";
import { FaFacebookSquare, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Container, Grid, Typography, Box, Divider } from "@mui/material";

import "./style.scss";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
            width: "130",
            height: "100px",
          }}
        >
          <Link to="/">
            <img
              src="/image/logo3.jpg"
              width={130}
              height={90}
              alt="Company Logo"
              className="logo"
            />
          </Link>
        </Box>
        {/* Footer Content */}
        <Grid container spacing={2}>
          {/* About Us Section */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6">About Us</Typography>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                marginTop: ".9rem",
              }}
            >
              <span
                style={{
                  color: "#c62828",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                E
              </span>
              vent Consultant is a company specializing in the preparation,
              organization, and marketing of scientific conferences,
              exhibitions, workshops, and seminars in Jordan. Although newly
              established, the company boasts a pioneering team of professionals
              with extensive experience in supervising and managing various
              conferences and exhibitions across Jordan.
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {/* Quick Links Section */}
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "secondary",
                  }}
                >
                  Quick Links
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    listStyleType: "none",
                    padding: 0,
                    transition: "color 0.5s ease-in-out",
                  }}
                >
                  <Box component="li">
                    <StyledLink to="/">Home</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/about">About Us</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/services">Services</StyledLink>
                  </Box>
                  <StyledBox component="li">
                    <StyledLink to="/contact_us">Contact Us</StyledLink>
                  </StyledBox>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: "secondary" }}>
                  Services
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    listStyleType: "none",
                    padding: 0,
                    transition: "color 0.5s ease-in-out",
                  }}
                >
                  <Box component="li">
                    <StyledLink to="/conf">Conferences</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/expositions">Exhibitions</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/workshops">Workshops</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/seminars">Seminars</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/corporate_meetings">
                      Corporate Meetings
                    </StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/planning">Planning Meeting</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/media_campaign">
                      Media Campaigns
                    </StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/logistic_secretarial">
                      Logistics
                    </StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/social_events">Social Events</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/concept_creation">
                      Concept Creation
                    </StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/management_consulting">
                      Management Consulting
                    </StyledLink>
                  </Box>
                </Box>
              </Grid>

              {/* Additional Links Section */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: "secondary" }}>
                  More Links
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    listStyleType: "none",
                    padding: 0,
                    transition: "color 0.5s ease-in-out",
                  }}
                >
                  <Box component="li">
                    <StyledLink to="/about">Our Story</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/our_team">Team</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/our_clients">Clients</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/gallery">Gallery</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/job/list">Careers</StyledLink>
                  </Box>
                  <Box component="li">
                    <StyledLink to="/faq">FAQs</StyledLink>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Contact Us</Typography>
            <Box
              component="ul"
              sx={{
                listStyleType: "none",
                padding: 0,
                transition: "color 0.5s ease-in-out",
              }}
            >
              <Box
                component="li"
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <FaPhoneAlt color="gray" />

                <StyledLink href="tel:+962799602002">
                  +962 79 960 2002
                </StyledLink>
              </Box>
              <Box
                component="li"
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <FaEnvelope color="gray" />
                <StyledLink href="mailto:info@eventscons.com">
                  info@eventscons.com
                </StyledLink>
              </Box>
              <StyledBox
                component="li"
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <FaMapMarkerAlt color="gray" />
                Rawhi Al Katabi Commercial Complex, Al Wakalat St 7, Amman,
                Jordan
              </StyledBox>
            </Box>

            {/* Google Map Embed */}
            <Box
              sx={{
                marginTop: "1rem",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54162.63123254484!2d35.86073700000001!3d31.956435!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca10ff839a7bf%3A0xa854064ff6e1a48b!2zRXZlbnRzIENvbnN1bHRhbnQgY29tcGFueSAtINi02LHZg9ipINin2YTZhdiz2KrYtNin2LEg2YTZhNmF2KTYqtmF2LHYp9iq!5e0!3m2!1sen!2sus!4v1728902606826!5m2!1sen!2sus"
                width="100%"
                height="200"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: "0", borderRadius: "8px" }}
              ></iframe>
            </Box>
          </Grid>
        </Grid>

        <hr style={{ color: "gray", marginTop: "1rem" }} />
        {/* Social Media Links */}
        <Box
          sx={{
            display: "flex",
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
            href="https://www.facebook.com/eventsconsultant.jo/"
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

        <Divider sx={{ marginTop: "1.5rem", borderColor: "#f1f1f1" }} />

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#f1f1f1",
          }}
        >
          &copy; {new Date().getFullYear()} Event Consultant. All Rights
          Reserved.
        </Typography>
        {/* Developer */}
        <Typography variant="caption" color="white">
          Designed and Developed by{" "}
          <Link
            href="#"
            style={{
              color: "gray",
              textDecoration: "none",
              transition: "0.5s ease-in-out",
              cursor: "pointer",
              textDecorationLine: "none",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "gray",

                cursor: "pointer",
                "&:hover": {
                  color: "#c62828",
                  textDecoration: "underline",
                },
              }}
            >
              {/* Shimaa Mohamed */}
            </Typography>
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;