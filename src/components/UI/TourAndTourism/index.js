import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import destinations from "./destinations";
import { Grid, Box, Typography, Button } from "@mui/material";

// Slick slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  fade: true,
};

const TourSlider = () => {
  const navigate = useNavigate();
  const DestinationCard = ({ destination }) => {
    const navigate = useNavigate();
  
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
    };
  
    return (
      <Box
        className="destination-card"
        sx={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #f5f5f5, #ffffff)",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
          },
          display: "flex",
          flexDirection: "column",
          width: "350px",
          height:'80vh',
          margin: "auto",
        }}
      >
        <Box className="slider-container" sx={{ height: "40%", overflow: "hidden" }}>
          <Slider {...sliderSettings}>
            {destination.images.map((img, imgIndex) => (
              <div key={imgIndex} className="slide">
                <img
                  src={img}
                  alt={destination.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "20px 20px 0 0",
                  }}
                />
              </div>
            ))}
          </Slider>
        </Box>
        <DestinationInfo destination={destination} navigate={navigate} />
      </Box>
    );
  };
  
  const DestinationInfo = ({ destination, navigate }) => (
    <Box
      className="destination-info"
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: "0 0 20px 20px",
        height: "40%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#333",
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
          marginBottom: "10px",
        }}
      >
        {destination.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#666",
          textAlign: "center",
          fontSize: { xs: "0.9rem", sm: "1rem" },
          marginBottom: "15px",
        }}
      >
        {destination.description}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/registerType")}
        sx={{
          padding: "10px 20px",
          fontSize: "1rem",
          borderRadius: "25px",
          backgroundColor: "#0073e6",
          color: "#fff",
          textTransform: "none",
          boxShadow: "0px 4px 8px rgba(0, 115, 230, 0.4)",
          "&:hover": {
            backgroundColor: "#005bb5",
          },
        }}
      >
        Book Now
      </Button>
    </Box>
  );
  

  return (
    <Box sx={{ padding: "30px", marginTop: "20vh", textAlign: "center" }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          marginBottom: 4,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        Tourist Attractions in Jordan
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {destinations.map((destination, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DestinationCard destination={destination} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TourSlider;
