import React, { useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input/index";
import { Grid, Button, Divider } from "@mui/material";
import toast from "react-hot-toast";
import deleteIcon from "../../../icons/deleteIcon.svg";
import SVG from "react-inlinesvg";
import { useFlightStepperAdmin } from "../StepperContext";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../../common/localStorage";
import SimpleLabelValue from "../../SimpleLabelValue";
import "./style.scss";
import httpService from "../../../common/httpService";
import TicketPricingForm from "../TicketPricingForm";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../../CoreComponent/ImageUpload";

const FlightDetails = ({ data }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue
            label="Departure Airport"
            value={data?.departure_airport}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue
            label="Arrival Airport"
            value={data?.arrival_airport}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue
            label="Departure Date"
            value={data?.departure_date}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue label="Arrival Date" value={data?.arrival_date} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue label="Flight Number" value={data?.flight_number} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue
            label="Seat Preference"
            value={data?.seat_preference}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue
            label="Upgrade Class"
            value={data?.upgrade_class ? "Yes" : "No"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue label="Ticket Count" value={data?.ticket_count} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue
            label="Additional Requests"
            value={data?.additional_requests}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue
            label="Passenger Name"
            value={data?.passenger_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue
            label="Specific Flight Time"
            value={data?.specific_flight_time}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const FlightInformation = ({ member, index }) => {
  const {
    currentStep,
    completeStep,
    passportImage,
    flightMembers,
    alltrips,
    setAllTrips,
  } = useFlightStepperAdmin();
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  // State to manage an array of trips
  const [trips, setTrips] = useState([
    {
      price: "",
      is_free: false,
      flightFile: "",
    },
  ]);
  const [ticketPricing, setTicketPricing] = useState({
    business_class_upgrade_cost: "",
    reserved_seat_cost: "",
    other_additional_costs: "",
  });

  const getTicketPricing = () => {
    const tickets = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("ticketPricing_")) {
        const value = localStorage.getItem(key);
        const title = key.replace("ticketPricing_", "");
        const data = JSON.parse(value);
        try {
          tickets.push({ flight_id: title, ...data });
        } catch {
          tickets.push({ flight_id: title, ...data });
        }
      }
    }

    return tickets;
  };
  const getAuthToken = () => localStorage.getItem("token");

  const handleSave = async (data) => {
    const formData = new FormData();
    console.log({ data });

    data.forEach((flight, index) => {
      formData.append(`flights[${index}][flight_id]`, flight.flight_id);

      flight.data.forEach((flightDetail, detailIndex) => {
        formData.append(
          `flights[${index}][data][${detailIndex}][price]`,
          flightDetail.price
        );
        formData.append(`flights[${index}][data][${detailIndex}][is_free]`, 0);

        formData.append(
          `flights[${index}][data][${detailIndex}][flightFile]`,
          flightDetail.flightFile
        );
      });
    });

    const response = await httpService({
      method: "POST",
      url: `${BaseUrl}/available-flights/all`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      showLoader: false,
      withToast: false,
    });

    navigate("/flights");
  };

  const handleSavePrice = async (data) => {
    const response = await httpService({
      method: "POST",
      url: `${BaseUrl}/admin/update-flight`,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
      data: {
        flights: data,
      },
      showLoader: true,
      withToast: false,
    });
    toast.success("The data was updated successfully!");

    console.log({ response });
  };
  const handleSubmit = () => {
    const isFinalStep = flightMembers.length === index + 1;

    saveToLocalStorage(`ticketPricing_${member?.flight_id}`, ticketPricing);
    setAllTrips((prev) => {
      const updatedData = [
        ...prev,
        {
          flight_id: member?.flight_id,
          data: trips.map((item) => {
            return {
              price: item?.price,
              is_free: item?.is_free,
              flightFile: item.flightFile,
            };
          }),
        },
      ];
      if (!isFinalStep) {
        completeStep(currentStep);
        toast.success("The data was updated successfully!");
      } else {
        const price = getTicketPricing();
        handleSave(updatedData);
        handleSavePrice(price);
      }
      return updatedData;
    });
  };

  const handleDeleteTrip = (index) => {
    const updatedTrips = trips.filter((_, i) => i !== index);
    setTrips(updatedTrips);
    saveToLocalStorage(`flightTrips_${member?.flight_id}`, updatedTrips);
  };

  const handleAddTrip = () => {
    const newTrip = {
      price: "",
      is_free: false,
      flightFile: "",
    };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  useEffect(() => {
    const data = getFromLocalStorage(`flightTrips_${member?.flight_id}`);
    const prices = getFromLocalStorage(`ticketPricing_${member?.flight_id}`);
    if (data) {
      setTrips(data);
    }
    if (prices) {
      setTicketPricing(prices);
    }
  }, []);

  return (
    <>
      <FlightDetails data={member} />
      <TicketPricingForm
        id={member?.flight_id}
        ticketPricing={ticketPricing}
        setTicketPricing={setTicketPricing}
      />
      <Divider
        sx={{
          color: "black",
          marginTop: "20px",
          backgroundColor: "black",
        }}
      />
      {/* <div>please add Trips for {member?.passenger_name}</div> */}
      <div className="add-button-container" style={{ marginBottom: "20px" }}>
        <button
          variant="contained"
          color="primary"
          className="add-button-participant"
          onClick={handleAddTrip}
        >
          Add Trip
        </button>
      </div>
      <div>
        <Grid container spacing={3}>
          {trips.map((trip, index) => (
            <>
              <Grid item xs={12} key={index}>
                <div style={{ marginTop: "20px" }}>
                  <div className="delete-icon-container">
                    <SVG
                      className="delete-icon"
                      src={deleteIcon}
                      onClick={() => handleDeleteTrip(index)}
                    />
                  </div>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={4}>
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
                        required
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={4}>
                      <ImageUpload
                        label="Upload Flight Information"
                        inputValue={trip.flightFile}
                        setInputValue={(value) => {
                          const updatedTrips = [...trips];
                          updatedTrips[index].flightFile = value;
                          setTrips(updatedTrips);
                        }}
                        allowedExtensions={["pdf", "jpg", "jpeg", "png"]}
                        />
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
              </Grid>
            </>
          ))}
        </Grid>
        <div className="actions-section">
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={false}
            fullWidth
            sx={{
              marginTop: "20px",
              backgroundColor: "#cc0000",
              width: "100%",
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default FlightInformation;
