import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import Footer from "../../components/UI/Footer";
import { toast } from "react-toastify";
import { backendUrlImages } from "../../constant/config";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Grid, Box, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
import { Container } from "react-bootstrap";
import SliderImage from "../../components/SliderImage";

const Home = () => {
  const [allConferences, setAllConferences] = useState([]);
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

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
      {/* Hero Slider */}
      
      <Box className="slider" sx={{ mb: 5 }}>
      <SliderImage images={["/image/6774633-uhd_3840_2160_30fps.mp4","/image/conff66.webp", "/image/conff.webp"]} />
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
            </Typography>
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
        <Typography variant="h5" align="center" gutterBottom sx={{ color: " #c82333", fontWeight: "bold",py: 2 }}>
          Upcoming Conferences
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {allConferences.map((conference) => (
            <Grid item key={conference.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                onClick={() => handleConferenceClick(conference.id)}
                sx={{ transition: "0.3s", boxShadow: 3, "&:hover": { boxShadow: 6 } }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`${backendUrlImages}${conference.image}`}
                  alt={conference.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#555" }}>
                    {conference.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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

      {/* Contact Us */}
      <Box my={5} px={2} sx={{ backgroundColor: "#e3f2fd", py: 4, borderRadius: "10px" }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: " #c82333", fontWeight: "bold" }}>
          Contact Us
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Get In Touch</Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              If you have any questions or need more information, feel free to reach out to us. We are here to help!
            </Typography>
            <Box mt={2}>
              <Typography>
                <FaEnvelope /> <strong>Email:</strong> info@eventscons.com
              </Typography>
              <Typography>
                <FaPhoneAlt /> <strong>Phone:</strong> +962799602002
              </Typography>
              <Typography>
                <FaMapMarkerAlt /> <strong>Address:</strong> Rawhi Al Katabi Commercial Complex, Al Wakalat St 7, Amman, Jordan
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/contact_us")}
              sx={{ px: 4, py: 1.5 }}
            >
              Contact Us
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;