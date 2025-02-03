import React, { useEffect, useState } from "react";
import SimpleLabelValue from "../../SimpleLabelValue";
import "./style.scss";
import httpService from "../../../common/httpService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../common/AuthContext";
import { useStepper } from "../StepperContext";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const InvoiceForm = () => {
  const {
    currentStep,
    completeStep,
    setInvoice,
    mainRoom,
    setMainRoom,
    otherRooms,
    setOtherRooms,
    reservationDetails,
    setReservationDetails,
    rooms,
    roomType,
    checkInDate,
    checkOutDate,
    lateCheckOut,
    earlyCheckIn,
    totalNights,
    reservationId,
    mainRoomId,
  } = useStepper();
  const navigate = useNavigate();
  const { mode } = useParams();
  const { userName, myConferenceId } = useAuth();
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  
  const mainRoom2 = {
    checkInDate,
    checkOutDate,
    lateCheckOut,
    earlyCheckIn,
    totalNights,
    roomType,
  };
  
  useEffect(() => {
    setMainRoom(mainRoom2 || {});
    setOtherRooms(rooms || []);
  }, []);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    return dateStr
    // const date = new Date(dateStr);
    
    // // تحويل التاريخ إلى تنسيق Y-m-d\TH:i
    // return date.toISOString().slice(0, 16); // سيزيل الأجزاء غير الضرورية مثل الثواني والوقت الزمني
  };
  

  const convertObject = (obj) => {
    const rooms = [];

    // Add main room
    rooms.push({
      room_type: obj.mainRoom.roomType.value,
      occupant_name: obj.mainRoom.occupant_name || "",
      check_in_date: formatDateTime(obj.mainRoom.checkInDate),
      check_out_date: formatDateTime(obj.mainRoom.checkOutDate),
      total_nights: parseInt(obj.mainRoom.totalNights),
      cost: 0,
      additional_cost: 0,
      late_check_out: obj.mainRoom.lateCheckOut || false,
      early_check_in: obj.mainRoom.earlyCheckIn || false,
      id: mainRoomId || 0,
    });

    // Add other rooms
    obj.otherRooms.forEach((room) => {
      rooms.push({
        room_type: room.roomType.value,
        occupant_name: room.occupantName,
        check_in_date: formatDateTime(room.checkInDate),
        check_out_date: formatDateTime(room.checkOutDate),
        total_nights: parseInt(room.totalNights),
        cost: 0,
        additional_cost: 0,
        late_check_out: room.lateCheckOut || false,
        early_check_in: room.earlyCheckIn || false,
        id: room.id || 0,
      });
    });

    return { rooms };
  };

  const getAuthToken = () => localStorage.getItem("token");

  const submitReservation = async () => {
    const mainRoom = mainRoom2 || {};
    const otherRooms = rooms || [];

    const body = convertObject({
      mainRoom: { ...mainRoom, occupant_name: userName, id: mainRoomId },
      otherRooms,
    });
console.log(body);

    try {
      const response = await httpService({
        method: "POST",
        url:
          mode === "edit"
            ? `${BaseUrl}/edit/reservation`
            : `${BaseUrl}/reservation`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        data: {
          conference_id: myConferenceId,
          reservation_id: reservationId,
          ...body,
        },
      });

      if (response) {
        setInvoice(response);
        setReservationDetails(response);
        completeStep(currentStep);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="invoice-container-section">
      {reservationDetails && <div className="invoice-details-section"></div>}
      <h3>Main Room</h3>
      <div className="main-room-section">
        <SimpleLabelValue label="Room Type" value={mainRoom?.roomType?.label} />
        <input
          type="datetime-local"
          value={checkInDate}
          onChange={(e) =>
            setMainRoom({ ...mainRoom, checkInDate: e.target.value })
          }
        />
        <input
          type="datetime-local"
          value={checkOutDate}
          onChange={(e) =>
            setMainRoom({ ...mainRoom, checkOutDate: e.target.value })
          }
        />
        <SimpleLabelValue label="Total Nights" value={mainRoom?.totalNights} />
        <SimpleLabelValue
          label="Early Check-in"
          value={mainRoom?.earlyCheckIn ? "Yes" : "No"}
        />
        <SimpleLabelValue
          label="Late Check-out"
          value={mainRoom?.lateCheckOut ? "Yes" : "No"}
        />
      </div>

      <div className="other-rooms-section">
        {otherRooms.map((room, index) => (
          <div key={`${index}_${room.occupantName}`}>
            <h3>Room {index + 1}</h3>

            <div className="room-info">
              <SimpleLabelValue
                label="Occupant Name"
                value={room.occupantName}
              />
              <SimpleLabelValue
                label="Room Type"
                value={room.roomType?.label}
              />
              <SimpleLabelValue
                label="Check-in Date"
                value={new Date(room.checkInDate).toLocaleString()}
              />
              <SimpleLabelValue
                label="Check-out Date"
                value={new Date(room.checkOutDate).toLocaleString()}
              />
              <SimpleLabelValue
                label="Total Nights"
                value={room.totalNights || 0}
              />
              <SimpleLabelValue
                label="Early Check-in"
                value={room.earlyCheckIn ? "Yes" : "No"}
              />
              <SimpleLabelValue
                label="Late Check-out"
                value={room.lateCheckOut ? "Yes" : "No"}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="actions-section">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#c62828",
            marginTop: "20px",
            color: "#fff",
            width: "100%",
            "&:hover": {
              backgroundColor: "#e63946",
              color: "#fff",
            },
          }}
          className="next-button"
          onClick={submitReservation}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default InvoiceForm;
