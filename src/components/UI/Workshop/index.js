import React, { useEffect } from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CheckListItem = ({ text, aosEffect, delay }) => (
  <ListItem
    disablePadding
    data-aos={aosEffect}
    data-aos-delay={delay}
    sx={{
      mb: 2,
      display: 'flex',
      alignItems: 'start',
      flexDirection: 'row',
    }}
  >
    <ListItemIcon sx={{ minWidth: '36px', color: 'gray' }}>
      <CheckCircleIcon />
    </ListItemIcon>
    <ListItemText
      primary={
        <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
          {text}
        </Typography>
      }
    />
  </ListItem>
);

const Workshops = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' });
  }, []);

  const highlights = [
    "Workshops foster collaboration and hands-on learning, providing participants with actionable skills and deeper engagement.",
    "Our team ensures a seamless experience by organizing workshops tailored to specific audiences and industries.",
    "We create engaging environments with state-of-the-art tools and resources to maximize learning outcomes.",
    "Promotional strategies like custom websites, social media campaigns, and attractive materials guarantee high attendance and impact.",
    "Our extensive network allows us to collaborate with expert speakers, ensuring content quality and relevance for attendees.",
  ];

  return (
    <>
      <Box
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: "url('/image/Workshopsbackground.png')", 
          height: { xs: '50vh', sm: '70vh', md: '50vh' },
          padding: { xs: 2, md: 5 },
          mb: 4,
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
          Workshops
        </Typography>
      </Box>

      <Grid
        container
        spacing={4}
        px={{ xs: 2, md: 5 }}
        sx={{
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} md={8} sx={{ padding: { xs: 2, md: 4 } }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}
          >
            Unlock the Potential of Your Team with Our Workshops
          </Typography>
          <List sx={{ listStyleType: 'none', padding: 0 }}>
            {highlights.map((highlight, index) => (
              <CheckListItem
                key={index}
                text={highlight}
              />
            ))}
          </List>
        </Grid>

        
      </Grid>
    </>
  );
};

export default Workshops;
