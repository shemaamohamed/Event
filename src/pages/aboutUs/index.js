import React from "react";
import "./style.scss";
import HeaderAbout from "../../components/HeaderAbout";
import OurTeams from "../../components/UI/OurTeam";
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Groups2 } from "@mui/icons-material";
import AboutUsEvent from "../../components/UI/AboutUs";


const AboutUs = () => {
  return (
    <div >
      <HeaderAbout/>
      <AboutUsEvent/>
      <Box
      sx={{
        minWidth: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        position: "relative",
        backgroundImage: {
          xs: "url('/image/background.png')",
          sm: "url('/image/background.png')",
          md: "url('/image/background.png')",
        },
        height: {
          xs: "20vh",
          sm: "20vh",
          md: "20vh",
          lg: "20vh",
          xl: "20vh",
        },
        padding: { xs: 2, md: 5 },
      }}
    >
         <Container>
      <Grid container sx={{
            justifyContent:'center',
            alignItems:'center',
            display:'flex'
            
          }} >
             <Grid 
          sx={{
            justifyContent:'center',
            alignItems:'center',
            display:'flex'
            
          }}
          
          item xs={12} sm={12} md={12} lg={12} xl={12}>
        
            
            
                          <Groups2
                          height={200}
                          width={200}
                          sx={{ fontSize: 40 ,
                            color: '#c62828',

                          }}
                          />

          </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        
            <Typography
              variant="h4"
              sx={{
                color: 'GRAY',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
                fontFamily: '"Roboto", sans-serif', 

              }}
            >
              Our Team
            </Typography>
          </Grid>
         
          </Grid>
       
    </Container>
    </Box>
      <OurTeams/>
    </div>
  );
};

export default AboutUs;
