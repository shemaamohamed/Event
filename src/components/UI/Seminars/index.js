import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const Seminars = () => {
  useEffect(() => {
          AOS.init({ duration: 1000, easing: 'ease-out' });
      }, []);
  

  return (
    <>
      <Box
        sx={{
          minHeight: '50vh',
          backgroundImage: 'url("/image/SeminarsBackground.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
          data-aos="fade-left"

        >
          Seminars
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center',
            color: '#c62828' 
          }}
        >
          Elevate Your Seminars to Inspire and Engage
        </Typography>
        <Typography variant="body1" >
          Conferences have traditionally provided opportunities for networking, socializing, and hearing the latest management speak. However, they have rarely been exploited to their full potential as a forum for creative problem-solving and for mobilizing delegates into meaningful action. Our expert event consultants will guide you in achieving this.
        </Typography>
        <Typography variant="body1"  >
          The stage setting for any conference is critical to the reception of the message. Set design, lighting, quality of sound, and projection all contribute to effective communication. Our highly skilled staff handles all phases of a conference with care, from planning to preparation and management.
        </Typography>
        <Typography variant="body1"  >
          With years of experience in events management, we leverage our knowledge and resources to deliver successful outcomes for our clients. We offer comprehensive services including budget formulation, multilingual assistance, translations, and technical support to meet all types of requirements.
        </Typography>
      </Container>
    </>
  );
};

export default Seminars;
