import React, { useState } from 'react';
import forgotpasswordImg from "../../icons/forgotpassword.svg";

import "./style.scss";
import { Button, Container, Grid, Grid2, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
      const navigate = useNavigate();
    
    const [error, setError] = useState({
        email: "",
        password: "",
        confirmPassword: "",
      });

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission logic here
        console.log('Email submitted:', email);
    };

    return (
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" ,marginTop: '32px'}}>
        <Grid container sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }} spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <form  >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Typography variant="h4" sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding:'10px',
                  color: " #c62828",
                }} className="login-title">
                    Forget Password 
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <TextField
                  error={error.email ? true : false}
                  type="email"
                  label="Email"
                  value={email}
                  placeholder={"Enter your email"}
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={error.email}
                  fullWidth
  
                />
                </Grid>
                 <Grid item xs={12} sm={12} md={12} lg={10} xl={10}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              >
                              <Button type="submit" 
                              sx={{
                                backgroundColor: " #c62828",
                                color: "#ffffff",
                                width: "100%",
                              }}
                              onClick={() => {
                                navigate("/resetpassword");
                              }}
                              >
                                Login
                              </Button>
                              
                              </Grid>
                
               
                
            </Grid>
  
          </form>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <img
            style={{width: '100%', height: '100%'}}
             src={forgotpasswordImg} alt="login" className="login-img" />
          </Grid>
  
        </Grid>
  
  
      </Container>
    );
};

export default ForgetPassword;