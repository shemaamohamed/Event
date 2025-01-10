import React, { Fragment, useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input/index";
import Checkbox from "../../../CoreComponent/Checkbox/index";
import DateInput from "../../../CoreComponent/Date/index";
import toast from "react-hot-toast";
import ImageUpload from "../../../CoreComponent/ImageUpload";
import { useFlightStepper } from "../StepperContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";

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
    <Grid container spacing={3}>
      {/* Arrival Date */}
      <Grid item xs={12} sm={6}>
        <DateInput
          label="Arrival Date"
          inputValue={arrivalDate}
          setInputValue={setArrivalDate}
          placeholder="Arrival Date"
          required={true}
        />
      </Grid>

      {/* Departure Date */}
      <Grid item xs={12} sm={6}>
        <DateInput
          label="Departure Date"
          inputValue={departureDate}
          setInputValue={setDepartureDate}
          placeholder="Departure Date"
          required={true}
        />
      </Grid>

      {/* Passport Image */}
      <Grid item xs={12} sm={6}>
        <ImageUpload
          errorMsg={""}
          required={true}
          label="Passport Image"
          allowedExtensions={["jpg", "jpeg", "png", "gif"]}
          inputValue={passportImage}
          setInputValue={setPassportImage}
        />
      </Grid>

      {/* Departure Airport */}
      <Grid item xs={12} sm={6}>
        <Input
          label="Departure Airport"
          type="text"
          inputValue={departureAirport}
          setInputValue={setDepartureAirport}
          placeholder="Departure Airport"
          required={true}
        />
      </Grid>

      {/* Return Airport */}
      <Grid item xs={12} sm={6}>
        <Input
          label="Return Airport"
          type="text"
          inputValue={returnAirport}
          setInputValue={setReturnAirport}
          placeholder="Return Airport"
          required={true}
        />
      </Grid>

      {/* Specific Flight Time Checkbox */}
      <Grid item xs={12} sm={6}>
        <Checkbox
          label="Do you have specific flight time?"
          checkboxValue={specificFlightTime}
          setCheckboxValue={setSpecificFlightTime}
          icon={""}
          errorMsg={""}
        />
      </Grid>

      {/* Flight Time and Flight Number (Conditional) */}
      {specificFlightTime && (
        <Fragment>
          <Grid item xs={12} sm={6}>
            <Input
              label="Flight Time"
              type="time"
              inputValue={flightTime}
              setInputValue={setFlightTime}
              placeholder="Flight Time"
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Flight Number"
              type="text"
              inputValue={flightNumber}
              setInputValue={setFlightNumber}
              placeholder="Flight Number"
              required={false}
            />
          </Grid>
        </Fragment>
      )}

      {/* Other Requests */}
      <Grid item xs={12} sm={6}>
        <Input
          label="Other Requests"
          type="text"
          inputValue={otherRequests}
          setInputValue={setOtherRequests}
          placeholder="Other Requests"
          required={false}
        />
      </Grid>

      {/* Seat Number */}
      <Grid item xs={12} sm={6}>
        <Input
          label="Seat Number"
          type="text"
          inputValue={seatNumber}
          setInputValue={setSeatNumber}
          placeholder="Seat Number"
          required={false}
        />
      </Grid>

      {/* Number of Tickets */}
      <Grid item xs={12} sm={6}>
        <Input
          label="Number of Tickets to Book"
          type="number"
          inputValue={ticketCount}
          setInputValue={(value) => setTicketCount(Number(value))}
          placeholder="Number of Tickets to Book"
          required={true}
        />
      </Grid>

      {/* Upgrade Class Checkbox */}
      <Grid item xs={12} sm={6}>
        <Checkbox
          label="Do you want to upgrade from economy to business class?"
          checkboxValue={upgradeClass}
          setCheckboxValue={setUpgradeClass}
          icon={""}
          errorMsg={""}
        />
      </Grid>

      {/* Submit Button */}
      <Grid item xs={12}>
        <div className="actions-section">
          <Button
            variant="contained"
            color="error"

            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            fullWidth
          >
            Submit
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default FlightInformation;
