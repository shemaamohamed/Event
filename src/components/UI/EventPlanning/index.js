import React, { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const Planning = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' });
}, []);

   
  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url("/image/EventPlanningBackground.png")', 
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
          Event Planning
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
          Success Doesn't Just Happen—It’s Planned
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
          Success is never accidental; it’s the result of meticulous planning. In the realm of event management, 
          careful planning is the foundation that ensures every detail aligns perfectly to create an unforgettable experience.
          Effective event planning is crucial because it sets the stage for a seamless execution, anticipates potential challenges,
          and maximizes the impact of the event.
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
          At Events Consultant, we are committed to mastering the art of planning. You can trust that we consistently deliver
          outstanding results. Our expert planning and budgeting processes guarantee that deadlines are met, and budget overruns
          are avoided, allowing you to focus on the success of your event without concern.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            lineHeight: 1.6,
            fontSize: '1.1rem',
          }}
        >
          The importance of planning cannot be overstated—it’s what transforms a vision into reality. By prioritizing detailed preparation,
          we ensure that each event runs smoothly, meets its objectives, and leaves a lasting impression on all attendees. With 
          [Your Company Name], you are not just planning an event; you are crafting a memorable experience that reflects your goals and values.
        </Typography>
      </Container>
    </>
  );
};

export default Planning;
