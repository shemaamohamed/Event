import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import "./style.scss";
import Checkbox from "../../CoreComponent/Checkbox";
import httpService from "../../common/httpService";
import Select from "../../CoreComponent/Select";
import Input from "../../CoreComponent/Input";
const EditAbstractData = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const {userId,conferenceId}=useParams()

  const statusOptions = [
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
  ]
//   const { conferenceId, userId } = useParams();

  const [specificFlightTime, setSpecificFlightTime] = useState(false);
  const [isOnlineApproved, setIsOnlineApproved] = useState(true);
  const [ticketStatus, setTicketStatus] = useState("1");
  const [dinnerInvitation, setDinnerInvitation] = useState(true);
  const [airportPickup, setAirportPickup] = useState(true);
  const [freeTrip, setFreeTrip] = useState(true);
  const [isCertificateActive, setIsCertificateActive] = useState(true);
  const [isVisaPaymentRequired, setIsVisaPaymentRequired] = useState(false);
  const [paperStatus, setPaperStatus] = useState("under review"); // الحالة الجديدة
  const [roomType, setRoomType] = useState("");
  // const [onlineLink, setOnlineLink] = useState(""); // حالة جديدة لتتبع الرابط
  const [numberOfNights, setNumberOfNights] = useState(0);

  const options = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "triple", label: "Triple" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const getAuthToken = () => localStorage.getItem("token");
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    try {
      await httpService({
        method: "PUT",
        url: `${BaseUrl}/abstract/con/${userId}/user/${conferenceId}`,
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
          is_certificate_active: isCertificateActive ? 1 : 0,
          is_visa_payment_required: isVisaPaymentRequired ? 1 : 0, 
          paper_status: paperStatus.value, // إضافة status
          // link: isOnlineApproved ? onlineLink : null, // إرسال الرابط فقط إذا تمت الموافقة

        },
        withToast: true,
        // onError: (error) => {
        //   toast.succeee("Failed to submit the form: " + error);
        // },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-speaker-form">
      <h2 className="form-title">Edit Speaker Data</h2>
      <div className="checkbox-group">
        {/* <Checkbox
          label="Do you have specific flight time?"
          checkboxValue={specificFlightTime}
          setCheckboxValue={setSpecificFlightTime}
          className="form-checkbox"
        /> */}
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
 {/* {isOnlineApproved && <div>You will be provided with the Zoom link for the conference or your session one day prior to the scheduled date to ensure your participation</div>} */}
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

        <Checkbox
          label="Is Certificate Active?"
          checkboxValue={isCertificateActive}
          setCheckboxValue={setIsCertificateActive}
          className="form-checkbox"
        />

        <Checkbox
          label="Is Visa Payment Required?"
          checkboxValue={isVisaPaymentRequired}
          setCheckboxValue={setIsVisaPaymentRequired}
          className="form-checkbox"
        />
      </div>

      <Select
      
      
        options={statusOptions}
        value={paperStatus}
        setValue={setPaperStatus}
        label="Paper Status"
      />
  
          {/* <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
    */}
    
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default EditAbstractData;
