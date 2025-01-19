import React, { Fragment, useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input";
import DateInput from "../../../CoreComponent/Date";
import Checkbox from "../../../CoreComponent/Checkbox";
import toast from "react-hot-toast";
import "./style.scss";
import { useTripsStepper } from "../StepperContext";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../../common/localStorage";
import { Button, Grid } from "@mui/material";

const SpeackerTripForm = () => {
  const { currentStep, completeStep, noViewAccommodation } = useTripsStepper();
  const [accommodationStars, setAccommodationStars] = useState();
  const [nightsCount, setNightsCount] = useState();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleSubmit = (e) => {
    toast.success("The data was updated successfully!");

    const formData = {
      // include_accommodation: includeAccommodation,
      accommodation_stars: noViewAccommodation ? 1 : accommodationStars,
      nights_count: noViewAccommodation ? 0 : nightsCount,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      is_companion: false,
    };
    completeStep(currentStep);
    saveToLocalStorage("AccommodationData", formData);
  };
  useEffect(() => {
    const data = getFromLocalStorage("AccommodationData");
    if (data) {
      // setIncludeAccommodation(data?.include_accommodation);
      setAccommodationStars(data?.accommodation_stars);
      setNightsCount(data?.nights_count);
      setCheckInDate(data?.check_in_date);
      setCheckOutDate(data?.check_out_date);
    }
  }, []);
  return (
    <div>
      <form>
        <Grid container spacing={2}>
          {!noViewAccommodation && (
            <Fragment>
              <Grid item xs={12} sm={6}>
                <Input
                  label="Accommodation Stars"
                  placeholder="Enter star rating (1-5)"
                  inputValue={accommodationStars}
                  setInputValue={setAccommodationStars}
                  type="number"
                  required={true}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Input
                  label="Trip duration in days"
                  placeholder="Enter number of nights"
                  inputValue={nightsCount}
                  setInputValue={setNightsCount}
                  type="number"
                  required={true}
                />
              </Grid>
            </Fragment>
          )}

          <Grid item xs={12} sm={6}>
            <DateInput
              label="Check-In Date"
              inputValue={checkInDate}
              setInputValue={setCheckInDate}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DateInput
              label="Check-Out Date"
              inputValue={checkOutDate}
              setInputValue={setCheckOutDate}
              required={true}
            />
          </Grid>
        </Grid>
      </form>

      <div className="actions-section">
        <Button
          variant="contained"
          className="next-button"
          onClick={handleSubmit}
          fullWidth
          sx={{
            marginTop: "20px",
            backgroundColor: "#cc0000",
            width: "100%",
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default SpeackerTripForm;
