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
import Home1 from "../homePages/Home1";

const ConferenceDetails = () => {
  const navigate = useNavigate();
  const { conferenceId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState({});
  const BaseUrl = process.env.REACT_APP_BASE_URL;

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
    { label: "First Announcement Document", component: "firstAnnouncement"  ,url:"first_announcement_pdf_url"},
    { label: "Second Announcement Document", component: "secondAnnouncement" ,url:"second_announcement_pdf_url" },
    { label: "Conference Brochure", component: "brochure"  ,url:"conference_brochure_pdf_url"},
    { label: "Scientific Program Document", component: "scientificProgram" ,url:"conference_scientific_program_pdf_url" },
    { label: "Sponsor", component: "sponsor" },
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
          <Button variant="contained" href={url} download sx={{ mt: 2 }}>
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
        return <ClientsSlide />;
      case "Welcome":
        return <Welcome />;
      case "overview":
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {data?.image_url ? (
                <img
                  src={`${backendUrlImages}${data?.image_url.replace(
                    "https://panel.mayazin.co/storage",
                    ""
                  )}`}
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
                sx={{ mt: 3 }}
              >
                Register
              </Button>
            )}
          </Box>
        );
      case "committee":
        return (
          <Box>
            {committee_members?.map((member) => (
              <Card key={member.id} sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${backendUrlImages}${member?.committee_image}`}
                  alt={member?.name}
                />
                <CardContent>
                  <Typography variant="h6">{member?.name}</Typography>
                </CardContent>
              </Card>
            ))}
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
      default:
        return <Typography variant="body1">Section not found.</Typography>;
    }
  };

  return (
    <Container style={{
      padding:'20px',
    marginTop:'15vh'
    }}>
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
