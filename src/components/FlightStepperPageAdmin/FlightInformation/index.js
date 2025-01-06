import React, { Fragment, useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input/index";
import Checkbox from "../../../CoreComponent/Checkbox/index";
import DateInput from "../../../CoreComponent/Date/index";
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

const FlightDetails = ({ data }) => {
  return (
    <div className="view-main-user-flight">
      <SimpleLabelValue
        label="Departure Airport"
        value={data?.departure_airport}
      />
      <SimpleLabelValue label="Arrival Airport" value={data?.arrival_airport} />
      <SimpleLabelValue label="Departure Date" value={data?.departure_date} />
      <SimpleLabelValue label="Arrival Date" value={data?.arrival_date} />
      <SimpleLabelValue label="Flight Number" value={data?.flight_number} />
      <SimpleLabelValue label="Seat Preference" value={data?.seat_preference} />
      <SimpleLabelValue
        label="Upgrade Class"
        value={data?.upgrade_class ? "yes" : "No"}
      />
      <SimpleLabelValue label="Ticket Count" value={data?.ticket_count} />
      <SimpleLabelValue
        label="Additional Requests"
        value={data?.additional_requests}
      />
      <SimpleLabelValue label="Passenger Name" value={data?.passenger_name} />
      <SimpleLabelValue
        label="Specific Flight Time"
        value={data?.specific_flight_time}
      />
    </div>
  );
};

const FlightInformation = ({ member, index }) => {
  const { currentStep, completeStep, passportImage, flightMembers } =
    useFlightStepperAdmin();
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  // State to manage an array of trips
  const [trips, setTrips] = useState([
    {
      departure_date: "",
      departure_time: "",
      price: "",
      is_free: false,
      departure_flight_number: "",
      departure_airport: "",
      arrival_flight_number: "",
      arrival_date: "",
      arrival_time: "",
      arrival_airport: "",
    },
  ]);
  const [ticketPricing, setTicketPricing] = useState({
    business_class_upgrade_cost: "",
    reserved_seat_cost: "",
    other_additional_costs: "",
  });

  const getFlightTrips = () => {
    const flightTrips = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("flightTrips_")) {
        const value = localStorage.getItem(key);
        const title = key.replace("flightTrips_", "");
        try {
          flightTrips.push({ flight_id: title, data: JSON.parse(value) });
        } catch {
          flightTrips.push({ flight_id: title, data: value });
        }
      }
    }

    return flightTrips;
  };

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
    const response = await httpService({
      method: "POST",
      url: `${BaseUrl}/available-flights/all`,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
      data: {
        flights: data,
      },
      showLoader: false,
      withToast: false,
    });
    navigate("/flights")
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
    saveToLocalStorage(
      `flightTrips_${member?.flight_id}`,
      trips.map((item) => {
        return {
          departure_date: item?.departure_date,
          departure_time: item?.departure_time,
          price: item?.price,
          is_free: item?.is_free,
          departure_flight_number: item.departure_flight_number,
          departure_airport: item.departure_airport,
          arrival_flight_number: item.arrival_flight_number,
          arrival_date: item.arrival_date,
          arrival_time: item.arrival_time,
          arrival_airport: item.arrival_airport,
        };
      })
    );

    saveToLocalStorage(`ticketPricing_${member?.flight_id}`, ticketPricing);
    if (!isFinalStep) {
      completeStep(currentStep);
      toast.success("The data was updated successfully!");
    } else {
      const data = getFlightTrips();
      const price = getTicketPricing();
      handleSave(data);
      handleSavePrice(price);
    }
  };

  const handleDeleteTrip = (index) => {
    const updatedTrips = trips.filter((_, i) => i !== index);
    setTrips(updatedTrips);
    saveToLocalStorage(`flightTrips_${member?.flight_id}`, updatedTrips);
  };

  const handleAddTrip = () => {
    const newTrip = {
      departure_date: "",
      departure_time: "",
      price: "",
      is_free: false,
      departure_flight_number: "",
      departure_airport: "",
      arrival_flight_number: "",
      arrival_date: "",
      arrival_time: "",
      arrival_airport: "",
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
    <Fragment>
      <FlightDetails data={member} />
      <TicketPricingForm
        id={member?.flight_id}
        ticketPricing={ticketPricing}
        setTicketPricing={setTicketPricing}
      />
      {/* <div>please add Trips for {member?.passenger_name}</div> */}
      <div className="add-flight-btn-container">
        <button type="button" onClick={handleAddTrip}>
          Add Trip
        </button>
      </div>
      <div>
        <div className="room-form-container">
          {trips.map((trip, index) => (
            <div className="flight-admin" key={index}>
              <div className="delete-icon-container">
                <SVG
                  className="delete-icon"
                  src={deleteIcon}
                  onClick={() => handleDeleteTrip(index)}
                />
              </div>
              <div className="room-form-stepper">
                <DateInput
                  label="Departure Date"
                  placeholder="Enter departure date"
                  inputValue={trip.departure_date}
                  setInputValue={(value) => {
                    const updatedTrips = [...trips];
                    updatedTrips[index].departure_date = value;
                    setTrips(updatedTrips);
                  }}
                  required={true}
                />
                <Input
                  label="Departure Time"
                  placeholder="Enter departure time"
                  inputValue={trip.departure_time}
                  setInputValue={(value) => {
                    const updatedTrips = [...trips];
                    updatedTrips[index].departure_time = value;
                    setTrips(updatedTrips);
                  }}
                  type="time"
                  required={true}
                />
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
              <Input
                  label="Departure Flight Number"
                  inputValue={trip.departure_flight_number}
                  setInputValue={(value) => {
                    const updatedTrips = [...trips];
                    updatedTrips[index].departure_flight_number = value;
                    setTrips(updatedTrips);
                  }}
                  required
                />
                <Input
                  label="Departure Airport"
                  inputValue={trip.departure_airport}
                  setInputValue={(value) => {
                    const updatedTrips = [...trips];
                    updatedTrips[index].departure_airport = value;
                    setTrips(updatedTrips);
                  }}
                  required
                />
                <Input
                  label="Arrival Flight Number"
                  inputValue={trip.arrival_flight_number}
                  setInputValue={(value) => {
                    const updatedTrips = [...trips];
                    updatedTrips[index].arrival_flight_number = value;
                    setTrips(updatedTrips);
                  }}
                  required
                />
                <DateInput
                  label="Arrival Date"
                  inputValue={trip.arrival_date}
                  setInputValue={(value) => {
                    const updatedTrips = [...trips];
                    updatedTrips[index].arrival_date = value;
                    setTrips(updatedTrips);
                  }}
                  required
                />
                <Input
                  label="Arrival Time"
                  inputValue={trip.arrival_time}
                  setInputValue={(value) => {
                    const updatedTrips = [...trips];
                    updatedTrips[index].arrival_time = value;
                    setTrips(updatedTrips);
                  }}
                  type="time"
                  required
                />
                <Input
                  label="Arrival Airport"
                  inputValue={trip.arrival_airport}
                  setInputValue={(value) => {
                    const updatedTrips = [...trips];
                    updatedTrips[index].arrival_airport = value;
                    setTrips(updatedTrips);
                  }}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <div className="actions-section">
          <button
            className={`next-button ${false ? "disabled" : ""}`}
            onClick={() => {
              handleSubmit();
            }}
            disabled={false}
          >
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FlightInformation;
