import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  ListItem,
  IconButton,
  List,
  ListItemText
} from "@mui/material";
import image from "./file.png";

import { backendUrlImages } from "../../constant/config";
import httpService from "../../common/httpService";
import PaperSubmissionForm from "../../components/abstract/abstractUser";
import Speakers4 from "../../components/SpeakerProduct";
import Welcome from "../../components/UI/Welcome";
import ClientsSlide from "../../components/ClientsSlide";
import "./style.scss"
import { CheckCircleIcon } from "lucide-react";
import SpeakerV2 from "../../components/speaker/SpeakerV2";
import SinglePriceV2 from "../../components/price/SinglePriceV2";
import AccommodationPrices from "../../components/price/AccommodationPrices";
import SponserV1 from "../../components/client/SponserV1";

const ConferenceDetails = () => {
  const navigate = useNavigate();
  const { conferenceId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState({});
  const [spo, setSpo] = useState([]);
  const [work, setWork] = useState([]);
  const [roomPrices, setRoomPrices] = useState(null);
  const [error, setError] = useState(null);            
  const [loading, setLoading] = useState(true); 
  const tabsRef = useRef(null);
  const [stopScroll, setStopScroll] = useState(false);
  const [value, setValue] = useState(0);
  const tabsCount = 14;
  useEffect(() => {
    if (stopScroll) return;

    const interval = setInterval(() => {
      setValue((prev) => (prev + 1) % tabsCount); 
    }, 1000);

    return () => clearInterval(interval); 
  }, [stopScroll, tabsCount]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedTab(newValue)
  };

  const handleMouseEnter = () => {
    setStopScroll(true);
  };

  const handleMouseLeave = () => {
    setStopScroll(false);
  };
  const handleTouchStart = () => {
    setStopScroll(true); 
  };

  const handleTouchEnd = () => {
    setStopScroll(false); 
  };

  // const handleTabChange = (event, newValue) => {
  //   const previousTab = selectedTab;
  //   setSelectedTab(newValue);
  
  //   if (tabsRef.current) {
  //     const scroller = tabsRef.current.querySelector('.MuiTabs-scroller');
  
  //     if (scroller) {
  //       const tabs = tabsRef.current.querySelectorAll('.MuiTab-root');
  //       const tabElement = tabs[newValue];
  
  //       if (tabElement) {
  //         const tabWidth = tabElement.offsetWidth; 
  //         const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth; 
  
  //         if (newValue > previousTab) {
  //           scroller.scrollLeft = Math.min(scroller.scrollLeft + tabWidth * 2, maxScrollLeft);
  //         } else {
  //           scroller.scrollLeft = Math.max(scroller.scrollLeft - tabWidth * 2, 0);
  //         }
  //       }
  //     }
  //   }
  // };
  


  const BaseUrl = process.env.REACT_APP_BASE_URL;
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
          setInfo(data)

        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const getSponsor = async () => {
    const getAuthToken = () => localStorage.getItem("token");

    try {
      await httpService({
        method: "GET",
        url: `${BaseUrl}/logo/spo/${conferenceId}`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,

        onSuccess: (data) => {

          setSpo(data?.data)


        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const getWorkShop = async () => {
    const getAuthToken = () => localStorage.getItem("token");

    try {
      await httpService({
        method: "GET",
        url: `${BaseUrl}/workshops/${conferenceId}`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,

        onSuccess: (data) => {
          setWork(data?.data)

        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  useEffect(() => {
    getSponsor();
    getWelcomeData();
    getWorkShop()
  }, [])


  const fetchRoomPrices = async () => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/reservation/room/price/${conferenceId}`,
        showLoader: true,
        onSuccess: (data) => {
          if (data.success) {
            setRoomPrices(data.data);  // تخزين بيانات الغرف
          } else {
            // setError("Failed to fetch room prices");
          }
        }
      });
    } catch (err) {
      // setError("Error fetching room prices");
    } finally {
      setLoading(false);
    }
  };



  const fetchConferenceData = async () => {
    const token = localStorage.getItem("token");
    const response = await httpService({
      method: "GET",
      url: `${BaseUrl}/con/id/${conferenceId}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(response);
  };

  useEffect(() => {
    fetchConferenceData();
    fetchRoomPrices();  

  }, []);

  const sections = [
    { label: "Conference Overview", component: "overview" },
    // { label: "Home", component: "home" },
    { label: "Welcome", component: "Welcome" },
    { label: "Abstract", component: "Abstract" },
    { label: "Speakers", component: "Speakers" },
    { label: "Scientific Topics", component: "topics" },
    { label: "Registration", component: "pricing" },
    { label: "Committee Members", component: "committee" },
    { label: "Accommodation", component: "accommodation" },
    { label: "First Announcement Document", component: "firstAnnouncement", url: "first_announcement_pdf_url" },
    { label: "Second Announcement Document", component: "secondAnnouncement", url: "second_announcement_pdf_url" },
    { label: "Conference Brochure", component: "brochure", url: "conference_brochure_pdf_url" },
    { label: "Scientific Program Document", component: "scientificProgram", url: "conference_scientific_program_pdf_url" },
    { label: "Sponsor", component: "sponsor" },
    { label: "WorkShop", component: "WorkShop" },

  ];

  const renderDocumentContent = (url, label) => (
    <section className={`pricing-section-two ${"alternate"}`}>
   
          <div className="anim-icons">
                  <span className="icon icon-line-1"></span>
                  <span className="icon icon-circle-1"></span>
                  <span className="icon icon-dots"></span>
          </div>
          <div className="auto-container">
              {/* <div className="sec-title text-center">
                  <span className="title">Get Ticket</span>
                  <h2>Choose a Ticket</h2>
              </div> */}
              <div className="outer-box">
              <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
      {url ? (
        <>
        
          <img src={image} alt="Document Icon" width="100px" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {label}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
            This document contains important details about {label}. Please
            download it for more information.
          </Typography>
          <Button variant="contained" href={url} download sx={{ mt: 2 ,backgroundColor:'#9B1321'}}>
            Download {label}
          </Button>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No document is currently available for this section.
        </Typography>
      )}
    </Paper>
              </div>
          </div>
      </section>
   
  );

  const renderContent = () => {
    const { conference, scientific_topics, prices, committee_members } = data;

    switch (sections[selectedTab].component) {
     
      case "sponsor":
        return (
          <SponserV1 spo={spo}/>
         
          
        );
      case "Welcome":
        return <Welcome />;
        case "WorkShop":
          return(
          <div>
{
  work?.map((item)=>{
    return(
      <>
       <section className={`pricing-section-two ${"alternate"}`}>
       <div className="sec-title  text-center">
  <h2 style={{ display: 'inline-block', borderBottom: '2px solid #9B1321', paddingBottom: '10px' }}>Workshop</h2>
</div>
                <div className="anim-icons">
                        <span className="icon icon-line-1"></span>
                        <span className="icon icon-circle-1"></span>
                        <span className="icon icon-dots"></span>
                </div>
                <div className="auto-container">
                <div className="outer-box">
                <Grid container spacing={3} style={{ padding: "10px",justifyContent:'center',alignItems:'center',
                                zIndex: 9999,

                 }}>
      {work?.map((item, index) => (
        <Grid item xs={12} md={10}  key={index}>
          <Card
            sx={{
              
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              marginBottom:'5vh',

              
            }}
          >
             
            <CardContent sx={{ backgroundColor: '#f9f9f9', borderRadius: 2, padding: 3, boxShadow: 3,
             }}>
              {/* <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  textAlign: "center",
                  color: "#9B1321",
                }}
              >
                {item?.title || "Workshop Title"}
              </Typography> */}
              <Typography
                color="text.secondary"
                variant="body1"
                sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', lineHeight: 1.6 ,
                fontSize:'1.2rem'
                }}
              >
                {item?.description}
              </Typography>
            </CardContent>
         
          </Card>
        </Grid>
      ))}
    </Grid>
</div>
       
                </div>
            </section>
     
  
      
      </>
    
    
  
    )
  })
}
          </div>
          
          )
      case "overview":
        return (
          
          // <Grid container spacing={3}>
          //   <Grid item xs={12} md={6}>
          //     {data?.image_url ? (
          //       <img
          //         src={`${backendUrlImages}${info?.conference_logo}`}
          //         alt="Conference"
          //         width="100%"
          //         style={{ borderRadius: 8 }}
          //       />
          //     ) : (
          //       <Typography variant="body1" color="text.secondary">
          //         No image available.
          //       </Typography>
          //     )}
          //   </Grid>
          //   <Grid item xs={12} md={6}>
          //     <Typography variant="h4">{conference?.title}</Typography>
          //     <Typography variant="body1" sx={{ mt: 2 }}>
          //       {conference?.description}
          //     </Typography>
          //     <Typography variant="body2" sx={{ mt: 1 }}>
          //       <strong>Location:</strong> {conference?.location}
          //     </Typography>
          //   </Grid>
          // </Grid>
          <>
          <section className="about-section-two">
              <div className="anim-icons full-width">
                  <span className="icon icon-circle-blue wow fadeIn"></span>
                  <span className="icon icon-dots wow fadeInleft"></span>
                 
              </div>
              <div className="auto-container">
                  <div className="row">
                      <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                          <div className="inner-column">
                              <div className="sec-title">
                                  <span className="title">Conference</span>
                                  <h2>{conference?.title} </h2>
                                  <div className="text">{conference?.description}</div>
                              </div>
                              <div className="row">
                                  <div className="about-block col-lg-6 col-md-6 col-sm-12">
                                      <div className="inner-box">
                                          <h4><span className="icon fa fa-map-marker-alt"></span> Where</h4>
                                          <div className="text"> {conference?.location}</div>
                                      </div>
                                  </div>
                                
                              </div>
                          </div>
                      </div>
                      <div className="image-column col-lg-6 col-md-12 col-sm-12">
                      {data?.image_url ? (
                          <div className="image-box">
                              <figure className="image wow fadeIn"><img  src={`${backendUrlImages}${data?.conference.image?.substring(data?.conference.image.indexOf("/" +1) )}`} alt="image" /></figure>
                          </div>):(
                            <Typography variant="body1" color="text.secondary">
                            No image available.
                          </Typography>
                          )}
                      </div>
                  </div>
              </div>
          </section>
      </>
        );
      case "Abstract":
        return <PaperSubmissionForm conferenceId={conferenceId} />;
      case "Speakers":
        return <SpeakerV2  conferenceId={conferenceId} />;
      case "topics":
        return (
          <section className={`pricing-section-two ${"alternate"}`}>
          <div className="sec-title  text-center">
  <h2 style={{ display: 'inline-block', borderBottom: '2px solid #9B1321', paddingBottom: '10px' }}>Scientific Topics</h2>
</div>
                <div className="anim-icons">
                        <span className="icon icon-line-1"></span>
                        <span className="icon icon-circle-1"></span>
                        <span className="icon icon-dots"></span>
                </div>
                <div className="auto-container">
                    {/* <div className="sec-title text-center">
                        <span className="title">Get Ticket</span>
                        <h2>Choose a Ticket</h2>
                    </div> */}
                    <div className="outer-box">
                    <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
  {/* First Column */}
  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
    <List>
      {scientific_topics?.slice(0, Math.ceil(scientific_topics.length / 2)).map((topic) => (
        <ListItem key={topic.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton sx={{ color: 'black', mr: 2 }}>
            <CheckCircleIcon />
          </IconButton>

          <ListItemText
            primary={<Typography variant="h6">{topic?.title}</Typography>}
            secondary={<Typography variant="body2">{topic?.description}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  </Grid>

  {/* Second Column */}
  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
    <List>
      {scientific_topics?.slice(Math.ceil(scientific_topics.length / 2)).map((topic) => (
        <ListItem key={topic.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton sx={{ color: 'black', mr: 2 }}>
            <CheckCircleIcon />
          </IconButton>

          <ListItemText
            primary={<Typography variant="h6">{topic?.title}</Typography>}
            secondary={<Typography variant="body2">{topic?.description}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  </Grid>
</Grid>
                    </div>
                </div>
            </section>


        );
      case "pricing":
        return (
          <>
          <section className={`pricing-section-two ${"alternate"}`}>
          <div className="sec-title  text-center">
  <h2 style={{ display: 'inline-block', borderBottom: '2px solid #9B1321', paddingBottom: '10px' }}>Prices</h2>
</div>
                
                <div className="auto-container">
                    {/* <div className="sec-title text-center">
                        <span className="title">Get Ticket</span>
                        <h2>Choose a Ticket</h2>
                    </div> */}
                    <div className="outer-box">
                        <div className="row">
                            {prices?.map(price =>
                                <div className="pricing-block-two col-md-6 col-sm-12" key={price.id}>
                                    <SinglePriceV2 price={price} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            
           
           
          </>
        );
      case "committee":
        return (
          <section className={`pricing-section-two ${"alternate"}`}>
              <div className="sec-title  text-center">
  <h2 style={{ display: 'inline-block', borderBottom: '2px solid #9B1321', paddingBottom: '10px' }}>Committee Members</h2>
</div>
                        <div className="anim-icons">
                        <span className="icon icon-line-1"></span>
                        <span className="icon icon-circle-1"></span>
                        <span className="icon icon-dots"></span>
                </div>
                <div className="auto-container">
                    {/* <div className="sec-title text-center">
                        <span className="title">Get Ticket</span>
                        <h2>Choose a Ticket</h2>
                    </div> */}
                    <div className="outer-box">
                    <Box sx={{ padding: 2 }}>
    
    <Grid container spacing={3}>

      {committee_members?.map((member) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
          <Card
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 3,
              flex:1,
              height:'100%'
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image={`${backendUrlImages}${member?.committee_image}`}
              alt={member?.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ textAlign: 'center', padding: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                {member?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {member?.role} 
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {member?.country} 
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
                    </div>
                </div>
            </section>
     
        
        
        );
      case "firstAnnouncement":
      case "secondAnnouncement":
      case "brochure":
      case "scientificProgram":
        return renderDocumentContent(
          `${backendUrlImages}${data[`${sections[selectedTab].url}`]?.replace(
            "https://panel.mayazin.co/storage",
            ""
          )}`,
          sections[selectedTab].label
        );
        case "accommodation": // دمج محتوى "Accommodation" هنا
        return (
          
          <>
          
          <Box 
            
          >
            {loading ? (
              <Typography variant="h6" sx={{ textAlign: 'center', color: 'gray' }}>Loading...</Typography>
            ) : error ? (
              <Typography variant="h6" sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>
            ) : (
              <>
              <AccommodationPrices roomPrices={roomPrices}/>
               
              </>
            )}
          </Box>
        
          {/* Register Button Section */}
         
        </>
        
        
        
        

        );
      default:
        return <Typography variant="body1">Section not found.</Typography>;
    }
  };

  return (
    <div
    sx={{
      marginTop:'15vh',
      padding:'10px'

    }} 
    >
      <Box sx={{ marginTop:'20vh', display: "flex", alignItems: "center" }}>
   <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      allowScrollButtonsMobile
      scrollButtons="auto"
      aria-label="Auto-scrolling tabs"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
     
      slots={{
        StartScrollButtonIcon: () => (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M14 8L10 12L14 16" stroke="#9B1321" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        EndScrollButtonIcon: () => (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M10 8L14 12L10 16" stroke="#9B1321" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      }}
      sx={{
        '& .MuiTabs-flexContainer': {
          display: 'flex',
          position: 'relative',
        },
        "& .MuiTabs-scroller": {
          overflowX: "auto",
          scrollBehavior: stopScroll ? 'auto' : 'smooth',
          transition: stopScroll ? 'none' : 'scroll-left 20s ease-in-out', 
        },
        "& .MuiTabs-scrollButtons": {
          color: "red",
          fontSize: "30px",
          animation: "pulse 1.5s infinite ease-in-out",
        },
        "& .MuiTabs-scrollButtons.Mui-disabled": {
          opacity: 0.3,
        },
        "@keyframes pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
      }}
    >
      {sections.map((section, index) => (
        <Tab
          key={index}
          label={section.label}
          sx={{ fontWeight: '600' }}
        />
      ))}
    </Tabs>




      </Box>
      <Box
      sx={{
        justifyContent:'center',
        alignItems:'center'
       }}
      >{renderContent()}</Box>
    </div>
  );
};

export default ConferenceDetails;
