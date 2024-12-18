import React from 'react';
import './style.scss';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import MamounImage from './image/Mamoun4-removebg-preview.png';
import AmeeraImage from './image/ameera.png';
import AhmadImage from './image/ahmad4-removebg-preview.png';
import MohammadImage from './image/mhammd4-removebg-preview.png';
import DanaImage from './image/dana4-removebg-preview.png';
import FarahImage from './image/farah4-removebg-preview.png';
import BakerImage from './image/baker4-removebg-preview.png';
import NancyImage from './image/nancy2.jpg';

const TeamCard = ({ name, role, image }) => {
  return (
    <div
    className="card-container"
      style={{
        position: 'relative',
        width: '200px',
        height: '250px',
        borderRadius: '14px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',

        
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '5px',
          left: '5px',
          width: '190px',
          height: '240px',
          background: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '10px',
          zIndex: 2,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="blob-animation"></div>
      <Stack 
      className="stack"
      style={{
        position: 'absolute',
        bottom:'0',
        background: 'gray',
        zIndex: 10,



        
      }}


      >
      <Typography
        variant="h6"
        sx={{
          zIndex: 3,
          color: 'white',
          textAlign:'center',

        }}
      >
        {role}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          zIndex: 3,
          color: '#fff',
          textAlign: 'center',
          marginBottom:'1px',
          padding: '5px 0px',

        }}
      >
        {name}
      </Typography>
      </Stack>
    </div>
  );
};


const OurTeams = () => {
  // مصفوفة تحتوي على معلومات الأعضاء
  const teamMembers = [
    { name: 'Mamoun Khraisheh', role: 'General Manager', image: MamounImage },
    { name: 'Ameera Abu Saif', role: 'Executive Secretary', image: AmeeraImage },
    { name: 'Ahmad Hassan', role: 'Admin Assistant', image: AhmadImage },
    { name: 'Mohammad Abu Laila', role: 'IT Supervisor', image: MohammadImage },
    { name: 'Dana Al Sabbar', role: 'Events Manager', image: DanaImage },
    { name: 'Farah Jamal', role: 'Public Relations', image: FarahImage },
    { name: 'Baker Helmi', role: 'Designer', image: BakerImage },
    { name: 'Nancy Nehad', role: 'Events Coordinator', image: NancyImage },
  ];

  return (
    <Container>
      <Grid container
      sx={{
        justifyContent:'center',
        alignItems:'center',
        display:'flex'
      }}
       spacing={3}>
        {
          teamMembers.map(
            (member,index)=>{
              return(
                <Grid
                sx={{
                  justifyContent:'center',
                  alignItems:'center',
                  display:'flex'
                }}
                 item xs={12} sm={4} md={3} lg={3} xl={3} key={index}>
                  <TeamCard  name={member.name} role={member.role} image={member.image}/>
                </Grid>
              )
            }
          )
        }

      </Grid>
    </Container>
  );
};

export default OurTeams;
