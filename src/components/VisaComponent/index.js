import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const VisasComponent = () => {
  const [visasData, setVisasData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");
  const navigate = useNavigate();
  const TABLE_HEADERS = [
    { label: "ID", key: "id" },
    { label: "User Name", key: "user_name" },
    { label: "Arrival Date", key: "arrival_date" },
    { label: "Departure Date", key: "departure_date" },
    { label: "Visa Cost", key: "visa_cost" },
    { label: "Status", key: "status" },
    { label: "Created At", key: "created_at" },
    { label: "Actions", key: "actions" },
  ];

  const DEFAULT_ERROR_MESSAGE = "Failed to fetch visas.";

  // Fetch visas data
  const fetchVisas = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/all/visas`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          setVisasData(data.visas || []);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        onError: (error) => {
        },
        withToast: false,
      });
    } catch (error) {
    }
  };

  const handlePageChange = (page) => {
    fetchVisas(page);
  };

  const handleViewVisaDetails = (visa) => {
    setSelectedVisa(visa);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchVisas();
  }, []);

  const tableData = visasData.map((visa) => ({
    id: visa.id,
    user_name: visa.user_name,
    user_id: visa.user_id,
    arrival_date: visa.arrival_date,
    departure_date: visa.departure_date,
    visa_cost: `$${visa.visa_cost}`,
    status: visa.status,
    created_at: new Date(visa.created_at).toLocaleString(),
    actions: (
      <div className="all-button">
        <button
          className="view-details-button"
          onClick={() => handleViewVisaDetails(visa)}
        >
          View Details
        </button>
        {visa.status === "pending" && (
          <button
            className="view-details-button"
            onClick={() => {
              navigate(`/admin/visa2/${visa?.user_id}`);
            }}
          >
            Submit
          </button>
        )}
      </div>
    ),
  }));

  return (
    <Fragment>
      <div className="visas-component">
        <div className="table-container">
          <div className="table-wrapper">
            <Table headers={TABLE_HEADERS} data={tableData} />
          </div>
        </div>

        <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
          <div className="visa-details">
            <div className="head">Visa Details</div>
            {selectedVisa ? (
              <div className="details-list">
                <SimpleLabelValue
                  label="User ID"
                  value={selectedVisa.user_id || "-"}
                />
                <SimpleLabelValue
                  label="Arrival Date"
                  value={selectedVisa.arrival_date || "-"}
                />
                <SimpleLabelValue
                  label="Departure Date"
                  value={selectedVisa.departure_date || "-"}
                />
                <SimpleLabelValue
                  label="Visa Cost"
                  value={`$${selectedVisa.visa_cost || "-"}`}
                />
                <SimpleLabelValue
                  label="Payment Required"
                  value={selectedVisa.payment_required ? "Yes" : "No"}
                />
                <SimpleLabelValue
                  label="Status"
                  value={selectedVisa.status || "-"}
                />
                <SimpleLabelValue
                  label="Payment Status"
                  value={selectedVisa.payment_status || "-"}
                />
                <SimpleLabelValue
                  label="Created At"
                  value={new Date(selectedVisa.created_at).toLocaleString()}
                />
              </div>
            ) : (
              <p>No visa details available.</p>
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

export default VisasComponent;
