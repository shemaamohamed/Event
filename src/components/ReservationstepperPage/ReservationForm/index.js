import React, { useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input";
import Checkbox from "../../../CoreComponent/Checkbox/index";
import DateInput from "../../../CoreComponent/Date";
import toast from "react-hot-toast";
import { useStepper } from "../StepperContext";
import "./style.scss";
import Select from "../../../CoreComponent/Select";
import { Button, Grid } from "@mui/material";

const ReservationForm = () => {
  const {
    currentStep,
    completedSteps,
    setCurrentStep,
    completeStep,
    //this is states
    roomType,
    setRoomType,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    lateCheckOut,
    setLateCheckOut,
    earlyCheckIn,
    setEarlyCheckIn,
    totalNights,
    setTotalNights,
  } = useStepper();

  const options = [
    { value: "Single", label: "Single" },
    { value: "Double", label: "Double" },
    { value: "Triple", label: "Triple" },
  ];
  const handleSubmit = (e) => {
    toast.success("The data was updated successfully!");
    const formData = {
      checkInDate,
      checkOutDate,
      lateCheckOut,
      earlyCheckIn,
      totalNights,
      roomType,
    };
    completeStep(currentStep);
  };

  return (
    <>
          <form >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Select
            options={options}
            value={roomType}
            setValue={setRoomType}
            label="Room Type"
            required={true}
          />
        </Grid>

        {/* Check In Date */}
        <Grid item xs={12} sm={6}>
          <DateInput
            label="Check In Date"
            type="datetime-local"
            inputValue={checkInDate}
            setInputValue={setCheckInDate}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DateInput
            label="Check Out Date"
            type="datetime-local"
            inputValue={checkOutDate}
            setInputValue={setCheckOutDate}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="check-in-input-container">
            <Checkbox
              label="Early Check In?"
              checkboxValue={earlyCheckIn}
              setCheckboxValue={setEarlyCheckIn}
              icon={""}
              errorMsg={""}
            />
          </div>
        </Grid>

        {/* Total Nights */}
        <Grid item xs={12} sm={6}>
          <Input
            label="Total Nights"
            type="number"
            inputValue={totalNights}
            setInputValue={setTotalNights}
            placeholder="Enter total nights"
          />
        </Grid>

        {/* Late Check Out */}
        <Grid item xs={12} sm={6}>
            <Checkbox
              label="Late Check Out?"
              checkboxValue={lateCheckOut}
              setCheckboxValue={setLateCheckOut}
              icon={""}
              errorMsg={""}
            />
        </Grid>
      </Grid>
    </form>
      <div className="actions-section">
        <Button
          className={`next-button ${
            !checkInDate || !checkOutDate || !totalNights || !roomType
              ? "disabled"
              : ""
          }`}
          variant="contained"
          sx={{
            backgroundColor: '#c62828',// Modern vibrant red

            marginTop: "20px",
            color: "#fff",
            width: "100%",

            "&:hover": {
              backgroundColor: "#e63946",
              color: "#fff",
            }
          }}
         
          onClick={() => {
            handleSubmit();
          }}
          disabled={!checkInDate || !checkOutDate || !totalNights || !roomType}
        >
          Next
        
        </Button>
      </div>
    </>
  );
};

export default ReservationForm;
