import React, { useState, useEffect, Fragment } from "react";
import SimpleLabelValue from "../../components/SimpleLabelValue";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import httpService from "../../common/httpService";
import "./style.scss";
import { useAuth } from "../../common/AuthContext";
import { backendUrlImages } from "../../constant/config";
import { Button, Grid, Typography } from "@mui/material";

const ReservationDetails = ({ setDisabledButton }) => {
  const [reservations, setReservations] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { myConferenceId } = useAuth();

  const fetchReservations = async () => {
    if (!myConferenceId) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await httpService({
        method: "GET",
        url: `${BASE_URL}/reservations/rooms/${myConferenceId}`,
        headers: { Authorization: `Bearer ${token}` },
        withToast: false,
        showLoader: true,
      });
      if (!response?.data || !response?.data?.length) {
        setDisabledButton(false);
      }
      if (response?.status === "success" && response?.data) {
        const formattedReservations = formatReservationData(response.data);
        setReservations(formattedReservations);
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Fetch Reservations Error:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [myConferenceId]);

  const formatReservationData = (data) =>
    data.map((reservation) => ({
      id: reservation.id,
      userId: reservation.user_id,
      roomCount: reservation.room_count,
      companionsCount: reservation.companions_count,
      companionsNames: reservation.companions_names || "-",
      updateDeadline: reservation.update_deadline,
      conferenceId: reservation.conference_id,
      createdAt: reservation.created_at,
      updatedAt: reservation.updated_at,
      rooms: reservation.rooms.map((room) => ({
        ...room,
        id: room.id,
        type: room.room_type,
        occupant: room.occupant_name || "-",
        checkIn: room.check_in_date,
        checkOut: room.check_out_date,
        totalNights: room.total_nights,
        cost: room.cost,
        additionalCost: room.additional_cost,
        isConfirmed: room.is_confirmed ? "Yes" : "No",
      })),
    }));

  const RoomDetails = ({ room }) => {
    console.log({ room });

    return (
      <div>
        <div className="room-details">
          <SimpleLabelValue label="Occupant" value={room.occupant} />
          <SimpleLabelValue label="Type" value={room.type} />
          <SimpleLabelValue label="Arrival Date" value={room.checkIn || "-"} />
          <SimpleLabelValue
            label="Departure Date"
            value={room.checkOut || "-"}
          />
          <SimpleLabelValue
            label="Total Nights"
            value={room.totalNights || "-"}
          />
        </div>

        <div className="line"></div>

        <div className="invoice-details">
          {room.reservation_invoices &&
            room.reservation_invoices.length > 0 && (
              <div>
                <div className="title-reservation">Invoice Details</div>
                {room.reservation_invoices.map((invoice) => (
                  <div key={invoice.id} className="reservation-invoice">
                    <SimpleLabelValue
                      label="Price"
                      value={`$${invoice.price}`}
                    />
                    <SimpleLabelValue
                      label="Additional Price"
                      value={`$${invoice.additional_price}`}
                    />
                    <SimpleLabelValue
                      label="Total"
                      value={`$${invoice.total}`}
                    />

                    <SimpleLabelValue
                      label="Confirmation PDF"
                      value={
                        invoice.confirmationPDF ? (
                          <a
                            href={`${backendUrlImages}${invoice.confirmationPDF}`}
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
                    <SimpleLabelValue label="Status" value={invoice.status} />
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    );
  };

  const ReservationCard = ({ reservation }) => (
    <div className="reservation-card-section">
      <div className="title-reservation">Reservation Details</div>
      <div className="info-reservation-section">
        <SimpleLabelValue label="Room Count" value={reservation.roomCount} />

        <SimpleLabelValue
          label="Update Deadline"
          value={reservation.updateDeadline || "-"}
        />
      </div>
      {/* <div className="title-reservation">Rooms</div> */}
      {reservation.rooms.map((room, index) => (
        <Fragment>
          <div className="title-reservation">Room {index + 1}</div>
          <RoomDetails key={room.id} room={room} />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="reservation-details">
      {reservations?.map((reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
};

const Reservation = () => {
  const navigate = useNavigate();
  const [disabledBtn, setDisabledButton] = useState(true);
  const[paid,setPaid]=useState(0)
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const getPaidOrNot = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing!");
        return;
      }
  
      const response = await axios.get(`${BaseUrl}/is-paid`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Payment Status:", response.data.is_paid);
      setPaid(response.data.is_paid);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };
  useEffect(()=>{
    getPaidOrNot()
  },[])
  return (
  <div>{paid  ? (
    <div className="payment-success">
      <h2>✅ Payment Successfully Completed!</h2>
  <p>Thank you! You have successfully completed the payment.</p>
  
    </div>
  ):(
      <div className="all-reservation-form">
        <Grid container direction="column" spacing={2}>
      {/* Header Section */}
      <Grid item xs={12} >
        <Typography
          variant="h6"
          sx={{
            color: '#9B1321',
            fontWeight: 'bold',
            fontSize: { xs: '1.3rem', sm: '2rem', md: '2rem' },
            textAlign: 'center',
          }}
          className="title-container">
          Reservation Information Page
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="center"
        sx={{
          padding:'5px'
        }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              className={`reservation-information-btn ${disabledBtn && "disabled"}`}
              disabled={disabledBtn}
              onClick={() => navigate("/stepper")}
              fullWidth
            >
              Add Reservation Information
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="error"
              className={`reservation-information-btn ${!disabledBtn && "disabled"}`}
              disabled={!disabledBtn}
              onClick={() => navigate("/stepper/edit")}
              fullWidth
              sx={{
                backgroundColor:"#9B1321"
              }}
            >
              Edit Reservation Information
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
      <ReservationDetails
        disabledBtn={disabledBtn}
        setDisabledButton={setDisabledButton}
      />

      {/* <div>pay</div> */}
    </div>)}
  </div>
  );
};

export default Reservation;
