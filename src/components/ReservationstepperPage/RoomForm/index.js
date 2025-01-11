import React, { useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input";
import Select from "../../../CoreComponent/Select";
import Checkbox from "../../../CoreComponent/Checkbox";
import DateInput from "../../../CoreComponent/Date";
import deleteIcon from "../../../icons/deleteIcon.svg";
import { useStepper } from "../StepperContext";
import SVG from "react-inlinesvg";
import toast from "react-hot-toast";
import "./style.scss";
import { Button, Grid } from "@mui/material";

const RoomForm = () => {
  const { currentStep, completeStep, rooms, setRooms } = useStepper();

  const initialValue = {
    roomType: "",
    occupantName: "",
    specialRequests: "",
    checkInDate: "",
    checkOutDate: "",
    lateCheckOut: false,
    earlyCheckIn: false,
    totalNights: "",
  };

  // const [rooms, setRooms] = useState([initialValue]);

  const options = [
    { value: "Single", label: "Single" },
    { value: "Double", label: "Double" },
    { value: "Triple", label: "Triple" },
  ];

  const addRoom = () => {
    setRooms([...rooms, { ...initialValue }]);
  };

  const deleteRoom = (index) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedRooms = rooms.map((room, i) =>
      i === index ? { ...room, [field]: value } : room
    );
    setRooms(updatedRooms);
  };

  const handleSubmit = (e) => {
    toast.success("The data was updated successfully!");
    completeStep(currentStep);
    // saveToLocalStorage("otherRooms", rooms);
  };

  // useEffect(() => {
  //   const data = getFromLocalStorage("otherRooms");
  //   if (data) {
  //     setRooms(data);
  //   }
  // }, []);

  return (
    <div>
      <div className="add-room-btn-container77">
        <button type="button" onClick={addRoom}>
          Add Room
        </button>
      </div>

      <form
       >
      {rooms.map((room, index) => (
        <div    key={index}>
          <div className="delete-icon-container">
            <SVG
              className="delete-icon"
              src={deleteIcon}
              onClick={() => deleteRoom(index)}
            />
          </div>

          <Grid container spacing={2}
          sx={{
            marginTop: "20px",
          }}
           >
            {/* Room Type */}
            <Grid item xs={12} md={6}>
              <Select
                options={options}
                value={room.roomType}
                setValue={(value) => handleChange(index, "roomType", value)}
                label="Room Type"
                required={true}
              />
            </Grid>

            {/* Occupant Name */}
            <Grid item xs={12} md={6}>
              <Input
                label="Occupant Name"
                type="text"
                inputValue={room.occupantName}
                setInputValue={(value) =>
                  handleChange(index, "occupantName", value)
                }
                placeholder="Enter occupant name"
              />
            </Grid>

            {/* Special Requests */}
            <Grid item xs={12} md={6}>
              <Input
                label="Special Requests"
                type="text"
                inputValue={room.specialRequests}
                setInputValue={(value) =>
                  handleChange(index, "specialRequests", value)
                }
                placeholder="Enter any special requests"
              />
            </Grid>

            {/* Late Check Out */}
            <Grid item xs={12} md={6}>
              <div className="check-in-input-container">
                <Checkbox
                  label="Late Check Out?"
                  checkboxValue={room.lateCheckOut}
                  setCheckboxValue={(value) =>
                    handleChange(index, "lateCheckOut", value)
                  }
                />
              </div>
            </Grid>

            {/* Check In Date */}
            <Grid item xs={12} md={6}>
              <DateInput
                label="Check In Date"
                type="datetime-local"
                inputValue={room.checkInDate}
                setInputValue={(value) =>
                  handleChange(index, "checkInDate", value)
                }
              />
            </Grid>

            {/* Early Check In */}
            <Grid item xs={12} md={6}>
              <div className="check-in-input-container">
                <Checkbox
                  label="Early Check In?"
                  checkboxValue={room.earlyCheckIn}
                  setCheckboxValue={(value) =>
                    handleChange(index, "earlyCheckIn", value)
                  }
                />
              </div>
            </Grid>

            {/* Check Out Date */}
            <Grid item xs={12} md={6}>
              <DateInput
                label="Check Out Date"
                type="datetime-local"
                inputValue={room.checkOutDate}
                setInputValue={(value) =>
                  handleChange(index, "checkOutDate", value)
                }
              />
            </Grid>

            {/* Total Nights */}
            <Grid item xs={12} md={6}>
              <Input
                label="Total Nights"
                type="text"
                inputValue={room.totalNights}
                setInputValue={(value) =>
                  handleChange(index, "totalNights", value)
                }
                placeholder="Enter Total Nights"
              />
            </Grid>
          </Grid>
        </div>
        
      ))}
    </form>
      <div className="actions-section">
        <Button
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
         className="next-button" onClick={() => handleSubmit()}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default RoomForm;
