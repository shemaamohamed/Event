import React, { useState } from "react";
import Stepper from "../../CoreComponent/stepper";

const SpoParentComponent = () => {
  // Stepper data
  const stepperInfo = [
    { title: "Step 1: Basic Info" },
    { title: "Step 2: Details" },
    { title: "Step 3: Confirmation" },
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
    if (currentStep < stepComponents.length - 1) {
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
          <h2>Basic Info</h2>
          <p>Enter your basic information here.</p>
        </div>
      ),
    },
    {
      stepNumber: 2,
      component: (
        <div>
          <h2>Details</h2>
          <p>Provide more detailed information.</p>
        </div>
      ),
    },
    {
      stepNumber: 3,
      component: (
        <div>
          <h2>Confirmation</h2>
          <p>Review and confirm your data.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="parentComponent">
      {/* Stepper Component */}
      <Stepper
        stepperInfo={stepperInfo}
        completedSteps={completedSteps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        direction="vertical" // Set to vertical
        stepsGap="50px" // Optional, defines gap between steps
        className="customStepper" // Optional, for custom styling
      />

      {/* Step Content */}
      <div style={{ flex: 1 }}>
        {
          stepComponents.find((step) => step.stepNumber - 1 === currentStep)
            ?.component
        }
        <div className="stepperControls">
          <button onClick={handlePrevious} disabled={currentStep === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === stepComponents.length - 1}
          >
            Next
          </button>
        </div>
        <div>
          <p>Current Step: {currentStep + 1}</p>
          <p>
            Completed Steps: {completedSteps.map((step) => step + 1).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpoParentComponent;
