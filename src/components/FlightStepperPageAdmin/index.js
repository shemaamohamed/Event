import React, { useEffect, useState } from "react";
import Stepper from "../../CoreComponent/stepper";
import "./style.scss";
import FlightInformation from "./FlightInformation";
import {
  AdminFlightStepperProvider,
  useFlightStepperAdmin,
} from "./StepperContext";
import { removeFromLocalStorage, removeFromLocalStorageStartWith } from "../../common/localStorage";
import { useNavigate } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";

const AdminFlightStepperPageContent = () => {
  const {
    currentStep,
    completedSteps,
    setCurrentStep,
    completeStep,
    flightMembers,
  } = useFlightStepperAdmin();
  const navigate = useNavigate();

  // Dynamically generate steps based on the number of flight members
  const stepperInfo = flightMembers?.map((member, index) => ({
    title: `${member?.passenger_name} Flight Information `,
  }));

  const componentsMap = flightMembers?.map((member, index) => (
    <FlightInformation key={index} member={member} index={index} />
  ));
  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page
  };
  useEffect(() => {
    return () => {
      removeFromLocalStorage("flightDetails");
      removeFromLocalStorageStartWith("flightTrips_")
      removeFromLocalStorageStartWith("ticketPricing_")
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
            Title
          </Typography>
            <div className="current-component">{componentsMap[currentStep]}</div>
          
        </div>
      </Grid>
    </Grid>
  </div>
   
  );
};

const FlightStepperPageAdmin = () => (
  <AdminFlightStepperProvider>
    <AdminFlightStepperPageContent />
  </AdminFlightStepperProvider>
);

export default FlightStepperPageAdmin;
