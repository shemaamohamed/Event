import React, { useEffect } from 'react';
import { Box, Typography, Container, List, ListItem } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const MediaCampaign = () => {
    useEffect(() => {
            AOS.init({ duration: 1000, easing: 'ease-out' });
        }, []);
    
  return (
    <>
      {/* Headline Section */}
      <Box
        sx={{
          backgroundImage: 'url("/image/MediaCampaignBackground.png")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',
          }}
          data-aos="fade-up"
        >
          Media Campaign
        </Typography>
      </Box>

      {/* Content Section */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            color: 'text.primary',
            textAlign: 'center',
            color:'#c62828'
          }}
        >
          Comprehensive Media and Marketing Services
        </Typography>

        <List sx={{ mb: 3 }}>
          <ListItem>- Conduct a thorough media campaign study.</ListItem>
          <ListItem>- Coordinate all press releases.</ListItem>
          <ListItem>- Organize and manage press conferences.</ListItem>
          <ListItem>- Arrange for all necessary media advertisements.</ListItem>
          <ListItem>- Oversee and control the pressroom during the congress.</ListItem>
        </List>

        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            lineHeight: 1.6,
            fontSize: '1.1rem',
            marginBottom: 3,
          }}
        >
          Our dedicated marketing department manages all aspects of publicity and marketing to help you effectively reach
          potential sponsors, participants, and delegates. Our creative team excels in designing and developing all print materials
          and oversees the production and distribution of information to your target audience.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 2,
            color:'gray'
          }}
        >
          Concept Creation:
        </Typography>

        <List>
          <ListItem>
            - Establishing objectives to creatively design and develop the overall branding and image for meetings and events.
          </ListItem>
          <ListItem>- Assisting in setting appropriate pricing for the event.</ListItem>
          <ListItem>- Developing sponsorship and exhibition opportunities.</ListItem>
          <ListItem>- Managing the budget and building strategic alliances effectively.</ListItem>
        </List>
      </Container>
    </>
  );
};

export default MediaCampaign;
