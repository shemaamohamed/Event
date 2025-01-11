import React, { useEffect, useState } from "react";
import axios from "axios";
import httpService from "../../../../common/httpService";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { backendUrlImages } from "../../../../constant/config";
import tripImage from "../../../../icons/tripImage.webp";
import { useAuth } from "../../../../common/AuthContext";
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const ViewUserTrips = () => {
  const navigate = useNavigate();
  const [allTrips, setAllTrips] = useState([]);
  const [hasFreeTrip, setHasFreeTrip] = useState(false);
  const [selectedTripType, setSelectedTripType] = useState("private");
  const { myConferenceId } = useAuth();

  const token = localStorage.getItem("token");
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const getSpeakerInfo = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/speakers/${myConferenceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const speakerData = response.data.speaker;
      console.log({ speakerData });
      setHasFreeTrip(speakerData.free_trip);
    } catch (error) {
      console.error(
        "Failed to fetch speaker info:",
        error.response?.data || error.message
      );
    }
  };

  const fetchTrips = async () => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/all-trip`,
        params: { trip_type: selectedTripType },
        headers: { Authorization: `Bearer ${token}` },
        showLoader: true,
        withToast: true,
      });
      setAllTrips(response?.trips || []);
    } catch (error) {
      console.error("Failed to fetch trips:", error.message);
    }
  };

  useEffect(() => {
    fetchTrips();
    getSpeakerInfo();
  }, [selectedTripType]);

  return (
    <div className="trips-page">
      <div className="trips-users-container">
        <div className="trips-types-btn">
          {hasFreeTrip && (
            <button
              className={`trip-type-btn ${
                selectedTripType === "group" ? "active" : ""
              }`}
              onClick={() => setSelectedTripType("group")}
            >
              Group Trips
            </button>
          )}
          <button
            className={`trip-type-btn ${
              selectedTripType === "private" ? "active" : ""
            }`}
            onClick={() => setSelectedTripType("private")}
          >
            Private Trips
          </button>
          <small className="trip-note">
            You can book multiple trips based on your availability.
          </small>
        </div>
      </div>

      <Grid container spacing={2}>
        {allTrips.length > 0 ? (
          allTrips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={trip.id}>
                     <Card
      sx={{
        maxWidth: 345, 
        margin: "20px auto", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
        borderRadius: "8px", 
        overflow: "hidden", 
      }}
      key={trip.id}
    >
      <CardMedia
        component="img"
        image={`${backendUrlImages}${trip.image_1}`}
        onError={(e) => {
          e.currentTarget.src = tripImage;
        }}
        alt="Trip"
        sx={{
          height: 180, 
        }}
      />

      <CardContent>
        <Box className="main-info" sx={{ marginBottom: "10px" }}>
          <Typography
            variant="h6"
            component="div"
            className="name"
            sx={{
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            {trip.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="desc"
          >
            {trip.description}
          </Typography>
        </Box>

        <Box
          className="actions-btns"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className="view"
            onClick={() => navigate(`/view/trip/${trip.id}`)}
          >
            Register for a Trip
          </Button>
        </Box>
      </CardContent>
    </Card>
              </Grid>
     
          ))
        ) : (
          <p className="no-trips-message">No trips available for this type.</p>
        )}
      </Grid>
    </div>
  );
};

export default ViewUserTrips;
