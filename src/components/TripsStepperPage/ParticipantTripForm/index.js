import React, { useEffect, useState, Fragment } from "react";
import Input from "../../../CoreComponent/Input";
import Select from "../../../CoreComponent/Select";
import PhoneNumberInput from "../../../CoreComponent/PhoneNumber";
import toast from "react-hot-toast";
import { nationalitiesOptions } from "../../../constant/index";
import SVG from "react-inlinesvg";
import deleteIcon from "../../../icons/deleteIcon.svg";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../../common/localStorage";
import { useTripsStepper } from "../StepperContext";
import "./style.scss";
import DateInput from "../../../CoreComponent/Date";
import { Button, Divider, Grid } from "@mui/material";

const ParticipantTripForm = () => {
  const intialValue = {
    id: Date.now(),
    name: "",
    nationality: "",
    phone_number: "",
    whatsapp_number: "",
    is_companion: true,
    include_accommodation: false,
    accommodation_stars: "",
    nights_count: "",
  };
  const { currentStep, completeStep, noViewAccommodation } = useTripsStepper();
  const [participants, setParticipants] = useState([intialValue]);
  const addParticipant = () => {
    setParticipants([
      ...participants,
      {
        id: Date.now(),
        name: "",
        nationality: "",
        phone_number: "",
        whatsapp_number: "",
        is_companion: true,
        include_accommodation: noViewAccommodation ? false : false,
        accommodation_stars: noViewAccommodation ? 1 : "",
        nights_count: noViewAccommodation ? 0 : "",
      },
    ]);
  };

  const deleteParticipant = (id) => {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    );
  };

  const handleInputChange = (id, key, value) => {
    const updatedParticipants = participants?.map((participant) =>
      participant.id === id ? { ...participant, [key]: value } : participant
    );
    setParticipants(updatedParticipants);
  };

  const handleSubmit = () => {
    toast.success("The data was updated successfully!");
    completeStep(currentStep);
    saveToLocalStorage("participants", participants);
  };

  useEffect(() => {
    const data = getFromLocalStorage("participants");
    if (data) {
      setParticipants(data);
    }
  }, []);
  return (
    <div>
      <div className="add-button-container" style={{ marginBottom: "20px" }}>
        <button
          variant="contained"
          color="primary"
          className="add-button-participant"
          onClick={addParticipant}
        >
          Add Participant
        </button>
      </div>

      <Grid container spacing={1} alignItems="center">
        {participants?.map((participant) => (
          <div key={participant.id} style={{ marginTop: "20px" }}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div className="delete-button-participant">
                <SVG
                  className="delete-icon"
                  src={deleteIcon}
                  onClick={() => deleteParticipant(participant.id)}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Input
                    label="Name"
                    placeholder="Enter name"
                    inputValue={participant.name}
                    setInputValue={(value) =>
                      handleInputChange(participant.id, "name", value)
                    }
                    className="name-input"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Select
                    options={nationalitiesOptions}
                    value={participant.nationality}
                    setValue={(value) =>
                      handleInputChange(participant.id, "nationality", value)
                    }
                    label="Nationality"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <PhoneNumberInput
                    label="Phone Number"
                    placeholder="Enter phone number"
                    phone={participant.phone_number}
                    setPhone={(value) =>
                      handleInputChange(participant.id, "phone_number", value)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <PhoneNumberInput
                    label="WhatsApp Number"
                    placeholder="Enter WhatsApp number"
                    phone={participant.whatsapp_number}
                    setPhone={(value) =>
                      handleInputChange(
                        participant.id,
                        "whatsapp_number",
                        value
                      )
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DateInput
                    label="Start Date"
                    inputValue={participant.check_in_date}
                    setInputValue={(value) =>
                      handleInputChange(participant.id, "check_in_date", value)
                    }
                    required={true}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DateInput
                    label="End Date"
                    inputValue={participant.check_out_date}
                    setInputValue={(value) =>
                      handleInputChange(participant.id, "check_out_date", value)
                    }
                    required={true}
                  />
                </Grid>
                {!noViewAccommodation && (
                  <Fragment>
                    <Grid item xs={12} sm={6}>
                      <Input
                        label="Accommodation Stars"
                        placeholder="Enter accommodation stars"
                        inputValue={participant.accommodation_stars}
                        setInputValue={(value) =>
                          handleInputChange(
                            participant.id,
                            "accommodation_stars",
                            value
                          )
                        }
                        className="stars-input"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Input
                        label="Trip duration in days"
                        placeholder="Enter nights count"
                        inputValue={participant.nights_count}
                        setInputValue={(value) =>
                          handleInputChange(
                            participant.id,
                            "nights_count",
                            value
                          )
                        }
                        className="nights-input"
                      />
                    </Grid>
                  </Fragment>
                )}
              </Grid>
            </Grid>
            <Divider
              sx={{
                color: "black",
                marginTop: "10px",
                backgroundColor: "black",
              }}
            />
          </div>
        ))}
      </Grid>

      <div className="actions-section">
        <Button
          variant="contained"
          className="next-button"
          onClick={handleSubmit}
          fullWidth
          sx={{
            marginTop: "20px",
            width: "100%",
            backgroundColor: "#cc0000",
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default ParticipantTripForm;
