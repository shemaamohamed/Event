import React, { useState, createContext, useContext, useEffect } from "react";
import httpService from "../../common/httpService";

const FlightStepperContext = createContext();

export const FlightStepperProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [passportImage, setPassportImage] = useState(null);
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  // Flight-related states
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [returnAirport, setReturnAirport] = useState("");
  const [specificFlightTime, setSpecificFlightTime] = useState(false);
  const [flightTime, setFlightTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [otherRequests, setOtherRequests] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [upgradeClass, setUpgradeClass] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [flight_id, setFlight_id] = useState(null);

  // Companion-related states
  const initialValue = {
    name: "",
    arrivalDate: "",
    departureDate: "",
    passportImage: null,
    departureAirport: "",
    returnAirport: "",
    specificFlightTime: false,
    flightTime: "",
    flightNumber: "",
    seatNumber: "",
    otherRequests: "",
    upgradeClass: false,
  };
  const [companions, setCompanions] = useState([initialValue]);

  const completeStep = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps((prev) => [...prev, stepIndex]);
    }
    setCurrentStep(stepIndex + 1);
  };

  const getFlightData = async () => {
    const getAuthToken = () => localStorage.getItem("token");

    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/flight`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      console.log({ hed: response });

      const { flight, companions } = response[0]; // Assuming the response structure.
      console.log({ flight, companions });

      // Set flight-related states
      setFlight_id(flight?.flight_id);
      setPassportImage(flight.passport_image);
      setArrivalDate(flight.arrival_date);
      setDepartureDate(flight.departure_date);
      setDepartureAirport(flight.departure_airport);
      setReturnAirport(flight.arrival_airport);
      setSpecificFlightTime(!!flight.specific_flight_time);
      setFlightTime(flight.specific_flight_time);
      setFlightNumber(flight.flight_number);
      setOtherRequests(flight.additional_requests);
      setSeatNumber(flight.seat_preference);
      setUpgradeClass(!!flight.upgrade_class);
      setTicketCount(flight.ticket_count);

      // Map companions data to the companions state
      const formattedCompanions = companions.map((companion) => ({
        flight_id: companion.flight_id,
        main_user_id: flight?.flight_id || null,
        name: companion.passenger_name,
        arrivalDate: companion.arrival_date,
        departureDate: companion.departure_date,
        passportImage: companion.passport_image,
        departureAirport: companion.departure_airport,
        returnAirport: companion.arrival_airport,
        specificFlightTime: !!companion.specific_flight_time,
        flightTime: companion.specific_flight_time,
        flightNumber: companion.flight_number,
        seatNumber: companion.seat_preference,
        otherRequests: companion.additional_requests,
        upgradeClass: !!companion.upgrade_class,
      }));

      setCompanions(formattedCompanions);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  useEffect(() => {
    getFlightData();
  }, []);
  return (
    <FlightStepperContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        completedSteps,
        completeStep,
        passportImage,
        setPassportImage,
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
        flight_id,
        setFlight_id,
      }}
    >
      {children}
    </FlightStepperContext.Provider>
  );
};

export const useFlightStepper = () => useContext(FlightStepperContext);
