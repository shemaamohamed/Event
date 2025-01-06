import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";
import moment from "moment";

const TripParticipantsComponentGroup = () => {
  const [participantsData, setParticipantsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");

  const TABLE_HEADERS = [
    { label: "Name", key: "user_name" },
    { label: "Email", key: "user_email" },
    { label: "Trip Name", key: "trip_name" },
    { label: "Selected Date", key: "selected_date" },
    { label: "Companion Count", key: "companions_count" },
    { label: "Total Price", key: "total_price" },
    { label: "Created At", key: "created_at" },
    { label: "Actions", key: "actions" },
  ];

  const DEFAULT_ERROR_MESSAGE = "Failed to fetch participants.";

  // Fetch participants data
  const fetchParticipants = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/trip-participants/group/all`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          setParticipantsData(data.participants || []);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        onError: (error) => {
          setErrorMsg(error?.message || DEFAULT_ERROR_MESSAGE);
          toast.error(error?.message || DEFAULT_ERROR_MESSAGE);
        },
        withToast: true,
      });
    } catch (error) {
      setErrorMsg(DEFAULT_ERROR_MESSAGE);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  const handlePageChange = (page) => {
    fetchParticipants(page);
  };

  const handleViewDetails = (participant) => {
    setSelectedParticipant(participant);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const tableData = participantsData.map((participant) => ({
    trip_name: participant.trip_name,
    trip_type: participant.trip_type,
    id: participant.id,
    trip_id: participant.trip_id,
    user_name: participant.user_name,
    user_email: participant.user_email,
    selected_date: participant.selected_date,
    companions_count: participant.companions_count,
    total_price: participant.total_price,
    created_at: moment(participant.created_at).format("DD-MM-YYYY HH:MM"),
    updated_at: participant.updated_at,
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
            <div className="head">Trip Details</div>
            <div className="details-list2">
              {selectedParticipant ? (
                <Fragment>
                  <div className="head2">Participant Details</div>

                  <div className="details-list">
                    <SimpleLabelValue
                      label="Trip ID"
                      value={selectedParticipant.trip_id || "-"}
                    />
                    <SimpleLabelValue
                      label="Trip Name"
                      value={selectedParticipant.trip_name || "-"}
                    />
                    <SimpleLabelValue
                      label="Trip Type"
                      value={selectedParticipant.trip_type || "-"}
                    />
                    <SimpleLabelValue
                      label="Selected Date"
                      value={
                        moment(selectedParticipant.selected_date).format(
                          "DD-MM-YYYY"
                        ) || "-"
                      }
                    />
                    <SimpleLabelValue
                      label="Companion Count"
                      value={selectedParticipant.companions_count || "-"}
                    />
                    <SimpleLabelValue
                      label="Total Price"
                      value={`$${selectedParticipant.total_price || "-"}`}
                    />
                    <SimpleLabelValue
                      label="Created At"
                      value={
                        moment(selectedParticipant.created_at).format(
                          "DD-MM-YYYY"
                        ) || "-"
                      }
                    />
                  </div>
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

export default TripParticipantsComponentGroup;
