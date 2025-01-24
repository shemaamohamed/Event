import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import image from "./file.png";
import { backendUrlImages } from "../../constant/config";
import httpService from "../../common/httpService";
import PaperSubmissionForm from "../../components/abstract/abstractUser";
import Speakers4 from "../../components/SpeakerProduct";
import Welcome from "../../components/UI/Welcome";
import ClientsSlide from "../../components/ClientsSlide";
import "./style.scss"
import Home1 from "../homePages/Home1";
const ConferenceDetails = () => {
  const navigate = useNavigate();
  const { conferenceId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState({});
  const [spo, setSpo] = useState([]);
  const [work, setWork] = useState([]);
  const [roomPrices, setRoomPrices] = useState(null);  // الحالة لتخزين أسعار الغرف
  const [error, setError] = useState(null);            // حالة الخطأ
  const [loading, setLoading] = useState(true);        // حالة التحميل

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
          console.log({ hedaya: data });
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
          console.log({ ayat: data });
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
          console.log({ leen: data });
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
    fetchRoomPrices();  // جلب بيانات الأسعار

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
  );

  const renderContent = () => {
    const { conference, scientific_topics, prices, committee_members } = data;

    switch (sections[selectedTab].component) {
      // case "home":
      //   return <Home1 />;
      case "sponsor":
        return (
          <div>
          <Grid 
            container 
            spacing={2} // مساحة بين الصور
            justifyContent="center" // محاذاة العناصر في المنتصف
            sx={{ padding: 2 }}
          >
            {
              spo?.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}> {/* استخدام Grid لتوزيع الصور بشكل مناسب */}
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 3,
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)', // تكبير الصورة عند المرور عليها
                          boxShadow: 6, // إضافة تأثير الظل
                        },
                      }}
                    >
                      <img 
                        src={`${backendUrlImages}${item}`} 
                        alt={`spo-${index}`}
                        style={{ 
                          width: '100%', // تأكد من أن الصورة تأخذ العرض الكامل داخل العنصر
                          height: 'auto', // الحفاظ على نسبة العرض إلى الارتفاع
                          borderRadius: '10px',
                          objectFit: 'cover', // لضمان أن الصورة تغطي المساحة بشكل مناسب
                        }} 
                      />
                    </Box>
                  </Grid>
                );
              })
            }
          </Grid>
        </div>
        );
      case "Welcome":
        return <Welcome />;
        case "WorkShop":
          return(
          <div>
{
  work?.map((item)=>{
    return(
    <Grid container spacing={3} style={{ padding: "20px" }}>
      {work?.map((item, index) => (
        <Grid item xs={12}  key={index}>
          <Card
            sx={{
              
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <CardContent>
              <Typography
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
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 2 }}
              >
                {item?.description}
              </Typography>
            </CardContent>
         
          </Card>
        </Grid>
      ))}
    </Grid>
    
  
    )
  })
}
          </div>
          
          )
      case "overview":
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {data?.image_url ? (
                <img
                  src={`${backendUrlImages}conference_logos/${info?.conference_logo}`}
                  alt="Conference"
                  width="100%"
                  style={{ borderRadius: 8 }}
                />
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No image available.
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">{conference?.title}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {conference?.description}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Location:</strong> {conference?.location}
              </Typography>
            </Grid>
          </Grid>
        );
      case "Abstract":
        return <PaperSubmissionForm conferenceId={conferenceId} />;
      case "Speakers":
        return <Speakers4 conferenceId={conferenceId} />;
      case "topics":
        return (
          <Box>
            {scientific_topics?.map((topic) => (
              <Card key={topic.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{topic?.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {topic?.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case "pricing":
        return (
          <Box>
            {prices?.map((price) => (
              <Card key={price.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{price?.price_type}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Price:</strong> {price?.price}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {price?.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            {!localStorage.getItem("token") && (
              <Button
                variant="contained"
                onClick={() => navigate("/registertype")}
                sx={{ mt: 3,backgroundColor:'#9B1321' }}
              >
                Register
              </Button>
            )}
          </Box>
        );
      case "committee":
        return (
          <Box sx={{ padding: 2 }}>
          <Grid container spacing={3}>
            {committee_members?.map((member) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: 3,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
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
                      {member?.role} {/* Assuming the role of the member is available */}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        
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
          <Box sx={{ padding: 3, backgroundColor: '#f4f4f4', borderRadius: 3, boxShadow: 5 }}>
          {/* Title Section */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9B1321', textAlign: 'center', marginBottom: 5 }}>
            Accommodation Prices
          </Typography>
        
          {/* Room Prices Section */}
          <Box 
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',  // تنظيم الكروت بجانب بعض
              gap: 4,
              justifyItems: 'center',  // محاذاة العناصر في المنتصف
              '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',  // عند حجم الشاشة الصغير، الكروت تكون تحت بعضها
              },
            }}
          >
            {loading ? (
              <Typography variant="h6" sx={{ textAlign: 'center', color: 'gray' }}>Loading...</Typography>
            ) : error ? (
              <Typography variant="h6" sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>
            ) : (
              <>
                {/* Single Room Price */}
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    padding: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)', 
                      boxShadow: 6, 
                      backgroundColor: '#f5f5f5'
                    },
                    '&:active': {
                      boxShadow: 10
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Single Room</Typography>
                  <Typography variant="h5" sx={{ color: '#9B1321', fontWeight: 'bold' }}>${roomPrices?.single_base_price}</Typography>
                </Box>
        
                {/* Double Room Price */}
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    padding: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)', 
                      boxShadow: 6, 
                      backgroundColor: '#f5f5f5'
                    },
                    '&:active': {
                      boxShadow: 10
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Double Room</Typography>
                  <Typography variant="h5" sx={{ color: '#9B1321', fontWeight: 'bold' }}>${roomPrices?.double_base_price}</Typography>
                </Box>
        
                {/* Triple Room Price */}
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    padding: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)', 
                      boxShadow: 6, 
                      backgroundColor: '#f5f5f5'
                    },
                    '&:active': {
                      boxShadow: 10
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Triple Room</Typography>
                  <Typography variant="h5" sx={{ color: '#9B1321', fontWeight: 'bold' }}>${roomPrices?.triple_base_price}</Typography>
                </Box>
              </>
            )}
          </Box>
        
          {/* Register Button Section */}
          <Box sx={{ textAlign: 'center', marginTop: 5 }}>
            <Button
              sx={{
                backgroundColor: '#9B1321',
                color: '#ffffff',
                fontWeight: 'bold',
                padding: '14px 28px',
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#B4161B',
                  boxShadow: 3,
                },
                '&:focus': {
                  outline: '2px solid #9B1321',
                },
              }}
              variant="contained"
              onClick={() => navigate("/registertype")}
            >
              Register
            </Button>
          </Box>
        </Box>
        
        
        
        

        );
      default:
        return <Typography variant="body1">Section not found.</Typography>;
    }
  };

  return (
    <Container
    sx={{
      marginTop:'15vh',
      padding:'20px'

    }} 
    >
      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile

        >
          {sections.map((section, index) => (
            <Tab key={index} label={section.label} />
          ))}
        </Tabs>
      </Box>
      <Box>{renderContent()}</Box>
    </Container>
  );
};

export default ConferenceDetails;
