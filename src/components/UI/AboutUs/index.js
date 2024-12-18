import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, Box } from '@mui/material';
import { darken } from '@mui/system';


const AboutUsEvent = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* About Us Content Section */}
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: 2 }}>
            Our History
          </Typography>
          <section>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.7 }}>
              <span className="E" style={{ fontWeight: 700, color: '#c62828' }}>E</span>vent Consultant is a company specializing in the preparation, organization, and marketing of scientific conferences, exhibitions, workshops, and seminars in Jordan. Although newly established, the company boasts a pioneering team of professionals with extensive experience in supervising and managing various conferences and exhibitions across Jordan.
            </Typography>
          </section>

          <section>
            
            <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.7, marginTop: 2 }}>
            <span className="E" style={{ fontWeight: 700, color: '#c62828' }}>E</span>vent Consultant delivers services backed by global expertise to a diverse range of clients. From initial site selection through on-site management to post-event analysis, Event Consultant ensures comprehensive event arrangements and offers innovative solutions. We are committed to clear and effective communication, meticulous attention to detail, and delivering distinguished features that enhance every event.
            </Typography>
          </section>
        </Grid>

        {/* Buttons Section */}
        <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              
              sx={{
                backgroundColor: '#c62828',
                '&:hover': { 
                  backgroundColor: darken('#dc143c', 0.2),
                 },
                fontSize: '1rem',
                padding: '10px 20px',
                textTransform: 'none',
              }}
              component="a"
              href="./Company's Profile.pdf"
              download
            >
              Company Profile
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#c62828',
                '&:hover': { 
                  backgroundColor: darken('#dc143c', 0.2),
                 },
                fontSize: '1rem',
                padding: '10px 20px',
                textTransform: 'none',
              }}
              onClick={() => navigate("/contact_us")}
            >
              Contact Us
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUsEvent;
