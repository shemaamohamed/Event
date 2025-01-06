import React, { Fragment, useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input/index";
import Checkbox from "../../../CoreComponent/Checkbox/index";
import DateInput from "../../../CoreComponent/Date/index";
import toast from "react-hot-toast";
import ImageUpload from "../../../CoreComponent/ImageUpload";
import { useFlightStepper } from "../StepperContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const FlightInformation = ({
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
}) => {
  const navigate = useNavigate();
  const {
    currentStep,
    completedSteps,
    setCurrentStep,
    completeStep,
    passportImage,
    setPassportImage,
  } = useFlightStepper();

  const handleSubmit = () => {
    toast.success("The data was updated successfully!");
    completeStep(currentStep);
  };

  // Disable button logic: check if any required field is empty
  const isSubmitDisabled =
    !arrivalDate ||
    !departureDate ||
    !passportImage ||
    !departureAirport ||
    !returnAirport ||
    ticketCount <= 0;

  return (
    <div>
      <div className="flight-information-steeper-page">
        <DateInput
          label="Arrival Date"
          inputValue={arrivalDate}
          setInputValue={setArrivalDate}
          placeholder="Arrival Date"
          required={true}
        />

        <DateInput
          label="Departure Date"
          inputValue={departureDate}
          setInputValue={setDepartureDate}
          placeholder="Departure Date"
          required={true}
        />

        <ImageUpload
          errorMsg={""}
          required={true}
          label="Passport Image"
          allowedExtensions={["jpg", "jpeg", "png", "gif"]}
          inputValue={passportImage}
          setInputValue={setPassportImage}
        />
        <Input
          label="Departure Airport"
          type="text"
          inputValue={departureAirport}
          setInputValue={setDepartureAirport}
          placeholder="Departure Airport"
          required={true}
        />

        <Input
          label="Return Airport"
          type="text"
          inputValue={returnAirport}
          setInputValue={setReturnAirport}
          placeholder="Return Airport"
          required={true}
        />
        <div className="check-in-input-container">
          <Checkbox
            label="Do you have specific flight time?"
            checkboxValue={specificFlightTime}
            setCheckboxValue={setSpecificFlightTime}
            icon={""}
            errorMsg={""}
          />
        </div>

        {specificFlightTime && (
          <Fragment>
            <Input
              label="Flight Time"
              type="time"
              inputValue={flightTime}
              setInputValue={setFlightTime}
              placeholder="Flight Time"
              required={true}
            />
            <Input
              label="Flight Number"
              type="text"
              inputValue={flightNumber}
              setInputValue={setFlightNumber}
              placeholder="Flight Number"
              required={false}
            />
          </Fragment>
        )}

        <Input
          label="Other Requests"
          type="text"
          inputValue={otherRequests}
          setInputValue={setOtherRequests}
          placeholder="Other Requests"
          required={false}
        />

        <Input
          label="Seat Number"
          type="text"
          inputValue={seatNumber}
          setInputValue={setSeatNumber}
          placeholder="Seat Number"
          required={false}
        />

        <Input
          label="Number of Tickets to Book"
          type="number"
          inputValue={ticketCount}
          setInputValue={(value) => setTicketCount(Number(value))}
          placeholder="Number of Tickets to Book"
          required={true}
        />
        <div className="check-in-input-container">
          <Checkbox
            label="Do you want to upgrade from economy to business class?"
            checkboxValue={upgradeClass}
            setCheckboxValue={setUpgradeClass}
            icon={""}
            errorMsg={""}
          />
        </div>
      </div>

      <div className="actions-section">
        <button
          className={`next-button ${isSubmitDisabled ? "disabled" : ""}`}
          onClick={() => {
            handleSubmit();
          }}
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FlightInformation;
