import React, { useEffect } from "react";
import Stepper from "../../CoreComponent/stepper";
import ReservationForm from "./ReservationForm/index";
import { StepperProvider, useStepper } from "./StepperContext";
import RoomForm from "./RoomForm";
import InvoiceForm from "./InvoiceForm";
import "./style.scss";
import PayForm from "./PayForm";
import { useNavigate } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";

export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error("Error retrieving from localStorage", error);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
};

const ParentComponentContent = () => {
  const { currentStep, completedSteps, setCurrentStep, completeStep } =
    useStepper();
    const navigate = useNavigate();

  const stepperInfo = [
    { title: "Reservation of User " },
    { title: "Reservation Of Companions" },
    { title: "Reservation Details" },
    { title: "Invoice" },
  ];

  const componentsMap = [
    <ReservationForm />,
    <RoomForm />,
    <InvoiceForm />,
    <PayForm />,
  ];
  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page
  };
  useEffect(() => {
    return () => {
      removeFromLocalStorage("mainRoom");
      removeFromLocalStorage("otherRooms");
    };
  }, []);

  return (
    
    <div
    style={{
      padding: "20px",
    }}
  >
    <Grid container spacing={2} alignItems="flex-start" justifyContent="flex-start">
      {/* Back Button Section */}
      <Grid
        item
        xs={12}
        md={4}
        xl={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent:"flex-start",
          position: { xs: "relative", md: "sticky" },
          top: "5px",
          backgroundColor: "white",
          zIndex:1,
          
          borderRadius: "8px",
          padding: "20px",
          height:{
            xs: "auto",
            md: "100vh",

          },
          flexShrink: 0, 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
        }}
      >
       
      
        <Grid item xs={12}>
        <Grid item xs={12}>
          <div
            style={{
              cursor: "pointer",
              marginTop: "10px",
              padding: "4px",
              marginLeft: "10px",
            }}
            onClick={handleBackClick}
          >
            <span className="icon">🔙</span>
            <span className="label">Back</span>
          </div>
        </Grid>
        <Divider
          sx={{
            color: "black",
            margin: "10px",
            backgroundColor: "black",
          }}
        />
          <Stepper
            stepperInfo={stepperInfo}
            completedSteps={completedSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className="customStepper"
            direction="vertical"
            stepsGap="20px"
          />
        </Grid>
      </Grid>
  
      {/* Reservation Form Section */}
      <Grid item xs={12} md={8} xl={9}>
        <div
          style={{
            padding: "20px",
          }}
        >
          <Typography
            textAlign={"center"}
            variant="h6"
            sx={{
              color: "#c62828",
              fontWeight: "bold",
            }}
          >
            Reservation Form
          </Typography>
          <div className="current-component">{componentsMap[currentStep]}</div>
        </div>
      </Grid>
    </Grid>
  </div>
  
  );
};

const ParentComponent = () => (
  <StepperProvider>
    <ParentComponentContent />
  </StepperProvider>
);

export default ParentComponent;
{/* <div className="payment-success">
<h2>✅ Payment Successfully Completed!</h2>
<p>Thank you! You have successfully completed the payment. Your visa application will be processed soon.</p>

</div> */}
