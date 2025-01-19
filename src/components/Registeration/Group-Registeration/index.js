import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./style.scss";
import axios from "axios";
import DialogMessage from "../../DialogMessage";  // استيراد DialogMessage
import { Button, Container, FormControl, Grid, InputLabel, TextField, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { darken } from '@mui/system';


const RegisterGroupPage = () => {
  const navigate = useNavigate();
  const { conferenceId } = useParams();
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const [organizationName, setOrganizationName] = useState(""); // اسم الجمعية أو وزارة الصحة أو الشركة
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [doctorsRegistered, setDoctorsRegistered] = useState(""); // عدد الأطباء المسجلين

  const [error, setError] = useState({
    organizationName: "",
    contactPerson: "",
    phone: "",
    password: "",
    email: "",
    companyAddress: "",
    doctorsRegistered: "", // خطأ محتمل في عدد الأطباء
  });

  // حالة لفتح رسالة الحوار
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", organizationName); // تعديل اسم الحقل
    formData.append("contact_person", contactPerson);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("number_of_doctors", doctorsRegistered); // إضافة عدد الأطباء
    formData.append("conference_id", conferenceId); // إضافة conference_id إلى البيانات
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(
        `${BaseUrl}/register/group`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Organization registered successfully!");
      setIsDialogOpen(true);  // فتح رسالة الحوار عند التسجيل الناجح
      setTimeout(() => {
      }, 3000); // الانتظار 3 ثوانٍ قبل التوجيه
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let errorOrganizationName = "";
    let errorContactPerson = "";
    let errorPhone = "";
    let errorPassword = "";
    let errorEmail = "";
    let errorDoctorsRegistered = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Organization name validation
    if (!organizationName) {
      errorOrganizationName = "Please enter the organization name.";
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
    if (!password) {
      errorPassword = "Please enter the password.";
    }

    // Email validation
    if (!email) {
      errorEmail = "Please enter the email.";
    } else if (!emailRegex.test(email)) {
      errorEmail = "Please enter a valid email.";
    }

    // Doctors registered validation
    if (!doctorsRegistered) {
      errorDoctorsRegistered = "Please enter the number of registered doctors.";
    }

    // Set errors in state
    setError({
      organizationName: errorOrganizationName,
      contactPerson: errorContactPerson,
      phone: errorPhone,
      email: errorEmail,
      doctorsRegistered: errorDoctorsRegistered,
    });

    // Submit the form if no errors
    if (
      organizationName &&
      contactPerson &&
      phone &&
      password &&
      emailRegex.test(email) &&
      doctorsRegistered
    ) {
      setError({
        organizationName: "",
        contactPerson: "",
        phone: "",
        password: "",
        email: "",
        doctorsRegistered: "",
      });
      handleSubmit();
    }
  };

  return (
    <Container
    sx={{ display: "flex", justifyContent: "center", alignItems: "center" ,marginTop: '20vh'}}

    >
      <DialogMessage
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        message={"Your organization has been successfully registered! You will be notified via email once the admin approves your registration."}
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
                    Register Organization
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
                    label="Organization Name"
                    error={error.organizationName ? true : false}
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    helperText={error.organizationName}
                    fullWidth
                    placeholder="e.g. ABC Corp or Ministry of Health"
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
                     error={error.doctorsRegistered ? true : false}
                     value={doctorsRegistered}
                     onChange={(e)=>setDoctorsRegistered(e.target.value)}
                     helperText={error.doctorsRegistered}
                     fullWidth
                     label="Number of Registered Doctors"
                     placeholder="e.g. 50"
                     type="number"
                    

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

export default RegisterGroupPage;
