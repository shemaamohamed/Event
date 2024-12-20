import React, { useEffect } from 'react';
import { Box, Typography, Container, List, ListItem } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const ConceptCreation = () => {
      useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-out' });
    }, []);
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Box
        sx={{
          backgroundImage: 'url("/image/ConceptCreationBackground.png")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 'bold', textAlign: 'center', px: 2 }}
          data-aos="fade-up"

        >
          Concept Creation
        </Typography>
      </Box>

      {/* Content Section */}
      <Container sx={{ py: 5 }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.2rem',
            lineHeight: 1.8,
            textAlign: 'justify',
            mb: 3,
            color: '#c62828' 
          }}
        >
          Setting objectives to creatively design and develop the overall
          branding and image for the meetings or events.
        </Typography>

        <List sx={{ pl: 2 }}>
          {[
            'Assisting in setting proper event pricing.',
            'Developing sponsorship and exhibition opportunities.',
            'Managing the budget and building effective strategic alliances.',
          ].map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: 'list-item',
                listStyleType: 'disc',
                pl: 2,
                color: 'text.primary',
                fontSize: '1.1rem',
              }}
            >
              {item}
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default ConceptCreation;
