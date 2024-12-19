import React, { useEffect, useState } from "react";
import Stepper from "../../CoreComponent/stepper";
import "./style.scss";
import FlightInformation from "./FlightInformation";
import { FlightStepperProvider, useFlightStepper } from "./StepperContext";
import CompanionInformation from "./CompanionInformation";
import { removeFromLocalStorage } from "../../common/localStorage";
import { useNavigate } from "react-router-dom";

// const FlightStepperPageContent = () => {
//   const { currentStep, completedSteps, setCurrentStep, completeStep } =
//     useFlightStepper();
//   const navigate = useNavigate();

//   const stepperInfo = [
//     { title: "Flight Information" },
//     { title: "Companion Information" },
//   ];
//   const [arrivalDate, setArrivalDate] = useState("");
//   const [departureDate, setDepartureDate] = useState("");
//   const [departureAirport, setDepartureAirport] = useState("");
//   const [returnAirport, setReturnAirport] = useState("");
//   const [specificFlightTime, setSpecificFlightTime] = useState(false);
//   const [flightTime, setFlightTime] = useState("");
//   const [flightNumber, setFlightNumber] = useState("");
//   const [otherRequests, setOtherRequests] = useState("");
//   const [seatNumber, setSeatNumber] = useState("");
//   const [upgradeClass, setUpgradeClass] = useState(false);
//   const [ticketCount, setTicketCount] = useState(1);
//   const [companions, setCompanions] = useState([initialValue]);
//   const initialValue = {
//     name: "",
//     arrivalDate: "",
//     departureDate: "",
//     passportImage: null,
//     departureAirport: "",
//     returnAirport: "",
//     specificFlightTime: false,
//     flightTime: "",
//     flightNumber: "",
//     seatNumber: "",
//     otherRequests: "",
//     upgradeClass: false,
//   };
//   const componentsMap = [
//     <FlightInformation
//       arrivalDate={arrivalDate}
//       setArrivalDate={setArrivalDate}
//       departureDate={departureDate}
//       setDepartureDate={setDepartureDate}
//       departureAirport={departureAirport}
//       setDepartureAirport={setDepartureAirport}
//       returnAirport={returnAirport}
//       setReturnAirport={setReturnAirport}
//       specificFlightTime={specificFlightTime}
//       setSpecificFlightTime={setSpecificFlightTime}
//       flightTime={flightTime}
//       setFlightTime={setFlightTime}
//       flightNumber={flightNumber}
//       setFlightNumber={setFlightNumber}
//       otherRequests={otherRequests}
//       setOtherRequests={setOtherRequests}
//       seatNumber={seatNumber}
//       setSeatNumber={setSeatNumber}
//       upgradeClass={upgradeClass}
//       setUpgradeClass={setUpgradeClass}
//       ticketCount={ticketCount}
//       setTicketCount={setTicketCount}
//     />,

//     <CompanionInformation
//       companions={companions}
//       setCompanions={setCompanions}
//     />,
//   ];
//   const handleBackClick = () => {
//     navigate(-1); // Navigates to the previous page
//   };
//   useEffect(() => {
//     return () => {
//       removeFromLocalStorage("flightDetails");
//     };
//   }, []);
//   return (
//     <div className="stepper-page-container">
//       <div className="stepper-section">
//         <div className="back-section" onClick={handleBackClick}>
//           <span className="icon">🔙</span> {/* Example icon */}
//           <span className="label">Back</span>
//         </div>
//         <div className="stepper-container-section">
//           <Stepper
//             stepperInfo={stepperInfo}
//             completedSteps={completedSteps}
//             currentStep={currentStep}
//             setCurrentStep={setCurrentStep}
//             className="customStepper"
//             direction="vertical"
//             stepsGap="20px"
//           />
//         </div>
//       </div>
//       <div className="current-step">
//         <div className="header-current-step">Tilte </div>
//         <div className="current-component">{componentsMap[currentStep]}</div>
//       </div>
//     </div>
//   );
// };

// const FlightStepperPage = () => (
//   <FlightStepperProvider>
//     <FlightStepperPageContent />
//   </FlightStepperProvider>
// );

// export default FlightStepperPage;

const FlightStepperPageContent = () => {
  const {
    currentStep,
    completedSteps,
    setCurrentStep,
    completeStep,
    arrivalDate,
    setArrivalDate,
    departureDate,
    setDepartureDate,
    departureAirport,
    setDepartureAirport,
    returnAirport,
    setReturnAirport,
    specificFlightTime,
    setSpecificFlightTime,
    flightTime,
    setFlightTime,
    flightNumber,
    setFlightNumber,
    otherRequests,
    setOtherRequests,
    seatNumber,
    setSeatNumber,
    upgradeClass,
    setUpgradeClass,
    ticketCount,
    setTicketCount,
    companions,
    setCompanions,
  } = useFlightStepper();

  const navigate = useNavigate();

  const stepperInfo = [
    { title: "Flight Information" },
    { title: "Companion Information" },
  ];

  const componentsMap = [
    <FlightInformation
      arrivalDate={arrivalDate}
      setArrivalDate={setArrivalDate}
      departureDate={departureDate}
      setDepartureDate={setDepartureDate}
      departureAirport={departureAirport}
      setDepartureAirport={setDepartureAirport}
      returnAirport={returnAirport}
      setReturnAirport={setReturnAirport}
      specificFlightTime={specificFlightTime}
      setSpecificFlightTime={setSpecificFlightTime}
      flightTime={flightTime}
      setFlightTime={setFlightTime}
      flightNumber={flightNumber}
      setFlightNumber={setFlightNumber}
      otherRequests={otherRequests}
      setOtherRequests={setOtherRequests}
      seatNumber={seatNumber}
      setSeatNumber={setSeatNumber}
      upgradeClass={upgradeClass}
      setUpgradeClass={setUpgradeClass}
      ticketCount={ticketCount}
      setTicketCount={setTicketCount}
    />,

    <CompanionInformation
      companions={companions}
      setCompanions={setCompanions}
    />,
  ];

  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page
  };

  useEffect(() => {
    return () => {
      removeFromLocalStorage("flightDetails");
    };
  }, []);

  return (
    <div className="stepper-page-container">
      <div className="stepper-section">
        <div className="back-section" onClick={handleBackClick}>
          <span className="icon">🔙</span>
          <span className="label">Back</span>
        </div>
        <div className="stepper-container-section">
          <Stepper
            stepperInfo={stepperInfo}
            completedSteps={completedSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className="customStepper"
            direction="vertical"
            stepsGap="20px"
          />
        </div>
      </div>
      <div className="current-step">
        <div className="header-current-step">Title</div>
        <div className="current-component">{componentsMap[currentStep]}</div>
      </div>
    </div>
  );
};
const FlightStepperPage = () => (
  <FlightStepperProvider>
    <FlightStepperPageContent />
  </FlightStepperProvider>
);

export default FlightStepperPage;