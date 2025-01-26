import React, { useEffect, useState } from "react";
import axiosInstance from "../../common/http";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import loginImg from "../../icons/loginImg.svg";
import { useAuth } from "../../common/AuthContext";
import { useLocation } from "react-router-dom";

import "./style.scss";
import { Button, Container, Grid, Grid2, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const { login, isAdmin, registrationType } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitlLogin = async () => {
    const url = `${BaseUrl}/login`;
    console.log({ BaseUrl });

    const userData = {
      email,
      password,
    };

    try {
      const response = await axiosInstance.post(url, userData);
      const token = response.data.token;
      login(token);
      
      console.log(response?.data?.user?.isAdmin);
      console.log(response?.data?.user?.registration_type);

      // Wait until isAdmin is updated
      if (response?.data?.user?.isAdmin) {
        navigate("/");
      } else {
        if (response?.data?.user?.registration_type === "speaker") {
          navigate("/speaker/profile");
        } else if (response?.data?.user?.registration_type === "sponsor") {
          navigate("/sponsor/stepper");
        }else if (response?.data?.user?.registration_type === "group_registration") {
          navigate("/add/excel");
        } 
        else{
          navigate("/home");

        }
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
      console.error("Login error:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let errorEmail = "";
    let errorPassword = "";
    let errorConfirmPassword = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errorEmail = "Please enter your email.";
    } else if (!emailRegex.test(email)) {
      errorEmail = "Please enter a valid email.";
    }

    if (!password) {
      errorPassword = "Please enter your password.";
    }
    if (!confirmPassword) {
      errorConfirmPassword = "Please enter your password.";
    }

    setError({
      email: errorEmail,
      password: errorPassword,
      confirmPassword: errorConfirmPassword,
    });

    if (email && emailRegex.test(email) && password) {
      setError({
        email: "",
        password: "",
        confirmPassword: "",
      });
      submitlLogin();
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" ,marginTop: '32px'}}>
      <Grid container sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <form onSubmit={handleLogin} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
              <Typography variant="h4" sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding:'10px',
                color: " #9B1321",
              }} className="login-title">
                Login
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
              <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
              <TextField
                error={error.password ? true : false}
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"Enter your password"}
                helperText={error.password}
                fullWidth
                sx={{
                    color: "#000000",
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#000000",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#000000",
                  },
                }}
              />

              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={10} xl={10}
              sx={{
                paddingTop:'4px !important',

              }}
              >
              <Typography variant="body1" sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                textDecoration: "none",

                
              }}>
                 {' '}<span
                style={{
                color: "#c62828",
                cursor: "pointer",

                }}
              onClick={() => {
                navigate("/forgetpassword");
              }}
            >
              forget password
            </span>
              </Typography>
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
              >
                Login
              </Button>
              
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
              <Typography variant="body1" sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2px",
                textDecoration: "none",
                
              }}>
                Don't have an account? {' '}<span
                style={{
                color: "#9B1321",
                cursor: "pointer",

                }}
              onClick={() => {
                navigate("/registertype");
              }}
            >
              Register
            </span>
              </Typography>
              </Grid>
              
          </Grid>

        </form>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <img src={loginImg} alt="login" className="login-img" />
        </Grid>

      </Grid>


    </Container>
  );
};

export default LoginPage;
