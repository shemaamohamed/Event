import React, { useState } from "react";
import './style.scss';

const WelcomeMessage = ({handlePrevious , handleNext}) => {
  const [currentStep, setCurrentStep] = useState(1);


  return (
    <div className="welcome-container3">
      <div className="welcome-card">
        <h3 className="welcome-title">Welcome to the Sponsorship Journey! 🎉</h3>
        <p className="welcome-text">
          We are thrilled to have you on board as a sponsor for this prestigious conference!
          Let's get started together. Please choose from the available options in each step,
          and we’ll guide you throughout the process. Once you're done with each step, simply click 'Next' to move forward.
        </p>
        <div className="instructions">
          <h3 className="instructions-title">Here’s What to Expect:</h3>
          <ul className="instructions-list">
            <li>Choose your preferred sponsorship options.</li>
            <li>Add invoice details and agreement information.</li>
            <li>Upload necessary documents and sign the agreement.</li>
            <li>Upload your logo and advertisements to complete the process.</li>
          </ul>
        </div>
        <p className="conclusion-text">
          The steps are simple and clear, so let's get started and make this experience exceptional!
        </p>
      </div>

      {/* Fixed Navigation Buttons */}
      <div className="fixed-buttons">
        {/* <button className="prev-button" onClick={handlePrevious}>Prev</button> */}
        <button
        style={{
          backgroundColor:'#9B1321'
        }}
         className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
