import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import './style.scss'; 
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CorporateMeetings = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-out' });
    }, []);
  return (
    <>
  
      <Box
        sx={{
          backgroundImage: 'url("/image/CorporateMeetingsBackground.png")', 
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
          Corporate Meetings
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            lineHeight: 1.6,
            fontSize: '1.1rem',
            marginBottom: 2,
          }}
        >
          Conferences have traditionally provided opportunities for networking, socializing, and hearing the latest 
          management speak. But they have rarely been exploited to their full potential as a forum for creative 
          problem solving and for mobilizing delegates into meaningful action. Events consultant will give advice and 
          assistance on how to achieve this. The stage setting for any conference is critical to the reception of the 
          message. Set design, lighting, quality of sound, and projection all contribute to communication.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            lineHeight: 1.6,
            fontSize: '1.1rem',
            marginBottom: 2,
          }}
        >
          Our very skilled staff carefully provides for all phases of a conference, such as planning, preparation, 
          and management. Our knowledge, based on years of experience in the field of events management, allows us 
          to use the resources at our disposal in the best way possible to obtain successful results for our Clients.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            lineHeight: 1.6,
            fontSize: '1.1rem',
          }}
        >
          Formulation of a budget, management of all preparations, multilingual assistance, translations, technical, 
          and audio-visual support are some of the services that we supply to meet in an efficient way all types of 
          requirements.
        </Typography>
      </Container>
    </>
  );
};

export default CorporateMeetings;
