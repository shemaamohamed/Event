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
  useEffect(() => {
    getWelcomeData()
  }, [])
  return (
    <Box sx={{ padding: 1 }}>
      {/* Header Section */}
      <Box className="welcome-header" sx={{ textAlign: 'center', marginBottom: 6 }}>
        <Typography variant="h6" component="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#9B1321' }}>
          Welcome to the Conference!
        </Typography>
        <Typography variant="h6" color="textSecondary">
          On behalf of the Organizing Committee, we are excited to invite you to join us at this prestigious conference, bringing together experts and professionals from around the world. The event will be held in a dynamic and welcoming city, offering a platform for collaboration, innovation, and knowledge exchange.
        </Typography>
      </Box>

      {/* Content Section */}
      <Grid container spacing={4} className="welcome-content" alignItems="center">
        {/* Image Section */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
            <CardMedia
              component="img"
              alt="President"
              height="300"
              image={`${backendUrlImages}conference_images/${info?.president_image}`}
            />
          </Card>
        </Grid>

        {/* Description Section */}
        <Grid item xs={12} md={7}>
          <CardContent sx={{ backgroundColor: '#f1f1f1', borderRadius: 2, padding: 3 }}>
            <Typography variant="body1" paragraph>
              {info?.welcome_message}
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2, color: '#9B1321' }}>
              Chairman of the Conference
            </Typography>
          </CardContent>
        </Grid>
      </Grid>

      {/* Topics Section */}
      <Box className="topics-section" sx={{ textAlign: 'center', marginTop: 6 }}>
        <Card
          elevation={3}
          sx={{
            padding: 3,
            display: 'inline-block',
            borderRadius: 3,
            marginBottom: 4,
            backgroundColor: '#ffffff',
          }}
        >
          <CardMedia
            component="img"
            image={`${backendUrlImages}conference_logos/${info?.conference_logo}`}
            alt="Conference Logo"
            sx={{ width: '150px', margin: '0 auto' }}
          />
        </Card>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#9B1321' }}>
          In collaboration with
        </Typography>
        <Card
          elevation={3}
          sx={{
            padding: 3,
            display: 'inline-block',
            borderRadius: 3,
            backgroundColor: '#ffffff',
          }}
        >
          <CardMedia
            component="img"
            image={`${backendUrlImages}cooperating_associations_logo/${info?.cooperating_associations_logo}`}
            alt="Associations Logo"
            sx={{ width: '150px', margin: '0 auto' }}
          />
        </Card>
      </Box>
  </Box>
  );
};

export default Welcome;
