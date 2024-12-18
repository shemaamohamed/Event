import { Box, Container, Grid, Typography} from "@mui/material";

function HeaderContact() {
  
  return (
    <Box
      sx={{
        minWidth: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        position: "relative",
        backgroundImage: {
          xs: "url('/image/pcontactus.png')",
          sm: "url('/image/pcontactuss.png')",
          md: "url('/image/contactus.png')",
        },
        height: {
          xs: "50vh",
          sm: "70vh",
          md: "60vh",
          lg: "60vh",
          xl: "60vh",
        },
        padding: { xs: 2, md: 5 },
      }}
    >
      <Container>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <Typography
                variant="h4"
                sx={{
                  color: '#c62828',
                  fontWeight: 'bold', // Make the font bold
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, // Responsive font size
                }}
                >
                Contact Us
                </Typography>

            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Typography
                variant="h6"
                sx={{ color: 'gray' }}
                >
                If you got any questions, please do not hesitate to send us a message. We reply within 24 hours!
                </Typography>

            </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
}

export default HeaderContact;
