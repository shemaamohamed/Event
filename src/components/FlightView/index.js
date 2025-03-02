import React, { useState, useEffect } from "react";
import httpService from "../../common/httpService";
import SimpleLabelValue from "../SimpleLabelValue";
import "./style.scss";
import { backendUrlImages } from "../../constant/config";
import moment from "moment";
import { useAuth } from "../../common/AuthContext";
import { Box, Grid, Link, Typography } from "@mui/material";

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
console.log(flightsData);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!flightsData) return <p className="no-data-message">No data available</p>;

  const renderFlightDetails = (flight) => (
    <>
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Flight ID" value={flight?.flight_id || "-"} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Passenger Name" value={flight?.passenger_name || "-"} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Departure Airport" value={flight?.departure_airport || "-"} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Arrival Airport" value={flight?.arrival_airport || "-"} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Departure Date" value={flight?.departure_date || "-"} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Arrival Date" value={flight?.arrival_date || "-"} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Seat Preference" value={flight?.seat_preference || "-"} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Additional Requests" value={flight?.additional_requests || "-"} />
    </Grid>


    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Flight Time" value={flight?.specific_flight_time || "-"} />
    </Grid>

{/* 
    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Flight Time" value={flight?.additional_requests || "-"} />
    </Grid> */}

    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Flight Number" value={flight?.flight_number || "-"} />
    </Grid>

    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Upgrade Class" value={flight?.upgrade_class|| "-"} />
    </Grid>






    <Grid item xs={12} sm={6}>
      <SimpleLabelValue label="Updated At" value={moment(flight?.updated_at).format("DD-MM-YYYY HH:MM") || "-"} />
    </Grid>

    {flight?.last_speaker_update_at && (
      <Grid item xs={12} sm={6}>
        <SimpleLabelValue label="Last Speaker Update" value={flight.last_speaker_update_at} />
      </Grid>
    )}

    {flight?.last_admin_update_at && (
      <Grid item xs={12} sm={6}>
        <SimpleLabelValue label="Last Admin Update" value={flight.last_admin_update_at} />
      </Grid>
    )}

    {flight?.admin_update_deadline && (
      <Grid item xs={12} sm={6}>
        <SimpleLabelValue label="Admin Update Deadline" value={flight.admin_update_deadline} />
      </Grid>
    )}
  </Grid>

  {flight?.invoice && (
    <>
      <Typography variant="h6" component="h3" className="invoice-header">
        Invoice
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue label="Invoice ID" value={flight?.invoice?.id || "-"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue label="Total Price (USD)" value={flight?.invoice?.total_price || "-"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue label="Status" value={flight?.invoice?.status || "-"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleLabelValue
            label="Ticket PDF"
            value={
              flight?.invoice?.ticketPDF ? (
                <Link href={`${backendUrlImages}${flight?.invoice?.ticketPDF}`} target="_blank" rel="noopener noreferrer">
                  View PDF
                </Link>
              ) : (
                "-"
              )
            }
          />
        </Grid>
      </Grid>
    </>
  )}
    </>
 
  );

  return (
    <Box className="flights-with-invoices" sx={{ padding: 2 ,
      justifyContent:'center',
      alignItems:'center',
      display:'flex',
      flexDirection:'column',
      marginTop: 4,
    }}>
    <Typography variant="h4" component="h2" sx={{ marginBottom: 2, fontWeight: 'bold',  color: '#9B1321' }}>
      User Flights
    </Typography>
    <Grid container spacing={2}>
      {Array.isArray(flightsData?.user_flights) && flightsData.user_flights.length > 0 ? (
        flightsData.user_flights.map((flight, index) => (
          <Grid item xs={12} key={index} >
            {renderFlightDetails(flight)}
          </Grid>
        ))
      ) : (
        <Typography
          variant="body1"
          sx={{ color: '#9B1321', textAlign: 'center', width: '100%' }}
          className="no-flights-message"
        >
          No flights available
        </Typography>
      )}
    </Grid>

    <Typography variant="h4" component="h2" sx={{ marginTop: 4, marginBottom: 2, fontWeight: 'bold',  color: '#9B1321' }}>
      Companions
    </Typography>
    <Grid container spacing={2}
     >
      {Array.isArray(flightsData?.companions) && flightsData.companions.length > 0 ? (
        flightsData.companions.map((companion, index) => (
          <Grid item xs={12}  key={index} >
            {renderFlightDetails(companion)}
          </Grid>
        ))
      ) : (
        <Typography
          variant="body1"
          sx={{ color: '#9B1321', textAlign: 'center', width: '100%' }}
          className="no-companions-message"
        >
          No companions available
        </Typography>
      )}
    </Grid>
  </Box>
  );
};

export default FlightsWithInvoices;
