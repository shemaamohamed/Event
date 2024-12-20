import React, { useEffect } from 'react';
import { Box, Typography, Container, List, ListItem } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const ManagementConsulting = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' });
}, []);
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Headline Section with Background Image */}
      <Box
        sx={{
          backgroundImage: 'url("/image/management-consulting-bg.png")', // Update image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: 'white',
          textShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            px: 1.5,
            fontSize:{
              xs:'1.5rem',
              sm:'2rem',
              md:'3rem'
            },
            textShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',

          }}
          data-aos="fade-right"

        >
          Management Consulting
        </Typography>
      </Box>

      {/* Content Section */}
      <Container sx={{ py: 5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center',
            color: 'gray' 
          }}
        >
          What We Do ... And How We Do It
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: 'text.secondary',
            textAlign: 'justify',
            mb: 3,
          }}
        >
          Our clients reach out to us when they face critical challenges—whether they are dealing with significant strategic or
          operational needs, or navigating complex organizational issues. They rely on us for honest, objective, and thoughtful
          advice, backed by our extensive experience.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: 'text.secondary',
            textAlign: 'justify',
            mb: 3,
          }}
        >
          Clients turn to us when they are under pressure to deliver results, especially in uncertain times. They seek our
          guidance when information is hard to come by and insights are limited. They trust us to help them make decisions that
          will have lasting impacts on their people, organizations, and the countries in which they operate. Our clients value
          our ability to provide a truly global perspective.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#c62828' ,

            mb: 2,
          }}
        >
          We achieve this by adhering to the following core principles:
        </Typography>

        <List>
          {[
            'Top Management Approach: We engage directly with top management to address the most critical issues.',
            'Global Network: We leverage our extensive global network to deliver the best solutions to all clients.',
            'Innovation in Management Practice: We bring cutting-edge innovations in management practices to our clients.',
            'Building Client Capabilities: We focus on enhancing client capabilities to ensure sustained improvement.',
          ].map((principle, index) => (
            <ListItem
              key={index}
              sx={{
                display: 'list-item',
                listStyleType: 'disc',
                color: 'text.primary',
                fontSize: '1.1rem',
                mb: 1,
              }}
            >
              {principle}
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default ManagementConsulting;
