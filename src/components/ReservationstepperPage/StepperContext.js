// StepperContext.js
import React, { useState, createContext, useContext, useEffect } from "react";
import httpService from "../../common/httpService";
import { useAuth } from "../../common/AuthContext";
import { useParams } from "react-router-dom";

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const { mode } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [invoice, setInvoice] = useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { myConferenceId } = useAuth();
  // New states
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [lateCheckOut, setLateCheckOut] = useState(false);
  const [earlyCheckIn, setEarlyCheckIn] = useState(false);
  const [totalNights, setTotalNights] = useState(1);
  const [roomType, setRoomType] = useState();

  // room states
  const initialValue = {
    roomType: "",
    occupantName: "",
    specialRequests: "",
    checkInDate: "",
    checkOutDate: "",
    lateCheckOut: false,
    earlyCheckIn: false,
    totalNights: "",
  };

  const [rooms, setRooms] = useState([initialValue]);

  //invoce state
  const [mainRoom, setMainRoom] = useState(null);
  const [otherRooms, setOtherRooms] = useState([]);
  const [reservationDetails, setReservationDetails] = useState(null); // State for invoice details
  //
  const [reservationId, setReservationId] = useState(0);
  const [mainRoomId, setMainRoomId] = useState(0);

  const completeStep = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps((prev) => [...prev, stepIndex]);
    }
    setCurrentStep(stepIndex + 1);
  };

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

      const responseData = response;
      console.log(response);

      if (
        responseData?.status === "success" &&
        responseData?.data?.length > 0
      ) {
        const reservation = responseData.data?.[0]; // Assuming a single reservation is fetched
        setReservationId(reservation?.id);
        setReservationDetails({
          id: reservation.id,
          userId: reservation.user_id,
          roomCount: reservation.room_count,
          companionsCount: reservation.companions_count,
          updateDeadline: reservation.update_deadline,
          conferenceId: reservation.conference_id,
        });

        const roomsData = reservation.rooms || [];
        const speakerRoom = reservation.rooms?.[0];
        setMainRoomId(speakerRoom?.id);
        console.log(speakerRoom?.id);

        setCheckInDate(speakerRoom?.check_in_date);
        setCheckOutDate(speakerRoom?.check_out_date);
        setLateCheckOut(speakerRoom?.late_check_out);
        setEarlyCheckIn(speakerRoom?.early_check_in);
        setTotalNights(speakerRoom?.total_nights);
        setRoomType({
          value: speakerRoom?.room_type,
          label: speakerRoom?.room_type,
        });

        setRooms(
          roomsData.slice(1).map((room) => {
            console.log(room?.id); // This is now inside the map function correctly
            return {
              id: room?.id,
              roomType: {
                value: room?.room_type,
                label: room?.room_type,
              },
              occupantName: room.occupant_name || "",
              specialRequests: room.special_requests || "",
              checkInDate: room.check_in_date,
              checkOutDate: room.check_out_date,
              lateCheckOut: !!room.late_check_out,
              earlyCheckIn: !!room.early_check_in,
              totalNights: room.total_nights,
            };
          })
        );
      }
    } catch (error) {
      console.error("Fetch Reservations Error:", error);
    }
  };

  useEffect(() => {
    if (mode == "edit") {
      fetchReservations();
    }
  }, [myConferenceId]);

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        completedSteps,
        completeStep,
        invoice,
        setInvoice,
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        lateCheckOut,
        setLateCheckOut,
        earlyCheckIn,
        setEarlyCheckIn,
        totalNights,
        setTotalNights,
        roomType,
        setRoomType,
        rooms,
        setRooms,
        mainRoom,
        setMainRoom,
        otherRooms,
        setOtherRooms,
        reservationDetails,
        setReservationDetails,
        reservationId,
        mainRoomId,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

// Custom hook to use the StepperContext
export const useStepper = () => useContext(StepperContext);
