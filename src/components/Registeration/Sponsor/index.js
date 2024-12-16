import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "./style.scss";
import httpService from "../../../common/httpService";
import DialogMessage from "../../DialogMessage";
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, TextField, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { darken } from '@mui/system';


const RegisterSponsorPage = () => {
  const navigate = useNavigate();
  const { conferenceId } = useParams();
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [email, setEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [error, setError] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    whatsApp: "",
    email: "",
    companyAddress: "",
  });

  const handleSubmit = async () => {
    const sponsorData = {
      company_name: companyName,
      contact_person: contactPerson,
      phone_number: phone,
      whatsapp_number: whatsApp,
      email: email,
      company_address: companyAddress,
      password: password,
      registration_type: "sponsor",
      conference_id: conferenceId,
    };

    try {
      // استدعاء HTTP لإنشاء الراعي
      await httpService({
        method: "POST",
        url: `${BaseUrl}/sponsor`,
        data: sponsorData,
        withToast: true,
      });

      setIsDialogOpen(true);
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let errorCompanyName = "";
    let errorContactPerson = "";
    let errorPhone = "";
    let errorWhatsApp = "";
    let errorEmail = "";
    let errorCompanyAddress = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Company name validation
    if (!companyName) {
      errorCompanyName = "Please enter the company name.";
    }

    // Contact person validation
    if (!contactPerson) {
      errorContactPerson = "Please enter the contact person.";
    }

    // Phone validation
    if (!phone) {
      errorPhone = "Please enter the phone number.";
    }

    // WhatsApp validation
    if (!whatsApp) {
      errorWhatsApp = "Please enter the WhatsApp number.";
    }

    // Email validation
    if (!email) {
      errorEmail = "Please enter the email.";
    } else if (!emailRegex.test(email)) {
      errorEmail = "Please enter a valid email.";
    }

    // Company address validation
    if (!companyAddress) {
      errorCompanyAddress = "Please enter the company address.";
    }

    // Set errors in state
    setError({
      companyName: errorCompanyName,
      contactPerson: errorContactPerson,
      phone: errorPhone,
      whatsApp: errorWhatsApp,
      email: errorEmail,
      companyAddress: errorCompanyAddress,
    });

    // Submit the form if no errors
    if (
      companyName &&
      contactPerson &&
      phone &&
      whatsApp &&
      emailRegex.test(email) &&
      companyAddress
    ) {
      setError({
        companyName: "",
        contactPerson: "",
        phone: "",
        whatsApp: "",
        email: "",
        companyAddress: "",
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
        message={"Thank you for applying to Sponser at the conference.You will be contacted directly by the organizing company via email."}
      />
      
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
                    Register Company
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
                    label="Company Name"
                    error={error.companyName ? true : false}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    helperText={error.companyName}
                    fullWidth
                    placeholder="e.g. ABC Corp"
                    type="text"
                  />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    label="Contact Person"
                    error={error.contactPerson ? true : false}
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    helperText={error.contactPerson}
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

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    label="Company Address"
                    error={error.companyAddress ? true : false}
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    helperText={error.companyAddress}
                    fullWidth
                    placeholder="e.g. 1234 Elm St, City, Country"
                    type="text"
                  />
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
          
        </Grid>
    </Container>
  
  );
};

export default RegisterSponsorPage;
