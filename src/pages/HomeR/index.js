import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, Container } from "@mui/material";
import CustomSlider from "../../components/CustomSlider";
import SliderImage from './../../components/SliderImage';
import Welcome1 from "../../components/Welcome1";
import CustomCard from "../../components/CustomCard";

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
      
      <Box className="slider" >
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
 
      <Box
          px={4}
          sx={{
            textAlign: "center",
            py: 6,
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
        }}>
          <Welcome1/>
      </Box>


      <Box
      sx={{
        minWidth: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        position: "relative",
        backgroundImage: {
          xs: "url('/image/UpcomingConferences.png')",
          sm: "url('/image/UpcomingConferences.png')",
          md: "url('/image/UpcomingConferences.png')",
        },
        height:'30vh',
        padding: { xs: 2, md: 5 },
        justifyContent:'center',
        alignItems:'center',
        display:'flex'
        
      }}
    >
         <Container>
      <Grid container
      sx={{
        justifyContent:'center',
        alignItems:'center',
        display:'flex'
      }}
       spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
         
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
                textShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',

              }}
            >
                        Upcoming Conferences

            </Typography>
        </Grid>
      </Grid>
    </Container>
      </Box>

      <Box my={5} px={2}>
          <CustomSlider data={allConferences}  handleConferenceClick={handleConferenceClick }/>
            
      </Box>
      <Box
      sx={{
        minWidth: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        position: "relative",
        backgroundImage: {
          xs: "url('/image/background4.png')",
          sm: "url('/image/background4.png')",
          md: "url('/image/background4.png')",
        },
        height:'30vh',
        padding: { xs: 2, md: 5 },
        justifyContent:'center',
        alignItems:'center',
        display:'flex'
        
      }}
    >
         <Container>
      <Grid container
      sx={{
        justifyContent:'center',
        alignItems:'center',
        display:'flex'
      }}
       spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
         
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
                textShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',

              }}
            >
              Our Services

            </Typography>
        </Grid>
      </Grid>
    </Container>
      </Box>
      {/* <CustomCard/> */}

      {/* Featured Services */}
      <Box  sx={{borderRadius: "10px" ,width:'90%',
        margin:'auto'
       }}>
        
        <Grid container spacing={1} justifyContent="center">
          {[
  {
    title: 'Conferences',
    description: "Conferences provide opportunities for networking, socializing, and hearing the latest industry trends.",
    image: "/image/confbackground1.png",
    to: '/conf',
  },
  {
    title: 'Expositions',
    description: "Showcase advancements through specialized Medical, Tourism, and Scientific Exhibitions.",
    image: "/image/Expositionsbackground.png",
    to: '/expositions',
  },
  {
    title: 'Workshops',
    description: "Hands-on learning opportunities for individuals and professionals in various industries.",
    image: "/image/WorkshopsBackground.png",
    to: '/workshops',
  },
  {
    title: 'Seminars',
    description: "In-depth discussions and presentations on specific topics by industry experts.",
    image: "/image/SeminarsBackground.png",
    to: '/seminars',
  },
  {
    title: 'Corporate Meetings',
    description: "Professional organization of corporate meetings to align goals and achieve success.",
    image: "/image/CorporateMeetingsBackground.png",
    to: '/corporate_meetings',
  },
  {
    title: 'Event Planning',
    description: "Tailored planning services to deliver successful and memorable events.",
    image: "/image/EventPlanningBackground.png",
    to: '/planning',
  },
  {
    title: 'Media Campaigns',
    description: "Comprehensive media campaigns for press releases, conferences, and maximum visibility.",
    image: "/image/MediaCampaignBackground.png",
    to: '/media_campaign',
  },
  {
    title: 'Logistics',
    description: "Efficient logistical and secretarial support for seamless event execution.",
    image: "/image/LogisticSecretarialBackground.png",
    to: '/logistic_secretarial',
  },
  {
    title: 'Social Events',
    description: "Create memorable social gatherings that connect people and celebrate special moments.",
    image: "/image/SocialEBackground.png",
    to: '/social_events',
  },
  {
    title: 'Concept Creation',
    description: "Innovative and creative concepts tailored to bring your ideas to life.",
    image: "/image/ConceptCreationBackground.png",
    to: '/concept_creation',
  },
  {
    title: 'Management Consulting',
    description: "Expert advice to optimize operations, strategies, and organizational success.",
    image: "/image/management-consulting-bg.png",
    to: '/management_consulting',
  },
].map((service, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <CustomCard data={service}/>
            </Grid>
          ))}
        </Grid>
      </Box>

      

    </Box>
  );
};

export default Home;