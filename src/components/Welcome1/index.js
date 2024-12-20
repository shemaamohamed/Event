import { Box, Button, Grid, Typography } from "@mui/material";


const Welcome1= () => {
  return(
    <Grid container spacing={5} alignItems="center">
    <Grid item
    sx={{
      justifyContent:'flex-start',
      alignItems:'center',
      display:'flex',
      flexDirection:'column'
    }}
     xs={12} md={6}>
      <Typography
        variant="body1"
        textAlign="justify"
        sx={{
          lineHeight: 1.8,
          color: "#555",
          fontSize: "1rem",
          fontWeight: "400",
          marginBottom: "1rem",
        }}
      >
        We are dedicated to being readily available to address
        any inquiries you may have and provide all the necessary support. Our
        outstanding reputation for delivering specialized services is the
        outcome of our management philosophy, which emphasizes the importance
        of delivering quality work and establishing long-term client
        relationships. From the initial stages of the planning process to the
        final execution, we will be there to assist you every step of the way.
        Benefit from our extensive experience and in-depth knowledge of the
        Jordanian market.
      </Typography>
      <Button
      variant="contained"
      component="a"
      href='/about'
      sx={{
        marginTop: '15px',
        backgroundColor: '#c82333',
        '&:hover': {
          backgroundColor: '#e74c3c',
        },
        padding: '8px 16px',
        fontSize: '1rem',
        fontWeight: '600',
        textTransform: 'none',
      }}
      >
        Read more

      </Button>
    </Grid>

    <Grid item xs={12} md={6}>
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        "&:hover .overlay": {
          opacity: 0.7,
        },
        "&:hover .play-icon": {
          opacity: 1,
          transform: "scale(1.5)",
        },
        height:'40vh'
      }}
    >
       <img
        src="/image/Events.jpg"
        controls
        style={{
          width: "100%",
          height: "100%",
        }}
      ></img> 

     



      
    </Box>
</Grid>

  </Grid>

  );
 
  

  

  
};

export default Welcome1;
