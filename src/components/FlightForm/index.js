import React, { useEffect, useState } from "react";
import Input from "../../CoreComponent/Input/index";
import Checkbox from "../../CoreComponent/Checkbox/index";
import DateInput from "../../CoreComponent/Date/index";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../../components/SimpleLabelValue";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUpload from "../../CoreComponent/ImageUpload";
import WhatsAppButton from "../WhatsAppButton";
import MainFlightFormUpdate from "./updateMainFlightForm";
import { useAuth } from "../../common/AuthContext";
import "./style.scss";
import FlightsWithInvoices from "../FlightView";
import { Button, Grid, Typography } from "@mui/material";

const MainFlightForm = ({ setOpenForm, getFlightData }) => {
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const { userId } = useAuth();
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passportImage, setPassportImage] = useState(null);
  const [departureAirport, setDepartureAirport] = useState("");
  const [returnAirport, setReturnAirport] = useState("");
  const [specificFlightTime, setSpecificFlightTime] = useState(false);
  const [flightTime, setFlightTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [otherRequests, setOtherRequests] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [upgradeClass, setUpgradeClass] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData?.append("arrival_date", arrivalDate);
    formData?.append("departure_date", departureDate);
    formData?.append("passport_image", passportImage);
    formData?.append("departure_airport", departureAirport);
    formData?.append("arrival_airport", returnAirport);
    formData?.append("specific_flight_time", flightTime);
    formData?.append("flight_number", flightNumber || 0);
    formData?.append("additional_requests", otherRequests || "none");
    formData?.append("seat_preference", seatNumber || 0);
    formData?.append("upgrade_class", upgradeClass ? 1 : 0);
    formData?.append("ticket_count", ticketCount);
    formData?.append("is_companion", 0);
    formData?.append("user_id", userId);

    axios
      .post(`${BaseUrl}/flights`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // toast.success(response?.data?.message);
        setOpenForm(false);
        getFlightData();
      })
      .catch((error) => {
        console.error(
          "There was an error creating the flight:",
          error.response.data
        );
      });
  };

  return (
    <form className="main-flight-form" onSubmit={handleSubmit}>
      <div className="flight-information-header">Flight Information</div>
      <div className="form-section">
        <DateInput
          label="Arrival Date"
          inputValue={arrivalDate}
          setInputValue={setArrivalDate}
          placeholder="Arrival Date"
          required={true}
        />
        <DateInput
          label="Departure Date"
          inputValue={departureDate}
          setInputValue={setDepartureDate}
          placeholder="Departure Date"
          required={true}
        />
        <ImageUpload
          label="Passport Image"
          allowedExtensions={["jpg", "jpeg", "png", "gif"]}
          inputValue={passportImage}
          setInputValue={setPassportImage}
          required={true}
        />
        <Input
          label="Departure Airport"
          type="text"
          inputValue={departureAirport}
          setInputValue={setDepartureAirport}
          placeholder="Departure Airport"
          required={true}
        />
        <Input
          label="Return Airport"
          type="text"
          inputValue={returnAirport}
          setInputValue={setReturnAirport}
          placeholder="Return Airport"
          required={true}
        />
        <Checkbox
          label="Do you have specific flight time?"
          checkboxValue={specificFlightTime}
          setCheckboxValue={setSpecificFlightTime}
        />
        {specificFlightTime && (
          <>
            <Input
              label="Flight Time"
              type="time"
              inputValue={flightTime}
              setInputValue={setFlightTime}
              placeholder="Flight Time"
              required={true}
            />
            <Input
              label="Flight Number"
              type="text"
              inputValue={flightNumber}
              setInputValue={setFlightNumber}
              placeholder="Flight Number"
              required={false}
            />
          </>
        )}
        <Input
          label="Other Requests"
          type="text"
          inputValue={otherRequests}
          setInputValue={setOtherRequests}
          placeholder="Other Requests"
          required={false}
        />
        <Input
          label="Seat Number"
          type="text"
          inputValue={seatNumber}
          setInputValue={setSeatNumber}
          placeholder="Seat Number"
          required={false}
        />
        <Checkbox
          label="Do you want to upgrade from economy to business class?"
          checkboxValue={upgradeClass}
          setCheckboxValue={setUpgradeClass}
        />
        <Input
          label="Number of Tickets to Book"
          type="number"
          inputValue={ticketCount}
          setInputValue={(value) => setTicketCount(Number(value))}
          placeholder="Number of Tickets to Book"
          required={true}
        />
      </div>
      <div className="actions-section-container">
        <button className="cancel-btn" onClick={() => setOpenForm(false)}>
          Cancel
        </button>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

const FlightForm = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const [data, setData] = useState({});
  const [openFlight, setOpenFlight] = useState(false);
  const [openFlightUpdate, setOpenFlightUpdate] = useState(false);
  const [availableFlights, setAvailableFlights] = useState([]);
  const [openIsAvailableFlights, setOpenIsAvailableFlights] = useState(false);
  const [flight_id, setFlight_id] = useState(0);
  const navigate = useNavigate();
  const [openCompanion, setOpenCompanion] = useState(false);

  const getFlightData = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BaseUrl}/flight`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data?.[0]?.flight);
        setFlight_id(response.data?.[0]?.flight?.flight_id);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getFlightData();
  }, []);

  const handleAvailableFlight = (id) => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BaseUrl}/available-flights/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAvailableFlights(response.data?.available_flights);
      })
      .catch((error) => {
        console.error("Error fetching flight data:", error);
      });
  };
  const handelDelete = () => {
    const token = localStorage.getItem("token"); // استبدل بـ التوكن الفعلي
    const endpoint = `${BaseUrl}/flights/com/2`; // نقطة النهاية

    axios
      .delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Flights deleted successfully:", response.data);
        alert("All flights have been deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting flights:", error.response.data);
        alert("An error occurred while deleting flights. Please try again.");
      });
  };

  const EmergencyButton = () => {
    const message =
      "This is an urgent matter. Please get in touch as soon as possible.";
    const phoneNumber = "962799602002"; // رقمك مع رمز البلد
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return (
    <div 
    style={{
      borderRadius: '8px',
      width: '100%',
      maxWidth: '1700px',
      padding: '20px',
    }}
    >
       
        <Grid container
        spacing={1}
        >
           <Grid item xs={12}  >
          <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: '#c62828',
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2rem' },
            textAlign: 'center',
          }}
          >
          Flight Information Page

          </Typography>

        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
        <Button
            className={`${!Object.keys(data).length ? "disabled-btn" : ""}`}
            type="button"
            disabled={!Object.keys(data).length}
            onClick={() => {
              navigate(`/accept/flight/${flight_id}`);
            }}
            sx={{
              backgroundColor: '#c62828',
      
              marginTop: "20px",
              width: "100%",
              color: "#fff",

              "&:hover": {
                backgroundColor: "#e63946",
                color: "#fff",
              }
            }}
          >
            Choose Accepted Flight
          </Button>
          

        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
        <Button
            className={`${Object.keys(data).length ? "disabled-btn" : ""}`}
            type="button"
            onClick={() => navigate(`/flights/users`)}
            disabled={Object.keys(data).length}
            variant="outlined"
            sx={{
      
              marginTop: "20px",
              color: "black",
              width: "100%",
              "&:hover": {
                backgroundColor: "#e63946",
                color: "#fff",
              }
            }}
          >
            Add Flight Information
          </Button>
          

        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
        <Button
            className={`${!Object.keys(data).length ? "disabled-btn" : ""}`}
            type="button"
            onClick={() => navigate(`/flights/users/edit`)}
            disabled={!Object.keys(data).length}
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
          >
            Edit Flight Information
          </Button>
          

        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
        <Button
            type="button"
            onClick={() => {
              EmergencyButton();
            }}
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
          >
            Emergency
          </Button>
          

        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
        <Button
            type="button"
            onClick={() => {
              handelDelete();
            }}
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
          >
            Delete
          </Button>
          

        </Grid>
        

      </Grid>


      
      <FlightsWithInvoices />

      {/* {Object.keys(data).length ? (
        <div className="view-flight-details">
          <SimpleLabelValue
            label="Arrival Date"
            value={data?.arrival_date || "-"}
          />
          <SimpleLabelValue
            label="Departure Date"
            value={data?.departure_date || "-"}
          />
          <SimpleLabelValue
            label="Departure Airport"
            value={data?.departure_airport || "-"}
          />
          <SimpleLabelValue
            label="Arrival Airport"
            value={data?.arrival_airport || "-"}
          />
          <SimpleLabelValue
            label="Specific Flight Time"
            value={data?.specific_flight_time ? "Yes" : "No"}
          />
          <SimpleLabelValue
            label="Flight Time"
            value={data?.specific_flight_time || "-"}
          />
          <SimpleLabelValue
            label="Flight Number"
            value={data?.flight_number || "-"}
          />
          <SimpleLabelValue
            label="Seat Number"
            value={data?.seat_preference || "-"}
          />
          <SimpleLabelValue
            label="Upgrade Class"
            value={data?.upgrade_class ? "Yes" : "No"}
          />
          <SimpleLabelValue
            label="Ticket Count"
            value={data?.ticket_count || "-"}
          />
          <SimpleLabelValue
            label="Other Requests"
            value={data?.additional_requests || "-"}
          />
        </div>
      ) : (
        <div className="no-flight-data">
          <p>No flight data available.</p>
        </div>
      )} */}
      {openFlight && (
        <MySideDrawer open={openFlight} setOpen={setOpenFlight}>
          <MainFlightForm
            setOpenForm={setOpenFlight}
            getFlightData={getFlightData}
          />
        </MySideDrawer>
      )}
      {openFlightUpdate && (
        <MySideDrawer open={openFlightUpdate} setOpen={setOpenFlightUpdate}>
          <MainFlightFormUpdate setOpenForm={setOpenFlightUpdate} />
        </MySideDrawer>
      )}
      {openIsAvailableFlights && (
        <WhatsAppButton
          open={openIsAvailableFlights}
          setOpen={setOpenIsAvailableFlights}
          availableFlights={availableFlights}
          handleAvailableFlight={handleAvailableFlight}
          setOpenCompanion={setOpenCompanion}
          openCompanion={openCompanion}
        />
      )}
    </div>
  );
};

export default FlightForm;
