import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Container, Grid, Typography } from "@mui/material";
import CardType from "../../components/CardType";

const RegisterType = () => {
  const types =[
    {
      type:'Speaker',
      img:'speaker.png',
      link:'speaker'
    },{
      type:'Attendance',
      img:'attendance.png',
      link:'attendance'

    },{
      type:'Sponsor/Exhibitor',
      img:'sponsor.png',
      link:'sponsor'
    },
    {
      type:'Group',
      img:'group.png',
      link:'group'
    },{
      type:'Other',
      img:'other.png',
      link:'other'
    }
  ]
  const navigate = useNavigate();
  const handleNavigate = (type) => {
    navigate(`/registerPage/${type}`);
  };
  return (
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
      marginTop:'20vh',
      padding:'30px'
      

    }}
    >
      <Grid container
      sx={
        {
          display:'flex',
          justifyContent:'center',
          alignItems:'center',

        }
      }
      >
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10} >
          <Typography 
          sx={{
                   
            color: " gray",
            textAlign:'center'

          }} 
          variant="h6"
          >
            Please select the appropriate option below to proceed with your
          registration.
          </Typography>

        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10} >
          <Typography 
          sx={{
                   
            color: " #c62828",
            textAlign:'center'
          }} 
          variant="h6"
          >
            ( we have tailored options to fit your needs )
          </Typography>

        </Grid>
        
        <Grid container
        spacing={2}
      sx={
        {
          display:'flex',
          justifyContent:'center',
          alignItems:'center'

        }
      }
      >
      {
          types.map((value, index) => {
            return (
              <Grid item xs={12} sm={4} md={4} lg={2} xl={2} key={index}>
                <CardType value={value} handleNavigate={handleNavigate} />
              </Grid>
            );
          })
      }
        
        
        
      </Grid>
        
        
      </Grid>
    </Container>
   
  );
};

export default RegisterType;
