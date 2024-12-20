import React from 'react';
import { Box, Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
const LogisticSecretarial = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' });
}, []);

  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url("/image/LogisticSecretarialBackground.png")', 
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
          data-aos="fade-left"
        >
          Logistic Secretarial Services
        </Typography>
      </Box>

      {/* Content Section */}
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
          Our Services Include:
        </Typography>

        <List sx={{ mb: 3 }}>
          {[
            "Coordination: Liaise with the event initiator, speakers, participants, and suppliers to ensure smooth communication and execution.",
            "Communication: Mail invitations, registration forms, and essential information to all relevant parties.",
            "Abstract Management: Receive and manage abstracts for review and inclusion in the event.",
            "Registration Handling: Process registration forms and participants' fees, ensuring all data is accurately recorded.",
            "Invoicing: Prepare and mail invoices to participants and sponsors as required.",
            "Document Management: Update and maintain all event documents and lists to reflect the latest information.",
            "Payments: Handle payments for event-related expenses in a timely manner.",
            "On-Site Registration: Oversee site registration procedures, including the distribution of badges, conference kits, and other materials.",
          ].map((service, index) => (
            <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
              <ListItemText primary={service} />
            </ListItem>
          ))}
        </List>

        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            lineHeight: 1.6,
            fontSize: '1.1rem',
            textAlign: 'justify',
          }}
        >
          Our comprehensive logistic and secretarial services are designed to ensure that every administrative detail is managed
          efficiently, allowing you to focus on delivering a successful event.
        </Typography>
      </Container>
    </>
  );
};

export default LogisticSecretarial;
