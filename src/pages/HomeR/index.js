import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/UI/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
import CustomSlider from "../../components/CustomSlider";
import SliderImage from './../../components/SliderImage';

const Home = () => {
  const [allConferences, setAllConferences] = useState([]);
  const navigate = useNavigate();

 

  const getConference = () => {
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${BaseUrl}/con/upcoming`;
    const token = localStorage.getItem("token");

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllConferences(response.data.upcoming_conferences);
      })
      .catch(() => {
        toast.error("Error fetching conferences");
      });
  };

  useEffect(() => {
    getConference();
  }, []);

  const handleConferenceClick = (conferenceId) => {
    navigate(`/conference/details/${conferenceId}`);
  };

  return (
    <Box>
      
      <Box className="slider" sx={{ mb: 5 }}>
      <SliderImage 
      images = {[
        {
          src: "/image/6774633-uhd_3840_2160_30fps.mp4",
          title: "Events Consultant",
          content: "Events Consultant",
          type: 'video' 
        },
        {
          src: "/image/background3.png",
          title: "Events Consultant",
          content: "We are a dynamic consulting company based in Jordan.",
          link:'Read more',
          to:'/about',
          type: 'image',
        },
        {
          src: "/image/background6.png",
          title: "Events Consultant",
          content: "Organizing marketing scientific conferences, exhibitions, workshops, and seminars.",
           link:'Services',
           to:'/conf', 
           type: 'image',
        },
        {
          src: "/image/background2.png",
          title: "Events Consultant",
          content: "Delivering high-quality event management and professional consulting services.",
          link:'Services',
          to:'/planning', 
          type: 'image',

        },
        {
          src: "/image/background5.png",
          title: "Events Consultant",
          content: "Combining global experience with a deep understanding of the Jordanian market.",
          link:'ContactUs',
          to:'/contact_us',
           type: 'image',
        },
        
        
      ] }/>
      </Box> 
    
  


      {/* Welcome Section */}
      <Box my={5} px={2} sx={{ textAlign: "center", backgroundColor: "#f9f9f9", py: 4, borderRadius: "10px" }}>
        <Typography variant="h4"  align="center" gutterBottom sx={{ color: " #c82333", fontWeight: "bold",py: 2 }}>
          Welcome to Our Website
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" textAlign="justify" sx={{ lineHeight: 1.8 }}>
              Deliver results. We are dedicated to being readily available to address any inquiries you may have and provide all the necessary support. Our outstanding reputation for delivering specialized services is the outcome of our management philosophy, which emphasizes the importance of delivering quality work and establishing long-term client relationships. From the initial stages of the planning process to the final execution, we will be there to assist you every step of the way. Benefit from our extensive experience and in-depth knowledge of the Jordanian market.
            </Typography>import SliderImage from './../../components/SliderImage/index';

          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/2nSCi6RSzQ0?si=7AmN-Is6-ZpD4BAJ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ borderRadius: "10px" }}
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Upcoming Conferences */}
      <Box my={5} px={2}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: " #c82333", fontWeight: "bold",py: 2 }}>
          Upcoming Conferences
        </Typography>

          <CustomSlider data={allConferences}  handleConferenceClick={handleConferenceClick }/>
            
      </Box>

      {/* Featured Services */}
      <Box my={5} px={2} sx={{ backgroundColor: "#f1f1f1", py: 4, borderRadius: "10px" }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: " #c82333", fontWeight: "bold" ,py: 2}}>
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Conferences",
              description: "Conferences provide opportunities for networking, socializing, and hearing the latest industry trends.",
              image: require("./Conferences.jpeg"),
            },
            {
              title: "Exhibitions",
              description: "Specialized in organizing Medical, Tourism, and Scientific Exhibitions to showcase advancements.",
              image: require("./exhibitions.jpeg"),
            },
            {
              title: "Planning",
              description: "We provide high-quality planning services tailored to meet your needs with excellence.",
              image: "/image/conff66.webp",
            },
            {
              title: "Media Campaign",
              description: "Full media campaign management, including press releases and press conferences for maximum visibility.",
              image: require("./Media.jpeg"),
            },
          ].map((service, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card sx={{ transition: "0.3s", boxShadow: 3, "&:hover": { boxShadow: 6 } }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={service.image}
                  alt={service.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      

    </Box>
  );
};

export default Home;