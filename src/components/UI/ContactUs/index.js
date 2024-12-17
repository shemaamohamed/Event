import React, { useState } from 'react';
import axios from 'axios';
import './style.scss';
import { Container, Grid, InputAdornment, TextField, Typography, Button } from '@mui/material';
import { Call, Email, Language, Person } from '@mui/icons-material';
import { Box, darken } from '@mui/system';
import Info from '../../Info';


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isFormSent, setIsFormSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/messages`, formData);
      setResponseMessage('Message sent successfully!');
      setIsFormSent(true);
    } catch (error) {
      setResponseMessage('Failed to send message. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
      <Container
       sx={{
      
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        height: {
          xs: 'auto',  
          sm: 'auto', 
          md: 'auto', 
          lg: '80vh', 
          xl: '80vh', 
        },
        padding:'20px',
        marginTop:'10vh'
        
  
      }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography variant="h4" sx={{ marginBottom: '16px', color: '#c62828' ,textAlign:'center' }}>
            Write a message
            </Typography>

            {!isFormSent ? (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      placeholder="John Doe"
                      type="text"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                      placeholder="example@example.com"
                      type="email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="subject"
                      label="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      fullWidth
                      placeholder="Enter your subject"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="message"
                      label="Message"
                      value={formData.message}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Write your message here"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      sx={{
                                            backgroundColor:'#c62828',
                                            '&:hover': {
                                backgroundColor: darken('#dc143c', 0.2), 
                              },}}
                    >
                      {loading ? 'Sending...' : 'Submit'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            ) : (
              <Typography variant="h6" color="success.main">
                {responseMessage}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
  <Grid item xs={12} sx={{ textAlign: 'center' }}>
    <Typography variant="h4" sx={{ marginBottom: '16px', color: '#c62828' }}>
      Other Ways to Connect
    </Typography>
  </Grid>

  <Grid container 
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  spacing={2}>
    {/** Common styling object for rows */}
    {[
        { icon: <Call />, text: '+962 6 581 9003', link: 'tel:+96265819003' },
        { icon: <Email />, text: 'info@eventscons.com', link: 'mailto:info@eventscons.com' },
        { icon: <Call />, text: '+962 79 60 2002', link: 'tel:+96279602002' },
        { icon: <Language />, text: 'www.eventscons.com', link: 'http://www.eventscons.com' },
    ].map((item, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        key={index}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 1,
          }}
        >
          {item.icon}
          {item.link ? (
            <Typography
              variant="body1"
              component="a"
              href={item.link}
              sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold'
                ,'&:hover': {
                                color: darken('#dc143c', 0.2), 
                              }
               }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.text}
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold'
              ,'&:hover': {
                              color: darken('#dc143c', 0.2), 
                            }
             }}>{item.text}</Typography>
          )}
        </Box>
      </Grid>
    ))}
    <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Info/>
      </Grid>

  </Grid>
</Grid>

        </Grid>
      </Container>
    </div>
  );
};

export default ContactUs;
