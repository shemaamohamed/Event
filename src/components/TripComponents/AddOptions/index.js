import React, { useState } from "react";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper";
import MySideDrawer from "../../../CoreComponent/SideDrawer";
import Input from "../../../CoreComponent/Input";
import Checkbox from "../../../CoreComponent/Checkbox"; // Import the Checkbox component
import axios from "axios";
import toast from "react-hot-toast";
import "./style.scss";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { CloseRounded } from "@mui/icons-material"
import DeleteIcon from "@mui/icons-material/Delete";


const AddOption = ({ isOpen, setIsOpen, tripId, fetchTrips }) => {
  // State for all options
  const [options, setOptions] = useState([
    { optionName: "", optionDescription: "", price: 0, multiplyByNights: false },
  ]);
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const addNewOption = () => {
    setOptions([
      ...options,
      { optionName: "", optionDescription: "", price: 0, multiplyByNights: false },
    ]);
  };

  const deleteOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const promises = options.map(async (option) => {
      const optionData = {
        trip_id: tripId,
        option_name: option.optionName,
        option_description: option.optionDescription,
        price: option.price,
        multiply_by_nights: option.multiplyByNights, // Add this field to the API payload
      };

      try {
        const response = await axios.post(
          `${BaseUrl}/additional-options`,
          optionData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsOpen(false);
        toast.success("The data was updated successfully!");
        fetchTrips();
      } catch (error) {
        console.error(
          "Error adding option:",
          error.response ? error.response.data : error
        );
      }
    });

    await Promise.all(promises);
  };

  return (
    <div>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}
        anchor="right"
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 1, // Ensure it's above modals and other high-priority elements
    
          '& .MuiDrawer-paper': {
              zIndex: (theme) => theme.zIndex.modal + 1,
    
    
        width: 
        {
          xs: '100%',
          sm: '50%',
          md: '40%',
          lg: '30%',
          xl: '30%',
        }, 
      },
    
        }}
        >
            <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 2,
        }}
        >
        <IconButton onClick={() => setIsOpen(false)}>
           <CloseRounded /> 
          </IconButton>

        </div>
        <CustomFormWrapper
          title="Add Additional Option"
          handleSubmit={handleSubmit}
          setOpenForm={setIsOpen}
        >
          <Box className="option-form-container" sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box className="add-delete-container" sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button variant="outlined" onClick={addNewOption} sx={{ color: "green", borderColor: "green" }}>
          <Typography variant="button" sx={{ color: "green", marginRight: 1 }}>+</Typography>
          Add New Option
        </Button>
      </Box>
      {options.map((option, index) => (
        <Box key={index} className="option-input-group" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Input
                  label="Option Name"
                  inputValue={option.optionName}
                  setInputValue={(value) =>
                    handleOptionChange(index, "optionName", value)
                  }
                  placeholder="Enter option name"
                />
           <Input
                  label="Option Description"
                  inputValue={option.optionDescription}
                  setInputValue={(value) =>
                    handleOptionChange(index, "optionDescription", value)
                  }
                  placeholder="Enter option description"
                />
                        <Input
                  label="Price"
                  inputValue={option.price}
                  setInputValue={(value) =>
                    handleOptionChange(index, "price", parseFloat(value) || 0)
                  }
                  placeholder="Enter price"
                  type="number"
                />
              <Checkbox
                  label="Multiply by Nights?"
                  checkboxValue={option.multiplyByNights}
                  setCheckboxValue={(value) =>
                    handleOptionChange(index, "multiplyByNights", value)
                  }
                  className="form-checkbox"
                />
          <IconButton
            color="error"
            onClick={() => deleteOption(index)}
            aria-label="delete option"
            sx={{ alignSelf: "flex-start" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
        </CustomFormWrapper>
      </Drawer>
    </div>
  );
};

export default AddOption;
