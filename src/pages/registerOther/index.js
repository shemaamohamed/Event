import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { darken } from '@mui/system';


const RegisterOther = () => {
  const navigate = useNavigate();
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(`${BaseUrl}/store/user`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("User created successfully!");
      console.log(response);
      
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
      }
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let errorName = "";
    let errorEmail = "";
    let errorPassword = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation
    if (!name) {
      errorName = "Please enter your name.";
    }

    // Email validation
    if (!email) {
      errorEmail = "Please enter your email.";
    } else if (!emailRegex.test(email)) {
      errorEmail = "Please enter a valid email.";
    }

    // Password validation
    if (!password) {
      errorPassword = "Please enter your password.";
    }

    setError({
      name: errorName,
      email: errorEmail,
      password: errorPassword,
    });

    if (!errorName && !errorEmail && !errorPassword) {
      setError({
        name: "",
        email: "",
        password: "",
      });
      handleSubmit();
    }
  };

  return (
    <Container
    sx={{ display: "flex", justifyContent: "center", alignItems: "center" ,marginTop: '20vh',
      padding:'20px'
    }}

    >
      
      
        <Grid container 
        sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
         >
          <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
            <form onSubmit={handleRegister} >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                >
                  <Typography
                  sx={{
                   
                    padding:'10px',
                    color: " #c62828",
                  }} 
                  variant="h4"
                  >
                    Register
                  </Typography>
                  <Typography variant="body1" sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginTop: "10px",
                                  textDecoration: "none",
                                  
                                }}>
                                  <Button
                                  sx={{
                                  color: "white",
                                  cursor: "pointer",
                                  backgroundColor:'#c62828',
                                  '&:hover': {
                                    backgroundColor: darken('#dc143c', 0.2), // Darken color by 10%
                                  },
                  
                                  }}
                                onClick={() => {
                                  navigate("/login");
                                }}
                              >
                                login
                              </Button>
                              </Typography>
                </Grid>
                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    label="Name"
                    error={error.name ? true : false}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    helperText={error.name}
                    fullWidth
                    placeholder="e.g. John Doe"
                    type="text"
                  />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    label="Email"
                    error={error.email ? true : false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText={error.email}
                    fullWidth
                    placeholder="e.g. example@example.com"
                    type="email"

                  />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField
                     error={error.password ? true : false}
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     helperText={error.password}
                     fullWidth
                     label="Password"
                     placeholder="Enter your password "
                     type="password"
                    

                    />
                  </Grid >


                  
                  
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                  >
                    <Button
                    sx={{
                      backgroundColor:'#c62828',
                      '&:hover': {
          backgroundColor: darken('#dc143c', 0.2), // Darken color by 10%
        },
                      color: "#ffffff",
                      width:{
                        xs: '100%',  
                        sm: '100%',  
                        md: '100%', 
                        lg: '50%',   
                        xl: '50%' 


                      }
                      
                    }}
                    type="submit"
                    >Register</Button>

                  </Grid>
                  





              </Grid>
            </form>


          </Grid>
          
        </Grid>
    </Container>
    
  );
};

export default RegisterOther;
