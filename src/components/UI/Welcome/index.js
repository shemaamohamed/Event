import React, { useEffect, useState } from "react";
import "./style.scss";
import welcomeImage from "./welcome.jpeg"; // Import the image properly
import httpService from "../../../common/httpService";
import { useParams } from "react-router-dom";
import { backendUrlImages } from "../../../constant/config";
import { Grid, Typography, Box, Card, CardContent, CardMedia, Paper } from '@mui/material';


const Welcome = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL;;
  const { conferenceId } = useParams();
  const [info, setInfo] = useState(null);

  const getWelcomeData = async () => {
    const getAuthToken = () => localStorage.getItem("token");

    try {
      await httpService({
        method: "GET",
        url: `${BaseUrl}/conferences/${conferenceId}/welcome-message`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,

        onSuccess: (data) => {
          console.log({ hedaya: data });
          setInfo(data)
          // const tt= {
          //       "id": 1,
          //       "conference_id": 2,
          //       "welcome_message": "yyyyyyyyyyyyyyyy",
          //       "president_image": "ENka8iils4HAFOzbpCsfxai0uJertLGedlVr8GPS.jpg",
          //       "conference_logo": "7gEwG452456Qxb8r1MXdNt8fz7nPtSBf6LniJ2iO.jpg",
          //       "cooperating_associations_logo": "hYDKWgD8V2Lf1Q9n23051LsX8Kw06yS2tEye7dtD.jpg",
          //       "created_at": "2025-01-19T15:15:51.000000Z",
          //       "updated_at": "2025-01-19T15:15:51.000000Z"
          // }
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  console.log(info);
  
  useEffect(() => {
    getWelcomeData()
  }, [])
  return (
    <section className={`pricing-section-two ${"alternate"}`}>
   
          <div className="anim-icons">
                  <span className="icon icon-line-1"></span>
                  <span className="icon icon-circle-1"></span>
                  <span className="icon icon-dots"></span>
          </div>
          <div className="auto-container">
          <div className="outer-box">
          <Box >
    {/* Header Section */}
    
  
    {/* Content Section */}
    <Grid container
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
     spacing={2} className="welcome-content" alignItems="center">
      {/* Image Section */}
      <Grid item xs={12} md={5}>
          <CardMedia
            component="img"
            alt="President"
            image={`${backendUrlImages}${info?.president_image}`}
            sx={{ objectFit: 'contain', width:'100%',
              height:'200px',
              transition: 'transform 0.3s ease' }}
          />
      </Grid>
      
  
      {/* Description Section */}
      <Grid item xs={12} md={10}>
        <CardContent sx={{ backgroundColor: '#f9f9f9', borderRadius: 2, padding: 3, boxShadow: 3 }}>
          <Typography
            variant="body1"
            paragraph
            sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', lineHeight: 1.6 ,
            fontSize:{
              sm:'1rem',
              md:'1rem'
            }
            }}
          >
            {info?.welcome_message}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  
    {/* Topics Section */}
    <Box className="topics-section" sx={{ textAlign: 'center', marginTop: 6 }}>
      {/* Conference Logos */}
      
      
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <CardMedia
            component="img"
            image={`${backendUrlImages}${info?.conference_logo}`}
            alt="Conference Logo"
            sx={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'contain',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
          <CardMedia
            component="img"
            image={`${backendUrlImages}${info?.second_logo}`}
            alt="Second Conference Logo"
            sx={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'contain',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Box>
  
      {/* Cooperating Associations Section */}
      {info?.cooperating_associations_logo && (
        <>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#9B1321',
              marginTop: 4,
            }}
          >
            In Collaboration With
          </Typography>
         
            <CardMedia
              component="img"
              image={`${backendUrlImages}${info?.cooperating_associations_logo}`}
              alt="Associations Logo"
              sx={{
                width: '150px',
                height: '150px',
                margin: '0 auto',
                borderRadius: '50%',
                objectFit: 'contain',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
        </>
      )}
    </Box>
  </Box>
</div>
       
              
          </div>
      </section>
   
  
  
  );
};

export default Welcome;
