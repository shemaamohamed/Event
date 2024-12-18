import { Box, Container, Grid, Typography} from "@mui/material";
import { motion } from 'framer-motion';


function HeaderAbout() {
  
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
          xs: "url('/image/aboutus.png')",
          sm: "url('/image/aboutus.png')",
          md: "url('/image/aboutus.png')",
        },
        height: {
          xs: "120vh",
          sm: "80vh",
          md: "80vh",
          lg: "70vh",
          xl: "70vh",
        },
        padding: { xs: 2, md: 5 },
      }}
    >
         <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#c62828',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
              }}
            >
              Who we are
            </Typography>
          </motion.div>
        </Grid>

        {[ // Map through the repetitive content for cleaner code
          'Event Consultant is a company that prepares, organizes, and markets scientific conferences, exhibitions, workshops, and seminars in Jordan.',
          'Consists of professional staff who are highly characterized by their vast experience; that is in supervision and management for different conferences and exhibitions held in Jordan.',
          'Due to the rapid change in market, more and more companies are looking for external expertise from efficient providers; who organizes and manages prestigious meetings, in addition to providing marketing solutions with minimal fees and time.'
        ].map((text, index) => (
          <Grid item xs={12} sm={7} md={7} lg={7} xl={7} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(183, 21, 21, 0.1)',
                  backdropFilter: 'blur(1px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '20px',
                  borderRadius: '5px',
                  fontSize: { xs: '1rem', sm: '1rem', md: '1rem' },
                }}
              >
                {text}
              </Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
  );
}

export default HeaderAbout;
