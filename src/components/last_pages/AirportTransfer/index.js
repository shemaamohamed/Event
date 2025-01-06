import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "../../../CoreComponent/Select";
import Input from "../../../CoreComponent/Input";
import DateInput from "../../../CoreComponent/Date";
import Checkbox from "../../../CoreComponent/Checkbox";
import { useAuth } from "../../../common/AuthContext";
import toast from "react-hot-toast";
import Dialog from "../../../CoreComponent/Dialog";
import SimpleLabelValue from "../../SimpleLabelValue";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const TripTypeOptions = [
  {
    value: "One-way trip from the airport to the hotel",
    label: "One-way trip from the airport to the hotel",
  },
  {
    value: "One-way trip from the hotel to the airport",
    label: "One-way trip from the hotel to the airport",
  },
  { value: "Round trip", label: "Round trip" },
];
const AirportTransferForm = () => {
  const { userId } = useAuth();
  const [id, setId] = useState(0);
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    tripType: "",
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    departureTime: "",
    flightNumber: "",
    companionName: "",
    hasCompanion: false,
  });

  const [invoiceData, setInvoiceData] = useState(null);
  const [open, setOpen] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const {
    tripType,
    arrivalDate,
    arrivalTime,
    departureDate,
    departureTime,
    flightNumber,
    companionName,
    hasCompanion,
  } = formData;

  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const handleChange = (field) => (value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  const convertTimeFormat = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${parseInt(hours, 10)}:${minutes}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = isEdit
      ? `${BaseUrl}/airport-transfer-bookings/edit/${id}`
      : `${BaseUrl}/airport-transfer-bookings`;
    try {
      const response = await axios.post(
        url,
        {
          userId,
          trip_type: tripType,
          arrival_date: arrivalDate,
          arrival_time: arrivalTime,
          departure_date: departureDate,
          departure_time: departureTime,
          flight_number: flightNumber,
          companion_name: hasCompanion ? companionName : null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const invoice = response.data.invoice; // Assuming invoice is part of the response
      setInvoiceData(invoice); // Store the invoice data
      setOpen(true);
      toast.success("Request submitted successfully.");
      navigate("/home")
    } catch (error) {
      toast.error("An error occurred while submitting the request.");
    }
  };

  const getBooking = () => {
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("token");
    axios
      .get(`${BaseUrl}/user/airport-transfer-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`, // تمرير التوكن في الهيدر
        },
      })
      .then((response) => {
        console.log(response);

        // وضع البيانات في الحالة
        setBookingData(response.data);
        const data2 = response?.data?.[0];
        setId(data2?.id);
        setFormData({
          tripType: data2?.trip_type,
          arrivalDate: data2?.arrival_date,
          arrivalTime: data2?.arrival_time,
          departureDate: data2?.departure_date,
          departureTime: data2?.departure_time,
          flightNumber: data2?.flight_number,
          companionName: data2?.companion_name,
          hasCompanion: !!data2?.companion_name,
        });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getBooking();
  }, []);

  return (
    <div className="airport-transfer-form-section">
      {!bookingData || bookingData.length === 0 || isEdit ? (
        <div className="airport-transfer-form">
          <form
            className="airport-transfer-form-container"
            onSubmit={handleSubmit}
          >
            <h3>Airport Transfer Request</h3>

            <Select
              options={TripTypeOptions}
              value={{ value: tripType, label: tripType }}
              setValue={(option) => handleChange("tripType")(option.value)}
              label="Trip Type"
            />

            <DateInput
              label="Arrival Date"
              inputValue={arrivalDate}
              setInputValue={handleChange("arrivalDate")}
              required
            />

            <DateInput
              label="Arrival Time"
              inputValue={arrivalTime}
              setInputValue={handleChange("arrivalTime")}
              placeholder="Enter Arrival Time"
              type="time"
              required
            />

            <DateInput
              label="Departure Date"
              inputValue={departureDate}
              setInputValue={handleChange("departureDate")}
              placeholder="Enter Departure Date"
              type="date"
            />

            <DateInput
              label="Departure Time"
              inputValue={departureTime}
              setInputValue={handleChange("departureTime")}
              placeholder="Enter Departure Time"
              type="time"
            />

            <Input
              label="Flight Number"
              inputValue={flightNumber}
              setInputValue={handleChange("flightNumber")}
              placeholder="Enter Flight Number"
              required
            />

            <Checkbox
              label="Do you have a companion?"
              checkboxValue={hasCompanion}
              setCheckboxValue={handleChange("hasCompanion")}
            />

            {hasCompanion && (
              <Input
                label="Companion Name"
                inputValue={companionName}
                setInputValue={handleChange("companionName")}
                placeholder="Enter Companion's Name"
              />
            )}

            <div className="form-action">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
          <Dialog
            viewHeader={true}
            header="Invoice"
            open={open}
            setOpen={setOpen}
            children={
              invoiceData && (
                <div className="invoice-section">
                  <p>Price: ${invoiceData}</p>
                  <button className="pay-btn">Pay Now</button>
                </div>
              )
            }
          />
        </div>
      ) : (
        <div className="booking-data">
          {bookingData?.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-details">
                <h4>Booking Details</h4>
                <div className="booking-details-list">
                  <SimpleLabelValue
                    label="Trip Type"
                    value={booking.trip_type}
                  />
                  <SimpleLabelValue
                    label="Arrival Date"
                    value={booking.arrival_date}
                  />
                  <SimpleLabelValue
                    label="Arrival Time"
                    value={booking.arrival_time}
                  />
                  <SimpleLabelValue
                    label="Departure Date"
                    value={booking.departure_date}
                  />
                  <SimpleLabelValue
                    label="Departure Time"
                    value={booking.departure_time}
                  />
                  <SimpleLabelValue
                    label="Flight Number"
                    value={booking.flight_number}
                  />
                </div>
                {/* {booking.speaker && (
                <p><strong>Speaker: </strong>{booking.speaker.accommodation_status ? "Yes" : "No"}</p>
              )} */}
              </div>

              <div className="invoice-details">
                <h4>Invoice</h4>
                {booking.invoice ? (
                  <div className="invoice-details-list">
                    <SimpleLabelValue
                      label="Total Price"
                      value={booking.invoice.total_price}
                    />
                    <SimpleLabelValue
                      label="Status"
                      value={booking.invoice.status}
                    />

                    <button className="pay-btn">Pay Now</button>
                    <button
                      className="pay-btn"
                      onClick={() => {
                        setIsEdit(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <p>No invoice available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AirportTransferForm;
