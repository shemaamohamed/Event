import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Grid, Box, Typography, Button } from "@mui/material";
import destinations from "./destinations";

const TourSlider = () => {
  const DestinationCard = ({ destination }) => {
    const navigate = useNavigate();

    return (
      <Box
        className="destination-card"
        sx={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      >
        <Box className="slider-container" sx={{ height: "40vh", width: "100%" }}>
          <Swiper
            modules={[Pagination, Autoplay]}
           

            autoplay={{ delay: 3000, disableOnInteraction: false }} 
            loop={true} 
            pagination={{
              clickable: true,
              type: 'bullets',
              
            }}
            style={{ height: "100%", width: "100%" ,
              '--swiper-pagination-color': '#9B1321',

            }}
          >
            {destination.images.map((img, imgIndex) => (
              <SwiperSlide key={imgIndex}>
                <img
                  src={img}
                  alt={destination.title}
                  width="100%"
                  height="100%"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "20px 20px 0 0",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#333",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            {destination.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              marginBottom: "15px",
            }}
          >
            {destination.description}
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/registerType")}
            sx={{
              width: "80%",
              maxWidth: "200px",
              padding: "10px 20px",
              borderRadius: "25px",
              backgroundColor: " #9B1321",
              color: "#fff",
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <section className="pricing-section-two alternate" style={{ marginTop: "10vh" }}>
      <div className="sec-title text-center">
        <h2
          style={{
            display: "inline-block",
            borderBottom: "2px solid #9B1321",
            paddingBottom: "10px",
          }}
        >
          Tourist Attractions in Jordan
        </h2>
      </div>

      <Box sx={{ padding: "30px", textAlign: "center" }}>
        <Grid container spacing={4} justifyContent="center">
          {destinations.map((destination, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <DestinationCard destination={destination} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
};

export default TourSlider;
