import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.scss";
import { List, ListItem, ListItemText, Button, Divider,  Link, Box, Container, Typography, Grid, IconButton, Drawer, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';



const SidebarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  paddingTop: theme.spacing(2),
  height: 'auto',
}));

const SidebarButton = styled(Button)({
  width: '100%',
});

const SidebarSidebarLink = styled(Link)({
  display: 'block',
  width: '100%',
  textDecoration: 'none',
});
  

const OnePage = () => {
  const { conferenceId } = useParams();
  const [conInfo, setConInfo] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate(); // استخدام navigate للتنقل بين الأقسام
  const BaseUrl = process.env.REACT_APP_BASE_URL;;

  useEffect(() => {
    axios
      .get(`${BaseUrl}/con/id/${conferenceId}`)
      .then((response) => {
        setConInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching conference data:", error);
      });
  }, [conferenceId]);

  if (!conInfo) {
    return <p>Loading conference details...</p>;
  }

  const handleNavigate = (section) => {
    navigate(`#${section}`); 
  };
  const getModifiedUrl = (url) => {
    const parts = url?.split("https://panel.mayazin.co/storage/");
    const afterPublic = parts?.slice(parts.indexOf("public") + 1).join("");
    return "https://mayazin.co/backend/storage/app/public/" + afterPublic;
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  

  return (
    <Grid container spacing={3} sx={{
      marginTop:'30vh',
      padding:'20px'
    }}>
    <Grid item xs={12} sm={3} md={2}
      sx={{ display: { xs: 'block', sm: 'none' }, textAlign: 'right' }}
    >
      <IconButton
        color="primary"
        onClick={toggleDrawer}
        sx={{ display: { sm: 'none', md: 'none' }, marginBottom: 2 }}
      >
        <MenuIcon />
      </IconButton>
  
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: 240,
            padding: 2,
          },
        }}
      >
        <SidebarContainer>
          <List>
            {['Home', 'Welcome', 'Speakers', 'Committees'].map((text, index) => (
              <ListItem key={index}>
                <SidebarButton
                  variant="contained"
                  color="error"
                  onClick={() => navigate(`/${text.toLowerCase()}`)}
                >
                  {text}
                </SidebarButton>
              </ListItem>
            ))}
            <Divider />
            {['Brochure', 'Scientific Program', '1st Announcement', '2nd Announcement'].map((text, index) => (
              <ListItem key={index}>
                <SidebarSidebarLink
                  href={getModifiedUrl(conInfo[`conference_${text.replace(/\s/g, '_').toLowerCase()}_pdf_url`])}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SidebarButton variant="outlined" color="error" fullWidth>
                    {text}
                  </SidebarButton>
                </SidebarSidebarLink>
              </ListItem>
            ))}
            <Divider />
            {['Abstract', 'Registration', 'Contact Us', 'Scientific Topics'].map((text, index) => (
              <ListItem key={index}>
                <SidebarButton
                  variant="contained"
                  color="error"
                  onClick={() => navigate(`/conference/${text.toLowerCase().replace(' ', '/')}`)}
                >
                  {text}
                </SidebarButton>
              </ListItem>
            ))}
          </List>
        </SidebarContainer>
      </Drawer>
    </Grid>
  
    <Grid item xs={12} sm={3} md={2}>
      <SidebarContainer sx={{ display: { xs: 'none', sm: 'block' } }}>
        <List>
          {['Home', 'Welcome'].map((text, index) => (
            <ListItem key={index}>
              <SidebarButton
                variant="contained"
                color="error"
                onClick={() => navigate(`/${text.toLowerCase()}`)}
              >
                {text}
              </SidebarButton>
            </ListItem>
          ))}
          <ListItem >
              <SidebarButton
                variant="contained"
                color="error"
                onClick={() => navigate(`/conference/speaker/${conferenceId}`)}
              >
                              Speakers

              </SidebarButton>
            </ListItem>
            <ListItem >
              <SidebarButton
                variant="contained"
                color="error"
                onClick={() => navigate(`/home`)}
              >
                Committees

              </SidebarButton>
            </ListItem>
          
          <Divider />
          {['Brochure', 'Scientific Program', '1st Announcement', '2nd Announcement'].map((text, index) => (
            <ListItem key={index}>
              <SidebarSidebarLink
                href={getModifiedUrl(conInfo[`conference_${text.replace(/\s/g, '_').toLowerCase()}_pdf_url`])}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SidebarButton variant="outlined" color="error" fullWidth>
                  {text}
                </SidebarButton>
              </SidebarSidebarLink>
            </ListItem>
          ))}
          <Divider />
          <ListItem >
              <SidebarButton
                variant="contained"
                color="error"
                onClick={() => navigate(`/paper/form/${conferenceId}`)}
              >
                Abstract
              </SidebarButton>
            </ListItem>
            <ListItem >
              <SidebarButton
                variant="contained"
                color="error"
                onClick={() => navigate(`/registertype`)}
              >
                              Registration

              </SidebarButton>
            </ListItem>
            <ListItem >
              <SidebarButton
                variant="contained"
                color="error"
                onClick={() => navigate(`/contact_us`)}
              >
                Contact Us

              </SidebarButton>
            </ListItem>
            <ListItem >
              <SidebarButton
                variant="contained"
                color="error"
                onClick={() => navigate(`/home`)}
              >
                Scientific Topics

              </SidebarButton>
            </ListItem>
        </List>
      </SidebarContainer>
    </Grid>
  
    <Grid item xs={12} sm={9} md={10}>
  <Container sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
    <img
      src={getModifiedUrl(conInfo.image_url)}
      alt={conInfo.conference?.title || "Conference"}
      style={{
        objectFit: "contain",
        objectPosition: "center",
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
      }}
    />
  </Container>

  <Box textAlign="center" marginBottom={3}>
    <Typography
      variant="h3"
      gutterBottom
      style={{ fontWeight: 700, color: '#333' }}
      sx={{
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, 
      }}
    >
      {conInfo.conference?.title}
    </Typography>
    <Typography
      variant="h6"
      style={{ fontStyle: 'italic', color: '#555' }}
      sx={{
        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, 
      }}
    >
      {conInfo.conference?.description}
    </Typography>
  </Box>

  <div style={{ padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <Typography variant="h5" gutterBottom style={{ textAlign: 'center', color: '#c62828', fontWeight: 600 }}>
      Conference Details
    </Typography>

    <Grid container spacing={3}>
      {[
        ['Start Date', new Date(conInfo.conference?.start_date).toLocaleDateString()],
        ['End Date', new Date(conInfo.conference?.end_date).toLocaleDateString()],
        ['Location', conInfo.conference?.location],
        ['Organizer', conInfo.conference?.organizer],
      ].map(([label, value], index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Paper
            elevation={3}
            sx={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#555' }}>
              <strong>{label}:</strong> {value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </div>

  {/* Scientific Topics Section */}
  {conInfo.scientific_topics?.length > 0 && (
    <div id="topics-section" style={{ marginTop: '40px' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center', color: '#c62828', fontWeight: 600 }}>
        Scientific Topics
      </Typography>
      <ul style={{ paddingLeft: '20px' }}>
        {conInfo.scientific_topics.map((topic, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              <strong>{topic.title}:</strong> {topic.description}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  )}

  {conInfo.prices?.length > 0 && (
    <div id="prices-section" style={{ marginTop: '40px' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center', color: '#c62828', fontWeight: 600 }}>
        Prices
      </Typography>
      <Grid container spacing={3}>
        {conInfo.prices.map((price, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
                <strong>{price.price_type}</strong>: ${price.price}
              </Typography>
              <Typography variant="body2" sx={{ color: '#777' }}>
                {price.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )}


</Grid>
  </Grid>
  
  
  
  );
};

export default OnePage;