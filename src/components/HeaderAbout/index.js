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
          xs: "50vh",
          sm: "50vh",
          md: "50vh",
          lg: "50vh",
          xl: "50vh",
        },
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
            </Typography>
          </motion.div>
        </Grid>

        {/* {[ // Map through the repetitive content for cleaner code
        '  In response to the rapidly changing market, more companies are seeking external expertise from efficient providers who can organize and manage prestigious events while offering marketing solutions at minimal cost and time.'

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
        ))} */}
      </Grid>
    </Container>
    </Box>
  );
}

export default HeaderAbout;
