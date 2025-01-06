import React, { useState, useEffect } from "react";
import httpService from "../../common/httpService";
import SimpleLabelValue from "../SimpleLabelValue";
import "./style.scss";
import { backendUrlImages } from "../../constant/config";
import moment from "moment";
import { useAuth } from "../../common/AuthContext";

const FlightsWithInvoices = () => {
  const [flightsData, setFlightsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const { userId } = useAuth();

  useEffect(() => {
    const fetchFlightsData = async () => {
      setLoading(true);
      try {
        const data = await httpService({
          url: `${BaseUrl}/flights-with-invoices/user/${userId}`,
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          withToast: true,
          showLoader: true,
          onSuccess: (res) => console.log("Data fetched successfully:", res),
          onError: (err) => console.error("Error fetching data:", err),
        });
        setFlightsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightsData();
  }, []);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!flightsData) return <p className="no-data-message">No data available</p>;

  const renderFlightDetails = (flight) => (
    <div className="flight-details2">
      <div className="flight-details">
        <SimpleLabelValue label="Flight ID" value={flight?.flight_id || "-"} />
        <SimpleLabelValue
          label="Passenger Name"
          value={flight?.passenger_name || "-"}
        />
        <SimpleLabelValue
          label="Departure Airport"
          value={flight?.departure_airport || "-"}
        />
        <SimpleLabelValue
          label="Arrival Airport"
          value={flight?.arrival_airport || "-"}
        />
        <SimpleLabelValue
          label="Departure Date"
          value={flight?.departure_date || "-"}
        />
        <SimpleLabelValue
          label="Arrival Date"
          value={flight?.arrival_date || "-"}
        />
        <SimpleLabelValue
          label="Seat Preference"
          value={flight?.seat_preference || "-"}
        />
        <SimpleLabelValue
          label="Additional Requests"
          value={flight?.additional_requests || "-"}
        />
        <SimpleLabelValue
          label="updated At"
          value={moment(flight?.updated_at).format("DD-MM-YYYY HH:MM") || "-"}
        />
    {flight?.last_speaker_update_at && (
  <SimpleLabelValue
    label="Last Speaker Update"
    value={flight.last_speaker_update_at}
  />
)}

{flight?.last_admin_update_at && (
  <SimpleLabelValue
    label="Last Admin Update"
    value={flight.last_admin_update_at}
  />
)}

{flight?.admin_update_deadline && (
  <SimpleLabelValue
    label="Admin Update Deadline"
    value={flight.admin_update_deadline}
  />
)}

      </div>
      {flight?.invoice && (
        <>
          <h3 className="invoice-header">Invoice</h3>
        </>
      )}
      <div className="flight-details">
        {flight?.invoice && (
          <>
            <SimpleLabelValue
              label="Invoice ID"
              value={flight?.invoice?.id || "-"}
            />
            <SimpleLabelValue
              label="Total Price"
              value={flight?.invoice?.total_price || "-"}
            />
            <SimpleLabelValue
              label="Status"
              value={flight?.invoice?.status || "-"}
            />
            <SimpleLabelValue
              label="Ticket PDF"
              value={
                flight?.invoice?.ticketPDF ? (
                  <a
                    href={`${backendUrlImages}${flight?.invoice?.ticketPDF}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                ) : (
                  "-"
                )
              }
            />
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flights-with-invoices">
      <h2 className="section-heading">User Flights</h2>
      <div className="flights-list">
        {Array.isArray(flightsData?.user_flights) &&
        flightsData.user_flights.length > 0 ? (
          flightsData.user_flights.map((flight, index) => (
            <div key={index} className="flight-container">
              {renderFlightDetails(flight)}
            </div>
          ))
        ) : (
          <p className="no-flights-message">No flights available</p>
        )}
      </div>

      <h2 className="section-heading">Companions</h2>
      <div className="companions-list">
        {Array.isArray(flightsData?.companions) &&
        flightsData.companions.length > 0 ? (
          flightsData.companions.map((companion, index) => (
            <div key={index} className="flight-container">
              {renderFlightDetails(companion)}
            </div>
          ))
        ) : (
          <p className="no-companions-message">No companions available</p>
        )}
      </div>
    </div>
  );
};

export default FlightsWithInvoices;
