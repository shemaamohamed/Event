import React, {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { countriesOptions, nationalitiesOptions } from "../../../constant";
import registerImg from "../../../icons/registerImg.svg";
import axios from "axios";
import "./style.scss";
import DialogMessage from "../../DialogMessage";
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { darken } from '@mui/system';


const RegisterAttendancePage = () => {
  const navigate = useNavigate();
  const { conferenceId } = useParams(); // هنا نستخدم معرف المؤتمر من المعاملات
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [country, setCountry] = useState("");
  const BaseUrl = process.env.REACT_APP_BASE_URL;;

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    whatsApp: "",
    specialization: "",
    nationality: "",
    country: "",
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("registration_type", "attendance");
    formData.append("phone_number", phone);
    formData.append("whatsapp_number", whatsApp);
    formData.append("specialization", specialization);
    formData.append("nationality", selectedNationality);
    formData.append("country_of_residence", country);
    formData.append("conference_id", conferenceId); // تم التعديل هنا
    

    try {
      const response = await axios.post(
        `${BaseUrl}/users/${conferenceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsDialogOpen(true);
      toast.success("User created successfully!");
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
    let errorPhone = "";
    let errorWhatsApp = "";
    let errorSpecialization = "";
    let errorNationality = "";
    let errorCountry = "";

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

    // Phone validation
    if (!phone) {
      errorPhone = "Please enter your phone number.";
    }

    // WhatsApp validation
    if (!whatsApp) {
      errorWhatsApp = "Please enter your WhatsApp number.";
    }

    // Specialization validation
    if (!specialization) {
      errorSpecialization = "Please enter your specialization.";
    }

    // Nationality validation
    if (!selectedNationality) {
      errorNationality = "Please select your nationality.";
    }

    // Country validation
    if (!country) {
      errorCountry = "Please select your country.";
    }

    // Set errors in state
    setError({
      name: errorName,
      email: errorEmail,
      password: errorPassword,
      phone: errorPhone,
      whatsApp: errorWhatsApp,
      specialization: errorSpecialization,
      nationality: errorNationality,
      country: errorCountry,
    });

    // Submit the form if no errors
    if (
      name &&
      email &&
      emailRegex.test(email) &&
      password &&
      phone &&
      whatsApp &&
      specialization &&
      selectedNationality &&
      country
    ) {
      setError({
        name: "",
        email: "",
        password: "",
        phone: "",
        whatsApp: "",
        specialization: "",
        nationality: "",
        country: "",
      });
      handleSubmit();
    }
  };

  return (
    <Container
    sx={{ display: "flex", justifyContent: "center", alignItems: "center" ,marginTop: '32px'}}

    >
      <DialogMessage
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      
        <Grid container  >
          <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
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
                 <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                      <InputLabel 
                      id="whatsapp"

                      shrink style={{ marginBottom: "8px" }}>
                      WhatsApp Number
                      </InputLabel>
                    <PhoneInput
                    labelId='whatsapp'
                      country={"jo"} // Jordan كدولة افتراضية
                      value={whatsApp}
                      onChange={setWhatsApp}
                      inputStyle={{
                        width: "100%", // توسيع حقل الإدخال
                        height: "56px", // توافق مع ارتفاع TextField
                        borderColor: error.whatsApp ? "red" : "#c4c4c4", // إطار أحمر في حالة الخطأ
                        borderRadius: "4px", // تدوير الحواف
                      }}
                      placeholder="Enter your  WhatsApp number"
                    />
                    {error.whatsApp && (
                      <FormHelperText style={{ color: "red" }}>{error.whatsApp}</FormHelperText>
                    )}
                    </FormControl>

                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                      <InputLabel 
                      id='phone'
                      shrink style={{ marginBottom: "8px" }}>
                      Phone Number
                      </InputLabel>
                    <PhoneInput
                    labelId='phone'
                    country={"jo"} 
                    value={phone}
                    onChange={setPhone}
                    inputStyle={{
                      width: "100%", 
                      height: "56px", 
                      borderColor: error.phone ? "red" : "#c4c4c4", 
                      borderRadius: "4px", 
                    }}
                    placeholder="Enter your phone number"

                    />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextField
                    label="Specialization"
                    error={error.specialization ? true : false}
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    helperText={error.specialization}
                    fullWidth
                    placeholder="e.g. Software Engineer"
                    type="text"
                  />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <InputLabel
                    id="nationality"

                    >
                    Nationality
                    </InputLabel>
                    <Select
                    labelId="nationality"
                    value={selectedNationality}
                    onChange={(e) => setSelectedNationality(e.target.value)}
                    label="Nationality"
                    errorMsg={error.country}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200, 
                          overflowY: 'auto',
                          

                        },
                      },
                    }}
                   
                  >
                  {nationalitiesOptions.map((option) => (
                            <MenuItem
                            

                             key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                  </Select>
                  </FormControl>
                    
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <InputLabel
                    id="label"

                    >
                      Country
                    </InputLabel>
                    <Select
                    labelId="label"

                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    label="Country"
                    errorMsg={error.country}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200, 
                          overflowY: 'auto',
                          

                        },
                      },
                    }}
                   
                  >
                  {countriesOptions.map((option) => (
                            <MenuItem
                            

                             key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                  </Select>
                  </FormControl>

                  </Grid>
                  
                  
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
          <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
            <img src={registerImg} alt="register" className="register-img" />


          </Grid>
        </Grid>
    </Container>
  );
};

export default RegisterAttendancePage;
