import React, { useState } from 'react';
import forgotpasswordImg from "../../icons/forgotpassword.svg";

import "./style.scss";
import { Button, Container, Grid, Grid2, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
const ForgetPassword = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL;

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
    const handleReset = (e) => {
      e.preventDefault(); // منع إرسال النموذج وتحديث الصفحة
  
      axios.post(`${BaseUrl}/forgot-password`, { email: email })
          .then(response => {
              console.log("Password reset link sent:", response.data);
              toast.success("Password reset link sent");
              // هنا يمكنك توجيه المستخدم إلى صفحة تحتوي على رابط إعادة تعيين كلمة المرور (مثل صفحة لإدخال التوكن وكلمة المرور الجديدة)
          })
          .catch(error => {
              console.error("Error:", error);
              toast.error("Failed to send reset link");
          });
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
                  color: " #9B1321",
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
                                backgroundColor: " #9B1321",
                                color: "#ffffff",
                                width: "100%",
                              }}
                              onClick={(e) => {
                               handleReset(e)
                              }}
                              >
                                Reset Password
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