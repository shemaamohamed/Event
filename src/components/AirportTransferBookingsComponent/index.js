import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";

const AirportTransferBookingsComponent = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");

  const TABLE_HEADERS = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Trip Type", key: "trip_type" },
    { label: "Arrival Date", key: "arrival_date" },
    { label: "Departure Date", key: "departure_date" },
    { label: "Flight Number", key: "flight_number" },
    { label: "Companion Name", key: "companion_name" },
    { label: "Actions", key: "actions" },
  ];

  const DEFAULT_ERROR_MESSAGE = "Failed to fetch bookings.";

  // Fetch bookings data
  const fetchBookings = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/airport-transfer-bookings/all`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          setBookingsData(data.bookings || []);
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
    fetchBookings(page);
  };

  const handleViewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const tableData = bookingsData.map((booking) => ({
    id: booking.id,
    name: booking.user?.name,
    trip_type: booking.trip_type,
    arrival_date: new Date(booking.arrival_date).toLocaleString(),
    departure_date: new Date(booking.departure_date).toLocaleString(),
    flight_number: booking.flight_number,
    companion_name: booking.companion_name,
    actions: (
      <button
        className="view-details-button"
        onClick={() => handleViewBookingDetails(booking)}
      >
        View Details
      </button>
    ),
  }));

  return (
    <Fragment>
      <div className="airport-transfer-bookings-component">
        <div className="table-container">
          <div className="table-wrapper">
            <Table headers={TABLE_HEADERS} data={tableData} />
          </div>
        </div>

        <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
          <div className="booking-details">
            <div className="head">Booking Details</div>
            {selectedBooking ? (
              <div className="details-list">
                <SimpleLabelValue
                  label="Trip Type"
                  value={selectedBooking.trip_type || "-"}
                />
                <SimpleLabelValue
                  label="Arrival Date"
                  value={
                    new Date(selectedBooking.arrival_date).toLocaleString() ||
                    "-"
                  }
                />
                <SimpleLabelValue
                  label="Arrival Time"
                  value={selectedBooking.arrival_time || "-"}
                />
                <SimpleLabelValue
                  label="Departure Date"
                  value={
                    new Date(selectedBooking.departure_date).toLocaleString() ||
                    "-"
                  }
                />
                <SimpleLabelValue
                  label="Departure Time"
                  value={selectedBooking.departure_time || "-"}
                />
                <SimpleLabelValue
                  label="Flight Number"
                  value={selectedBooking.flight_number || "-"}
                />
                <SimpleLabelValue
                  label="Companion Name"
                  value={selectedBooking.companion_name || "-"}
                />
                <SimpleLabelValue
                  label="User Email"
                  value={selectedBooking.user?.email || "-"}
                />
                <SimpleLabelValue
                  label="User Phone"
                  value={selectedBooking.user?.phone_number || "-"}
                />
                <SimpleLabelValue
                  label="Conference Title"
                  value={selectedBooking.conference?.title || "-"}
                />
           
              </div>
            ) : (
              <p className="no-messgae">No booking details available.</p>
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

export default AirportTransferBookingsComponent;
