import React from "react";
import { Box, Typography, Button, Icon } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

function SuccessVerification() {
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
        <CheckCircleIcon 
        style={{ fontSize: "130px" ,color:'#c62828' }}
       
        />
      <Typography variant="h4" gutterBottom>
        Success
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Your Email has been successfully verified
      </Typography>
      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={() => {
            navigate('/login')
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

export default SuccessVerification;
