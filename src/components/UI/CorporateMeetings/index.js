import React from 'react';
import { Box, Typography, Container, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { CircleChevronRight } from 'lucide-react';
import { useEffect } from 'react';


const CorporateMeetings = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' });
}, []);

    const points = [
      `Conferences have traditionally provided opportunities for networking, socializing, and hearing the latest management speak. But they have rarely been exploited to their full potential as a forum for creative problem solving and for mobilizing delegates into meaningful action. Events consultant will give advice and assistance on how to achieve this. The stage setting for any conference is critical to the reception of the message. Set design, lighting, quality of sound, and projection all contribute to communication.`,
      `Our very skilled staff carefully provides for all phases of a conference, such as planning, preparation, 
          and management. Our knowledge, based on years of experience in the field of events management, allows us 
          to use the resources at our disposal in the best way possible to obtain successful results for our Clients.`,
      `Formulation of a budget, management of all preparations, multilingual assistance, translations, technical, 
          and audio-visual support are some of the services that we supply to meet in an efficient way all types of 
          requirements.`
    ];
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
          data-aos="fade-down"

        >
          Corporate Meetings
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Grid container
        spacing={2} justifyContent="center"
        >
          <Grid item xs={12}>
                        <List>
                            {points.map((point, index) => (
                                <ListItem
                                    key={index}
                                    disablePadding
                                    sx={{
                                        mb: 2,
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: '36px', color: '#c62828' , mt: 1 }}>
                                        <CircleChevronRight />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="body1"
                                                sx={{ fontSize: '1.2rem', lineHeight: 1.8 }}
                                            >
                                                {point}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

        </Grid>
      </Container>
    </>
  );
};

export default CorporateMeetings;
