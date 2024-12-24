import React, { useState } from "react";
import Checkbox from "../../../CoreComponent/Checkbox";
import { useParams } from "react-router-dom";
import httpService from "../../../../src/common/httpService";
import { toast } from "react-toastify";
import "./style.scss";
import Input from "../../../CoreComponent/Input";
import Select from "../../../CoreComponent/Select";

const EditSpeakerData = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const { conferenceId, userId } = useParams();
  const [isOnlineApproved, setIsOnlineApproved] = useState(true);
  const [ticketStatus, setTicketStatus] = useState("1");
  const [dinnerInvitation, setDinnerInvitation] = useState(true);
  const [airportPickup, setAirportPickup] = useState(true);
  const [freeTrip, setFreeTrip] = useState(true);
  const [isVisaPaymentRequired, setIsVisaPaymentRequired] = useState(false);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [roomType, setRoomType] = useState("");
  // const [onlineLink, setOnlineLink] = useState(""); // حالة جديدة لتتبع الرابط

  const options = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "triple", label: "Triple" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const getAuthToken = () => localStorage.getItem("token");

    try {
      await httpService({
        method: "POST",
        url: `${BaseUrl}/admin/speakers/${userId}/${conferenceId}`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,
        data: {
          nights_covered: numberOfNights,
          room_type: roomType?.value,
          is_online_approved: isOnlineApproved ? 1 : 0,
          ticket_status: ticketStatus,
          dinner_invitation: dinnerInvitation ? 1 : 0,
          airport_pickup: airportPickup ? 1 : 0,
          free_trip: freeTrip ? 1 : 0,
          is_certificate_active: 0,
          is_visa_payment_required: isVisaPaymentRequired ? 1 : 0,

        },
        withToast: true,
        onError: (error) => {
          toast.error("Failed to submit the form: " + error);
        },
        onSuccess: (response) => {
          toast.success("Profile Uploaded Successfully");
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-speaker-form">
      <h2 className="form-title">Edit Speaker Data</h2>
      <div className="checkbox-group">
        <Input
          label="Number of Nights Covered"
          placeholder="Enter single base price"
          inputValue={numberOfNights}
          setInputValue={setNumberOfNights}
          required={true}
        />
        <Select
          options={options}
          value={roomType}
          setValue={setRoomType}
          label="Room Type"
          placeholder="Select..."
        />

        <Checkbox
          label="Is Online Approved?"
          checkboxValue={isOnlineApproved}
          setCheckboxValue={setIsOnlineApproved}
          className="form-checkbox"
        />

        <Checkbox
          label="Ticket Status (Active)"
          checkboxValue={ticketStatus}
          setCheckboxValue={setTicketStatus}
          className="form-checkbox"
        />

        <Checkbox
          label="Dinner Invitation?"
          checkboxValue={dinnerInvitation}
          setCheckboxValue={setDinnerInvitation}
          className="form-checkbox"
        />

        <Checkbox
          label="Airport Pickup?"
          checkboxValue={airportPickup}
          setCheckboxValue={setAirportPickup}
          className="form-checkbox"
        />

        <Checkbox
          label="Free Trip?"
          checkboxValue={freeTrip}
          setCheckboxValue={setFreeTrip}
          className="form-checkbox"
        />

        {/* <Checkbox
          label="Is Certificate Active?"
          checkboxValue={isCertificateActive}
          setCheckboxValue={setIsCertificateActive}
          className="form-checkbox"
        /> */}

        <Checkbox
          label="Is Visa Payment Required?"
          checkboxValue={isVisaPaymentRequired}
          setCheckboxValue={setIsVisaPaymentRequired}
          className="form-checkbox"
        />
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default EditSpeakerData;
