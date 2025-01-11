import React, { useEffect, useState } from "react";
import Checkbox from "../../../CoreComponent/Checkbox";
import toast from "react-hot-toast";
import "./style.scss";
import { useTripsStepper } from "../StepperContext";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../../common/localStorage";
import httpService from "../../../common/httpService";
import { Button, Grid, Typography } from "@mui/material";

const AdditionalOptionsForm = () => {
  const { currentStep, completeStep, tripId } = useTripsStepper();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = getFromLocalStorage("additionalOptions") || [];
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [discountedOptions, setDiscountedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) => {
      const optionExists = prev?.find(
        (item) => item.option_name === option.option_name
      );
      if (optionExists) {
        // Remove if already selected
        return prev.filter((item) => item.option_name !== option.option_name);
      } else {
        // Add new option
        return [
          ...prev,
          {
            id: option.id,
            option_name: option.option_name,
            price: option.price,
            value: true,
          },
        ];
      }
    });
  };
  const getDiscountOptions = async () => {
    try {
      const getAuthToken = () => localStorage.getItem("token");

      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/discount-options/${tripId}`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });

      const discountOptions = response.data;
      const localOptions = getFromLocalStorage("additionalOptions") || [];

      // Merge base options with discount options
      const mergedOptions = localOptions.map((option) => {
        const discount = discountOptions.find((d) => d.option_id === option.id);
        return {
          ...option,
          price: discount?.price || option.price,
          isDiscounted: discount?.price === "0.00",
        };
      });

      setDiscountedOptions(
        mergedOptions.filter((option) => option.isDiscounted)
      );
    } catch (error) {
      setDiscountedOptions([]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("The data was updated successfully!");
    completeStep(currentStep);
    saveToLocalStorage("AdditionalOptionsData", selectedOptions);
  };

  useEffect(() => {
    const data = getFromLocalStorage("AdditionalOptionsData");
    if (Array.isArray(data)) {
      setSelectedOptions(data);
    } else {
      setSelectedOptions([]); // Ensure selectedOptions is always an array
    }
  }, []);
  useEffect(() => {
    getDiscountOptions();
  }, []);

  return (
<div>
  {discountedOptions.length > 0 && (
    <div className="discount-note">
      <Typography variant="h6" className="discount-title" fontWeight="bold">
        Note: This discount is exclusively available for speakers.
      </Typography>
      <Grid container spacing={2} className="discount-list">
        {discountedOptions.map((option) => (
          <Grid item xs={12} key={option.id} className="discount-item">
            <Typography variant="body1">
              {option.option_name} -{" "}
              <span className="discount-price">Price: $0</span>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  )}

  <form
    className="additional-options-stepper-container"
    onSubmit={handleSubmit}
  >
    <Grid container spacing={2}>
      {options?.map((option) => (
        <Grid item xs={12} sm={6} key={option.id}>
          <Checkbox
            label={`${option.option_name} ($${option.price})`}
            checkboxValue={
              !!selectedOptions?.find(
                (item) => item.option_name === option.option_name
              )
            }
            setCheckboxValue={() => handleCheckboxChange(option)}
            required={false}
            icon={null}
          />
        </Grid>
      ))}
    </Grid>
    {!options?.length && (
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">
          No Options Available
        </Typography>
      </Grid>
    )}
  </form>

  <div className="actions-section">
    <Button
      variant="contained"
      className="next-button"
      onClick={handleSubmit}
      fullWidth
      sx={{
        marginTop: "20px",
        backgroundColor:'#cc0000',
        width: '100%',
      }}
    >
      Next
    </Button>
  </div>
</div>
  );
};

export default AdditionalOptionsForm;
