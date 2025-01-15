import React from "react";
import { Box, Typography, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";


function FailedVerification() {
    const navigate =useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      marginTop= "10vh"
    >
        <ErrorIcon
        style={{ fontSize: "130px" ,color:'#c62828' }}
       
        />
      <Typography variant="h4" gutterBottom>
        Failed
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
      Your Email verification failed. Please try again.
      </Typography>
      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={() => {
            navigate('/registertype')
        }}
        sx={{ mt: 2,
            color:'white',
            backgroundColor:'#c62828'

         }}
      >
        Continue
      </Button>
    </Box>
  );
}

export default FailedVerification;
