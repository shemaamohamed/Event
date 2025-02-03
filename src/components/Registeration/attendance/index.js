import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "./style.scss";
import DialogMessage from "../../DialogMessage";

const RegisterAttendancePage = () => {
  const navigate = useNavigate();
  const { conferenceId, type ,priceId} = useParams();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
console.log({priceId});

  const handlePayment = async () => {
    setPaymentStatus(true);
  };
  function getPrice(conferenceData) {
    // Find the conference with the given ID
    const conference = conferenceData.find((conf) => conf.id == conferenceId);

    if (!conference) {
      return `Conference with ID ${conferenceId} not found.`;
    }
console.log(conference?.prices);

    // Find the doctor price in the prices array
    const doctorPrice = conference.prices.find(
      (price) => price.id == priceId 
    );
    console.log(conference.prices);
    console.log(priceId);
    
    
// console.log({doctorPrice});

    if (!doctorPrice) {
      return `Doctor price not found for conference ID ${conferenceId}.`;
    }

    return doctorPrice.price;
  }
  const getConference = () => {
    
    const url = `${BaseUrl}/con/upcoming`;

    axios
      .get(url)
      .then((response) => {
        console.log(response.data.upcoming_conferences);
// console.log(getPrice(response?.data?.upcoming_conferences));

        setPrice(getPrice(response?.data?.upcoming_conferences));
      })
      .catch((error) => {
        console.error("Error fetching conferences", error);
      });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
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
      formData.append("conference_id", conferenceId);

      await axios.post(`${BaseUrl}/users/${conferenceId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsDialogOpen(true)
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };
  useEffect(() => {
    getConference();
  }, []);
  return (
    <Container className="register-attendance-page"
    sx={{
      padding:'20px',
      marginTop:'20vh'
    }}
    >
      <DialogMessage
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        message={`Thank you for registering to attend the conference. You will receive an email notification once your registration is approved by the admin.`}
        onOk={() => {
          setIsDialogOpen(false);
        }}
        onClose={() => {
          setIsDialogOpen(false);
        }}
      />
      {!paymentStatus ? (
        <div className="payment-section">
          <div>Payment Required</div>
          <div>
            Please make a payment of ${price} to proceed with the registration.
          </div>
          <Button
            variant="contained"
            color="error"
            onClick={handlePayment}
            disabled={isProcessingPayment}
          >
            {isProcessingPayment ? "Processing..." : `Pay $${price}`}
          </Button>
        </div>
      ) : (
        <div className="form-section">
          <Typography variant="h4" className="form-title">
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PhoneInput
                country="jo"
                value={phone}
                onChange={setPhone}
                inputStyle={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="WhatsApp"
                value={whatsApp}
                onChange={(e) => setWhatsApp(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nationality"
                value={selectedNationality}
                onChange={(e) => setSelectedNationality(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
              />
            </Grid>
            <div className="but-con2">
              <Button
                variant="contained"
                sx={{
                  backgroundColor:"#9B1321"
                }}
                onClick={handleRegister}
                className="submit-button"
              >
                Submit
              </Button>
            </div>
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default RegisterAttendancePage;
