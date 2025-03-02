import React, { useEffect, useState } from "react";
import Stepper from "../../CoreComponent/stepper";
import "./style.scss";
import { TripsStepperProvider, useTripsStepper } from "./StepperContext";
import SpeackerTripForm from "./SpeackerTripForm/index";
import ParticipantTripForm from "./ParticipantTripForm";
import AdditionalOptionsForm from "./AdditionalOptionsForm";
import { removeFromLocalStorage } from "../../common/localStorage";
import InvoiceTripForm from "./InvoiceTripForm";
import PayForm from "./PayForm";
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";
import httpService from "../../common/httpService";

const TripsStepperPageContent = () => {
  const { currentStep, completedSteps, setCurrentStep, completeStep } =
    useTripsStepper();
  const navigate = useNavigate();
  const getAuthToken = () => localStorage.getItem("token");
const [id,setId]=useState(0)
const [total,setTotal]=useState("")
  const stepperInfo = [
    { title: "Accommodation Details" },
    { title: "Companion Details" },
    { title: "Additional Options Details" },
    { title: "Invoice" },
    { title: "Pay Form" },
  ];

  const componentsMap = [
    <SpeackerTripForm />,
    <ParticipantTripForm />,
    <AdditionalOptionsForm />,
    <InvoiceTripForm total={total} setTotal={setTotal} id={id} setId={setId}/>,
    <PayForm  total={total}  id={id} />,
  ];
  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page
  };
  useEffect(() => {
    return () => {
      removeFromLocalStorage("additionalOptions");
      removeFromLocalStorage("AdditionalOptionsData");
      removeFromLocalStorage("participants");
      removeFromLocalStorage("AccommodationData");
      removeFromLocalStorage("invoiceIds");
    };
  }, []);

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        {/* Back Button Section */}
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            position: { xs: "relative", md: "sticky" },
            top: "5px",
            backgroundColor: "white",
            zIndex: 1,

            borderRadius: "8px",
            padding: "20px",
            height: {
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
              Trips Form
            </Typography>
            <div className="current-component">
              {componentsMap[currentStep]}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const TripsStepperPage = () => (
  <TripsStepperProvider>
    <TripsStepperPageContent />
  </TripsStepperProvider>
);

export default TripsStepperPage;
