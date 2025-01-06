import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import "./style.scss";
import Invoce from "./invoice";
import { useNavigate } from "react-router-dom";

const TripParticipantsForUser = () => {
  const [participantsData, setParticipantsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isInvoiveOpen, setInvoiveOpen] = useState(false);
  const [participantIds, setparticipantIds] = useState([]);
  const [selectedParticipantDetails, setSelectedParticipantDetails] =
    useState(null);
const navigate = useNavigate()
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");

  const TABLE_HEADERS = [
    { label: "ID", key: "id" },
    { label: "Trip Name", key: "tripName" },
    { label: "Description", key: "description" },
    { label: "Price Per Person", key: "price_per_person" },
    { label: "Location", key: "location" },
    { label: "Duration", key: "duration" },
    { label: "Price for Two", key: "price_for_two" },
    { label: "Companions", key: "companions" },
    { label: "Actions", key: "actions" },
  ];

  const fetchParticipants = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/user/trip`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          const formattedParticipants = data.trips.map((entry) => ({
            id: entry.trip.id,
            tripName: entry.trip.name,
            description: entry.trip.description,
            price_per_person: entry.trip.price_per_person,
            location: entry.trip.location,
            duration: entry.trip.duration,
            price_for_two: entry.trip.price_for_two,
            available_dates: entry.trip.available_dates,
            companions: entry.companions,
            mainUser: entry.mainUser,
          }));
          setParticipantsData(formattedParticipants);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        withToast: false,
      });
    } catch (error) {
      setErrorMsg("Error fetching data.");
    }
  };
  function getParticipantIds(data) {
    console.log(data);

    // Check if mainUser and companions are arrays before mapping
    const mainUserIds = Array.isArray(data.mainUser)
      ? data.mainUser.map((user) => user.id)
      : [];
    const companionIds = Array.isArray(data.companions)
      ? data.companions.map((companion) => companion.id)
      : [];

    // Combine the IDs and remove duplicates using a Set
    const participantIds = [...mainUserIds, ...companionIds];

    return { participant_ids: participantIds };
  }

  const handlePageChange = (page) => {
    fetchParticipants(page);
  };

  const handleViewDetails = (participant) => {
    setSelectedParticipantDetails(participant);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const tableData = participantsData.map((participant) => ({
    id: participant.id,
    tripName: participant.tripName,
    description: participant.description,
    price_per_person: participant.price_per_person,
    location: participant.location,
    duration: participant.duration,
    price_for_two: participant.price_for_two,
    available_dates: participant.available_dates,
    companions: participant.companions.length,
    mainUser: participant.mainUser,
    actions: (
      <div>
        <button
          className="view-details-button"
          onClick={() => {
            console.log(getParticipantIds(participant));

            handleViewDetails(participant);
          }}
        >
          View Details
        </button>
        {/* <button
          className="view-details-button"
          onClick={() => {
            setparticipantIds(getParticipantIds(participant));
            setInvoiveOpen(true)
          }}
        >
          View Invoice
        </button> */}
      </div>
    ),
  }));

  return (
    <Fragment>
      <div className="participants-component2">
        <div className="table-container">
          <Table headers={TABLE_HEADERS} data={tableData} />
        </div>

        <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
          {selectedParticipantDetails ? (
            <div className="participant-details">
              <div className="head">Trip Details</div>
              <div className="details-list">
                <SimpleLabelValue
                  label="Name"
                  value={selectedParticipantDetails.tripName || "-"}
                />
                <SimpleLabelValue
                  label="Description"
                  value={selectedParticipantDetails.description || "-"}
                />
                <SimpleLabelValue
                  label="Location"
                  value={selectedParticipantDetails.location || "-"}
                />
                <SimpleLabelValue
                  label="Price Per Person"
                  value={`$${selectedParticipantDetails.price_per_person}`}
                />
                <SimpleLabelValue
                  label="Duration"
                  value={selectedParticipantDetails.duration || "-"}
                />
                <SimpleLabelValue
                  label="Price for Two"
                  value={`$${selectedParticipantDetails.price_for_two}`}
                />
                <SimpleLabelValue
                  label="Price for Three or More"
                  value={`$${selectedParticipantDetails?.price_for_three_or_more}`}
                />
                <SimpleLabelValue
                  label="Available Dates"
                  value={selectedParticipantDetails?.available_dates
                    ?.split(",")
                    ?.map((date, index) => (
                      <div key={index}>{date}</div>
                    ))}
                />
              </div>

              <div className="head">You</div>

              {selectedParticipantDetails?.mainUser?.map((user, index) => (
                <Fragment>
                  <div className="head2">Main User </div>

                  <div key={index} className="details-list">
                    <SimpleLabelValue label="Name" value={user.name || "-"} />
                    <SimpleLabelValue
                      label="Phone"
                      value={user.phone_number || "-"}
                    />
                    <SimpleLabelValue
                      label="WhatsApp"
                      value={user.whatsapp_number || "-"}
                    />
                    <SimpleLabelValue
                      label="Nationality"
                      value={user.nationality || "-"}
                    />
                    <SimpleLabelValue
                      label="Check-In Date"
                      value={user.check_in_date || "-"}
                    />
                    <SimpleLabelValue
                      label="Check-Out Date"
                      value={user.check_out_date || "-"}
                    />
                    <SimpleLabelValue
                      label="Nights Count"
                      value={user.nights_count || "-"}
                    />
                    <SimpleLabelValue
                      label="Accommodation Stars"
                      value={`${user.accommodation_stars} stars`}
                    />
                  </div>
                  <burtton className="view-invoice-button" onClick={()=>{
                    navigate((`/invoice/trip/${user?.id}/${user?.name}`))
                  }}>
                    View Invoice
                  </burtton>
                </Fragment>
              ))}
              <div className="head">Companions</div>

              {selectedParticipantDetails.companions.map((companion, index) => (
                <Fragment>
                  <div className="head2">Companions {index + 1}</div>
                  <div key={index} className="details-list">
                    <SimpleLabelValue
                      label="Name"
                      value={companion.name || "-"}
                    />
                    <SimpleLabelValue
                      label="Phone"
                      value={companion.phone_number || "-"}
                    />
                    <SimpleLabelValue
                      label="WhatsApp"
                      value={companion.whatsapp_number || "-"}
                    />
                    <SimpleLabelValue
                      label="Nationality"
                      value={companion.nationality || "-"}
                    />
                    <SimpleLabelValue
                      label="Check-In Date"
                      value={companion.check_in_date || "-"}
                    />
                    <SimpleLabelValue
                      label="Check-Out Date"
                      value={companion.check_out_date || "-"}
                    />
                    <SimpleLabelValue
                      label="Nights Count"
                      value={companion.nights_count || "-"}
                    />
                    <SimpleLabelValue
                      label="Accommodation Stars"
                      value={`${companion?.accommodation_stars} stars`}
                    />
                    <SimpleLabelValue
                      label="Total Price"
                      value={`${companion?.invoice?.total_price || "-"}`}
                    />
                  </div>
                  <burtton className="view-invoice-button" onClick={()=>{
                    navigate((`/invoice/trip/${companion?.id}/${companion?.name}`))
                  }}>
                    View Invoice
                  </burtton>
                </Fragment>
              ))}
            </div>
          ) : (
            <p>No participant details available.</p>
          )}
        </MySideDrawer>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Invoce
        isInvoiveOpen={isInvoiveOpen}
        setInvoiveOpen={setInvoiveOpen}
        participantId={participantIds}
      />
    </Fragment>
  );
};

export default TripParticipantsForUser;
