import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { backendUrlImages } from '../../constant/config';

const PreConferences = () => {
  const [conferences, setConferences] = useState([]);
  // const BaseUrl = "https://panel.mayazin.co/api";
  const fetchConferences = async () => {
    try {
      const response = await axios.get(`https://panel.mayazin.co/api/conferences/past`);
      setConferences(response.data.data);
      console.log(response.data);
    } catch (error) {
      
      console.error('Error fetching conferences:', error.response ? error.response.data : error.message);
    } 
  };

  useEffect(() => {

    fetchConferences();
  }, []);


  return (
     <section className={`pricing-section-two ${"alternate"}`} style={{
      marginTop:'10vh'
    }}>
      <div className="sec-title  text-center">
  <h2 style={{ display: 'inline-block', borderBottom: '2px solid #9B1321', paddingBottom: '10px' }}>Previous Events
  </h2>
</div>
   
          <div className="anim-icons">
                  <span className="icon icon-line-1"></span>
                  <span className="icon icon-circle-1"></span>
                  <span className="icon icon-dots"></span>
          </div>
          <div className="auto-container"
          style={{
            width:'100%',
            maxWidth:'100%'
          }}
           >
          <div className="outer-box"
          style={{
            width:'100%',
            maxWidth:'100%'

          }}
          >
    <div className="upcoming-conferences-container"
    style={{
      padding:'20px',
    }}
    >
      <Grid container spacing={2} justifyContent="center">
      {conferences.map((conference) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={conference.id}>
          <Card
          sx={{
            width:'100%'
          }}
          >
            <CardMedia
            sx={{
              width:'100%',
              height:'30vh'
            }}
            >
              <img
              src={`${backendUrlImages}${conference?.image}`}
              alt={conference.title}
              style={{
                width:'100%',
                height:"100%"
              }}
              />
            </CardMedia>
            <CardContent
           
            >
              <Typography
              variant='h5'
              >
                {conference.title}

              </Typography>
              <Typography
              variant='body1'
              >
              Date:  {new Date(conference.start_date).toLocaleDateString('en-US', { year: 'numeric',day: 'numeric' , month: 'long'})}

              </Typography>
              <Typography
              variant='body1'
              >
               Location: {conference.location}

              </Typography>
              <Box
              sx={{
                display:'flex',
                flexDirection:'column',
              }}
              >
                <Button
                fullwidth
                sx={{

                  backgroundColor:"#9B1321",
                  color:'white'
                }}
                variant="contained" href={`${backendUrlImages}${conference.first_announcement_pdf.substring(conference.first_announcement_pdf.indexOf("/"+1) )}`} download
                >
                  First Announcement Document
                </Button>
                <Button
                full width
                variant="contained" 
                href={`${backendUrlImages}${conference.second_announcement_pdf.substring(conference.second_announcement_pdf.indexOf("/" +1) )}`}
                 download 
                sx={{

                  backgroundColor:"#9B1321",
                  color:'white',
                  marginTop:'5px'

                }}
                >
                  Second Announcement Document


                  
                </Button>
              </Box>

            </CardContent>

          </Card>
          {/* <Cardd
            imageUrl={`${backendUrlImages}${conference?.image}`}
            title={conference.title}
            description={conference.start_date}
            conference.location
          
          /> */}
        </Grid>
      ))}
    </Grid>
    </div>
          </div>
          </div>
          </section>
    





)
   
  
};

export default PreConferences;
