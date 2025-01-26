import React, { useState } from "react";
import Stepper from "../../CoreComponent/stepper";
import "./style.scss";
import SponsorSection from "../Sponsor/SponsorshipOption";
import SponsorInvoice from "../SpoonsotInvoice";
import ViewAgreement from "../Sponsor/viewAgreement";
import AgreementSigning from "../Sponsor/Agreement Signing";
import SponsorshipWelcomeMessage from "../Sponsor/Welcome";
import WelcomeMessage from "../Sponsor/WelcomeMessage 22";
import { Item } from 'react-photoswipe-gallery';
import { Divider, Grid } from "@mui/material";
const SpoParentComponent = () => {
  // Stepper data
  // step2
  const [options, setOptions] = useState([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [selectedSponsorshipIds, setSelectedSponsorshipIds] = useState([]);
  const [chosenBooths, setChosenBooths] = useState([]);
  const [exhibitNumber, setExhibitNumber] = useState("");
  const [shellSchemeSelected, setShellSchemeSelected] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [shellSchemePrice, setShellSchemePrice] = useState(0);
  const [squareMeters, setSquareMeters] = useState(0);

  //step 3
  const [invoiceData2, setInvoiceData2] = useState(null);
  //step4
  const [agreementFile, setAgreementFile] = useState(null);

  const stepperInfo = [
    { title: "Welcome to the Sponsorship Journey" },
    { title: " Choose Conference Sponsorship Options" },
    { title: "Invoice Details" },
    { title: "Download and Sign Agreement" },
    { title: "Upload Logo, Advertisements, and Signed Agreement" },
    { title: "Thank You for Joining Us as a Sponsor" },
  ];
  // State to manage current step
  const [currentStep, setCurrentStep] = useState(0);
  // Array of completed steps (indices)
  const [completedSteps, setCompletedSteps] = useState([]);
  // ayat state

  const handleNext = () => {
    // Mark current step as completed and move to the next step
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    // Go back to the previous step
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step components
  const stepComponents = [
    {
      stepNumber: 1,
      component: (
        <div>
          <WelcomeMessage handleNext={handleNext} handlePrevious={handlePrevious} />
        </div>
      ),
    },
    {
      stepNumber: 2,
      component: (
        <div>
          <SponsorSection
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            options={options}
            setOptions={setOptions}
            selectedOptionIds={selectedOptionIds}
            setSelectedOptionIds={setSelectedOptionIds}
            selectedSponsorshipIds={selectedSponsorshipIds}
            setSelectedSponsorshipIds={setSelectedSponsorshipIds}
            chosenBooths={chosenBooths}
            setChosenBooths={setChosenBooths}
            exhibitNumber={exhibitNumber}
            setExhibitNumber={setExhibitNumber}
            shellSchemeSelected={shellSchemeSelected}
            setShellSchemeSelected={setShellSchemeSelected}
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            shellSchemePrice={shellSchemePrice}
            setShellSchemePrice={setShellSchemePrice}
            squareMeters={squareMeters}
            setSquareMeters={setSquareMeters}
          />
        </div>
      ),
    },
    {
      stepNumber: 3,
      component: (
        <div>
          <SponsorInvoice
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            invoiceData2={invoiceData2}
            setInvoiceData2={setInvoiceData2}
          />
        </div>
      ),
    },
    {
      stepNumber: 4,
      component: (
        <div>
          <ViewAgreement
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            agreementFile={agreementFile}
            setAgreementFile={setAgreementFile}
          />
        </div>
      ),
    },

    ,
    {
      stepNumber: 5,
      component: (
        <div>
          <AgreementSigning handleNext={handleNext}
            handlePrevious={handlePrevious} />
        </div>
      ),
    },
    {
      stepNumber: 6,
      component: (
        <div>
          <SponsorshipWelcomeMessage handleNext={handleNext}
            handlePrevious={handlePrevious} />
        </div>
      ),
    },
  ];

  return (
    <div className="parentComponent">
      <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          marginTop:'1vh',
          display: "flex",
          flexDirection: "column",
          justifyContent:"flex-start",
          position: { xs: "relative", md: "sticky" },
          top: "20px",
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
        
        
          <Stepper
        stepperInfo={stepperInfo}
        completedSteps={completedSteps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        direction="vertical"
        stepsGap="50px"
        className="customStepper2"
      />
      </Grid>
      </Grid>
      

      

      <Grid item xs={12} sm={12} md={8} >
        {
          stepComponents.find((step) => step?.stepNumber - 1 === currentStep)
            ?.component
        }
        {/* <div className="stepperControls">
          <button onClick={handlePrevious} disabled={currentStep === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === stepComponents.length - 1}
          >
            Next
          </button>
        </div> */}
      </Grid>
        </Grid>
     
    </div>
  );
};

export default SpoParentComponent;
