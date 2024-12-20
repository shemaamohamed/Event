import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const SocialEvents = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' });
}, []);

  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url("/image/SocialEBackground.png")', 
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
            textAlign: 'center',
          }}
          data-aos="fade-down"
        >
          SOCIAL EVENTS
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            color: '#c62828' ,
            textAlign: 'center',
          }}
        >
          Enhancing Your Event with Exceptional Social Programs
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: 'text.secondary',
            lineHeight: 1.6,
            textAlign: 'justify',
            fontSize: '1.1rem',
          }}
        >
          A key highlight of many events is the social program that runs alongside the main activities. Our team specializes in
          advising on suitable social events and handles the complete logistics and planning for any agreed-upon program. This may
          include opening and closing ceremonies, lunches and dinners, receptions, and themed parties, all designed to enhance the
          overall experience of your event.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            textAlign: 'justify',
            fontSize: '1.1rem',
          }}
        >
          For participants and their accompanying guests who wish to explore the country before or after the event, we also
          organize a variety of excursions and tours. These curated experiences ensure that every participant leaves with
          unforgettable memories, adding an extra dimension of enjoyment to their visit.
        </Typography>
      </Container>
    </>
  );
};

export default SocialEvents;
