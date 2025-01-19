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

  const DestinationCard = ({ destination }) => (
    <Box
      className="destination-card"
      sx={{
        position: "relative",
        boxShadow: 6,
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 12,
        },
        height: "400px", // fixed height for the card
      }}
    >
      <Box className="slider-container" sx={{ height: "30%" }}>
        <Slider {...sliderSettings}>
          {destination.images.map((img, imgIndex) => (
            <div key={imgIndex} className="slide">
              <img
                src={img}
                alt={destination.title}
                className="slide-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Slider>
      </Box>
      <DestinationInfo destination={destination} />
    </Box>
  );

  const DestinationInfo = ({ destination }) => (
    <Box
      className="destination-info"
      sx={{
        textAlign: "center",
        color: "white",
        background: "rgba(0, 0, 0, 0.6)",
        borderRadius: "8px",
        width: "80%",
        padding: "15px",
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "white",
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
        }}
      >
        {destination.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#ccc",
          marginTop: "10px",
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        {destination.description}
      </Typography>
      <Box sx={{ marginTop: "15px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/registerType")}
          sx={{
            padding: "12px 25px",
            fontSize: "1.1rem",
            borderRadius: "25px",
            boxShadow: 2,
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          Book Now
        </Button>
      </Box>
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
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DestinationCard destination={destination} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TourSlider;
