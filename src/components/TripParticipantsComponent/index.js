import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import "./style.scss";

const TripParticipantsComponent = () => {
  const [participantsData, setParticipantsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedParticipantDetails, setSelectedParticipantDetails] =
    useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");

  const TABLE_HEADERS = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Nationality", key: "nationality" },
    { label: "Phone", key: "phone_number" },
    { label: "WhatsApp", key: "whatsapp_number" },
    { label: "Accommodation", key: "accommodation_stars" },
    { label: "Total Price", key: "total_price" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions" },
  ];

  const fetchParticipants = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/trip-participants/all`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          const formattedParticipants = [];

          data.participants.forEach((entry) => {
            // Check if the main participant already exists in the formattedParticipants array
            const existingParticipant = formattedParticipants.find(
              (participant) =>
                participant.mainParticipant.id === entry.mainParticipant.id
            );

            if (existingParticipant) {
              // Merge companions into the existing participant object
              existingParticipant.companions = [
                ...existingParticipant.companions,
                ...entry.companions,
              ];
            } else {
              // Add the new main participant and their companions
              formattedParticipants.push({
                id: entry.mainParticipant.id,
                name: entry.mainParticipant.name,
                nationality: entry.mainParticipant.nationality,
                phone_number: entry.mainParticipant.phone_number,
                whatsapp_number: entry.mainParticipant.whatsapp_number,
                accommodation_stars: entry.mainParticipant.accommodation_stars,
                total_price: entry.mainParticipant.invoice.total_price,
                status: entry.mainParticipant.invoice.status,
                mainParticipant: entry.mainParticipant,
                companions: entry.companions,
              });
            }
          });

          setParticipantsData(formattedParticipants);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        withToast: false,
      });
    } catch (error) {
      // Handle error if necessary
    }
  };

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
    name: participant.name,
    nationality: participant.nationality,
    phone_number: participant.phone_number,
    whatsapp_number: participant.whatsapp_number,
    accommodation_stars: participant.accommodation_stars,
    total_price: participant.total_price,
    status: participant.status,
    actions: (
      <button
        className="view-details-button"
        onClick={() => handleViewDetails(participant)}
      >
        View Details
      </button>
    ),
  }));

  return (
    <Fragment>
      <div className="participants-component">
        <div className="table-container">
          <div className="table-wrapper">
            <Table headers={TABLE_HEADERS} data={tableData} />
          </div>
        </div>

        <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
          <div className="participant-details">
            <div className="participant-details-all">
              <div className="head">Participant & Companions Details</div>
              {selectedParticipantDetails ? (
                <Fragment>
                  <div className="head2">Main Participant Details</div>
                  <div className="details-list">
                    <SimpleLabelValue
                      label="Name"
                      value={
                        selectedParticipantDetails.mainParticipant.name || "-"
                      }
                    />
                    <SimpleLabelValue
                      label="Nationality"
                      value={
                        selectedParticipantDetails.mainParticipant
                          .nationality || "-"
                      }
                    />
                    <SimpleLabelValue
                      label="Phone Number"
                      value={
                        selectedParticipantDetails.mainParticipant
                          .phone_number || "-"
                      }
                    />
                    <SimpleLabelValue
                      label="WhatsApp Number"
                      value={
                        selectedParticipantDetails.mainParticipant
                          .whatsapp_number || "-"
                      }
                    />
                    <SimpleLabelValue
                      label="Accommodation Stars"
                      value={
                        selectedParticipantDetails.mainParticipant
                          .accommodation_stars || "-"
                      }
                    />
                    <SimpleLabelValue
                      label="Total Price"
                      value={`$${selectedParticipantDetails.mainParticipant.invoice.total_price || "-"}`}
                    />
                    <SimpleLabelValue
                      label="Status"
                      value={
                        selectedParticipantDetails.mainParticipant.invoice
                          .status || "-"
                      }
                    />
                  </div>

                  {selectedParticipantDetails.companions.length > 0 ? (
                    selectedParticipantDetails.companions.map(
                      (companion, index) => (
                        <Fragment>
                          <div className="head2">Companions {index +1}</div>
                          <div key={index} className="details-list">
                            <SimpleLabelValue
                              label="Name"
                              value={companion.name || "-"}
                            />
                            <SimpleLabelValue
                              label="Nationality"
                              value={companion.nationality || "-"}
                            />
                            <SimpleLabelValue
                              label="Phone Number"
                              value={companion.phone_number || "-"}
                            />
                            <SimpleLabelValue
                              label="WhatsApp Number"
                              value={companion.whatsapp_number || "-"}
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
                              label="Total Price"
                              value={`${companion?.invoice?.total_price || "-"}`}
                            />
                            <SimpleLabelValue
                              label="Status"
                              value={companion?.invoice?.status || "-"}
                            />
                          </div>{" "}
                        </Fragment>
                      )
                    )
                  ) : (
                    <p>No companions available.</p>
                  )}
                </Fragment>
              ) : (
                <p>No participant details available.</p>
              )}
            </div>
          </div>
        </MySideDrawer>

        <div className="pagination-container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default TripParticipantsComponent;
