import React, { useEffect } from "react";
import Stepper from "../../CoreComponent/stepper";
import ReservationForm from "./ReservationForm/index";
import { StepperProvider, useStepper } from "./StepperContext";
import RoomForm from "./RoomForm";
import InvoiceForm from "./InvoiceForm";
import "./style.scss";
import PayForm from "./PayForm";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

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
    { title: "Speaker Reservation" },
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
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
        <Grid container>
          <Grid item>
          <div
            style={{
              cursor: 'pointer',
              marginTop:'10px',
              padding:'4px',
              marginLeft:'10px'
            }}
            onClick={handleBackClick}
          >
            <span className="icon">🔙</span>
            <span className="label">Back</span>
          </div>
            </Grid>
       
        </Grid>
        {/* Back Button Section */}
       
        <Grid item xs={12} md={4} xl={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #ccc", // إضافة الحدود
          borderRadius: "8px", // جعل الزوايا دائرية
          padding: "20px", // إضافة مسافة داخلية
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // إضافة ظل خفيف للصندوق
          height:{
            xs: 'auto',
            md: '40vh'
          }
        }}
        >
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
        
        <Grid item xs={12} md={8} xl={9}>
          <div
            style={{
              padding: '20px',
            }}
          >
               <div className="header-current-step">Reservation Form</div>
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
