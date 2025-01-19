import React, { useState } from "react";
import Input from "../../../CoreComponent/Input";
import Checkbox from "../../../CoreComponent/Checkbox";
import DateInput from "../../../CoreComponent/Date";
import SVG from "react-inlinesvg";
import MySideDrawer from "../../../CoreComponent/SideDrawer";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper";
import { deleteIcon } from "../../../icons";
import httpService from "../../../common/httpService";
import toast from "react-hot-toast";
import { Button, Drawer, IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import ImageUpload from "../../../CoreComponent/ImageUpload";

const AddTripForm = ({ isOpen, setIsOpen, flight_id, main_user_id }) => {
  const [trips, setTrips] = useState([
    {
      price: "",
      is_free: 0,
      flight_id: flight_id,
      flightFile: null, // New state for flight file
    },
  ]);
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const handleAddTrip = () => {
    setTrips([
      ...trips,
      {
        price: "",
        is_free: 0,
        flight_id: flight_id,
        flightFile: null, // Initialize flightFile
      },
    ]);
  };

  const handleDeleteTrip = (index) => {
    const updatedTrips = trips.filter((_, idx) => idx !== index);
    setTrips(updatedTrips);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
  
    // Create a FormData instance
    const formData = new FormData();
  
    // Iterate over each trip and append the relevant data to FormData
    trips.forEach((trip, index) => {
      // Append flight_id and data fields for each trip
      formData.append(`flights[${index}][flight_id]`, flight_id);
  
      formData.append(`flights[${index}][data][0][price]`, trip.price);
      formData.append(`flights[${index}][data][0][is_free]`, trip.is_free);
  
      // Append the flightFile if it exists
      if (trip.flightFile) {
        formData.append(`flights[${index}][data][0][flightFile]`, trip.flightFile);
      }
    });
  
    try {
      // Make the request using FormData
      const response = await httpService({
        method: "POST",
        url: `${BaseUrl}/available-flights/all`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
        showLoader: false,
        withToast: true,
        onSuccess: () => {
          toast.success("Trip Added successfully!");
        },
      });
  
      setTrips([]); // Clear trips state after successful save
      setIsOpen(false); // Close the drawer
      console.log({ response });
    } catch (error) {
      console.error("Error saving trips:", error);
    }
  };
  
  

  return (
    <Drawer
      anchor="right"
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        "& .MuiDrawer-paper": {
          zIndex: (theme) => theme.zIndex.modal + 1,
          width: {
            xs: "100%",
            sm: "50%",
            md: "30%",
            lg: "20%",
            xl: "20%",
          },
        },
      }}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 2,
        }}
      >
        <IconButton onClick={() => setIsOpen(false)}>
          <CloseRounded />
        </IconButton>
      </div>
      <CustomFormWrapper
        handleSubmit={() => {
          handleSave();
        }}
        setOpenForm={setIsOpen}
        noActions={false}
      >
        <div className="add-trip-btn-container">
          <Button
            className="add-trip-btn"
            type="button"
            onClick={handleAddTrip}
          >
            + Add Trip
          </Button>
        </div>
        <div>
          {trips.map((trip, index) => (
            <div key={index}>
              <div className="trip-card-header">
                <SVG
                  className="delete-icon"
                  src={deleteIcon}
                  onClick={() => handleDeleteTrip(index)}
                />
              </div>
              <div>
                <Input
                  label="Price"
                  placeholder="Enter price"
                  inputValue={trip.price}
                  setInputValue={(value) => {
                    const updatedTrips = [...trips];
                    updatedTrips[index].price = value;
                    setTrips(updatedTrips);
                  }}
                  type="number"
                  required={true}
                />
              </div>
              <ImageUpload
                label="Upload Flight File"
                required={false}
                allowedExtensions={["jpg", "jpeg", "png", "pdf"]} 
                inputValue={trip.flightFile}
                setInputValue={(file) => {
                  const updatedTrips = [...trips];
                  updatedTrips[index].flightFile = file;
                  setTrips(updatedTrips);
                }}
                existingFile={null} 
              />
            </div>
          ))}
        </div>
      </CustomFormWrapper>
    </Drawer>
  );
};

export default AddTripForm;
