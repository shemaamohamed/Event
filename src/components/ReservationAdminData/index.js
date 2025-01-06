import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";

const ReservationsComponent = () => {
  const [reservationsData, setReservationsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");

  const TABLE_HEADERS = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Registration Type", key: "registration_type" },
    { label: "Room Count", key: "room_count" },
    { label: "Companions Count", key: "companions_count" },
    { label: "Update Deadline", key: "update_deadline" },
    { label: "Created At", key: "created_at" },
    { label: "Actions", key: "actions" },
  ];

  const DEFAULT_ERROR_MESSAGE = "Failed to fetch reservations.";
  // Fetch reservations data
  const fetchReservations = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/reservation/room`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          setReservationsData(data.reservations || []);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        onError: (error) => {
          setErrorMsg(error?.message || DEFAULT_ERROR_MESSAGE);
          toast.error(error?.message || DEFAULT_ERROR_MESSAGE);
        },
        withToast: false,
      });
    } catch (error) {
      setErrorMsg(DEFAULT_ERROR_MESSAGE);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  const handlePageChange = (page) => {
    fetchReservations(page);
  };

  const handleViewRooms = (rooms) => {
    setSelectedRooms(rooms);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const tableData = reservationsData.map((reservation) => ({
    id: reservation.id,
    user_id: reservation.user_id,
    name: reservation.user.name,
    email: reservation.user.email,
    registration_type: reservation.user.registration_type,
    room_count: reservation.room_count,
    companions_count: reservation.companions_count,
    update_deadline: reservation.update_deadline,
    created_at: reservation.created_at,
    actions: (
      <button
        className="view-rooms-button"
        onClick={() => handleViewRooms(reservation.rooms)}
      >
        View Rooms
      </button>
    ),
  }));

  return (
    <Fragment>
      <div className="reservations-component">
        <div className="table-container">
          <div className="table-wrapper">
            <Table headers={TABLE_HEADERS} data={tableData} />
          </div>
        </div>

        <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
          <div className="rooms-details">
            <div className="head">Room Details</div>
            {selectedRooms.length > 0 ? (
              <div className="rooms-list">
                {selectedRooms.map((room, index) => (
                  <div key={room.id}>
                    <div className="head2">Room {index + 1}</div>
                    <div className="room-details">
                      <SimpleLabelValue
                        label="Room Type"
                        value={room.room_type || "-"}
                      />
                      <SimpleLabelValue
                        label="Occupant Name"
                        value={room.occupant_name || "-"}
                      />
                      <SimpleLabelValue
                        label="Check-In"
                        value={room.check_in_date || "-"}
                      />
                      <SimpleLabelValue
                        label="Check-Out"
                        value={room.check_out_date || "-"}
                      />
                      <SimpleLabelValue
                        label="Total Nights"
                        value={room.total_nights || "-"}
                      />
                    </div>{" "}
                    <div className="head2">Invoices</div>
                    <div className="room-details">
                      {room.reservation_invoices &&
                        room.reservation_invoices.length > 0 &&
                        room.reservation_invoices.map((invoice) => (
                          <>
                            <SimpleLabelValue
                              label="Invoice ID"
                              value={invoice.id || "-"}
                            />
                            <SimpleLabelValue
                              label="Base Price"
                              value={invoice.price || "-"}
                            />
                            <SimpleLabelValue
                              label="Additional Price"
                              value={invoice.additional_price || "-"}
                            />
                            <SimpleLabelValue
                              label="Total Price"
                              value={invoice.total || "-"}
                            />
                            <SimpleLabelValue
                              label="Status"
                              value={invoice.status || "-"}
                            />
                            <SimpleLabelValue
                              label="Confirmation PDF"
                              value={
                                invoice.confirmationPDF ? (
                                  <a
                                    href={invoice.confirmationPDF}
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
                          </>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No rooms available for this reservation.</p>
            )}
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

export default ReservationsComponent;
