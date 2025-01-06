

import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";

const SponsorsComponent = () => {
  const [sponsorsData, setSponsorsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");

  const TABLE_HEADERS = [
    { label: "ID", key: "id" },
    { label: "Company Name", key: "company_name" },
    { label: "Contact Person", key: "contact_person" },
    { label: "Status", key: "status" },
    { label: "Created At", key: "created_at" },
    { label: "Actions", key: "actions" },
  ];

  const DEFAULT_ERROR_MESSAGE = "Failed to fetch sponsors.";

  // Fetch sponsors data
  const fetchSponsors = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/sponsor/all`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          setSponsorsData(data.sponsors || []);
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
    fetchSponsors(page);
  };

  const handleViewSponsorDetails = (sponsor) => {
    setSelectedSponsor(sponsor);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const tableData = sponsorsData.map((sponsor) => ({
    id: sponsor.id,
    company_name: sponsor.company_name,
    contact_person: sponsor.contact_person,
    status: sponsor.status,
    created_at: sponsor.created_at,
    actions: (
      <button
        className="view-details-button"
        onClick={() => handleViewSponsorDetails(sponsor)}
      >
        View Details
      </button>
    ),
  }));

  return (
    <Fragment>
      <div className="sponsors-component">
        <div className="table-container">
          <div className="table-wrapper">
            <Table headers={TABLE_HEADERS} data={tableData} />
          </div>
        </div>

        <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setDrawerOpen}>
          <div className="sponsor-details">
            <div className="head">Sponsor Details</div>
            {selectedSponsor ? (
              <div className="details-list">
                <SimpleLabelValue
                  label="Company Name"
                  value={selectedSponsor.company_name || "-"}
                />
                <SimpleLabelValue
                  label="Contact Person"
                  value={selectedSponsor.contact_person || "-"}
                />
                <SimpleLabelValue
                  label="Email"
                  value={selectedSponsor.user.email || "-"}
                />
                <SimpleLabelValue
                  label="Phone Number"
                  value={selectedSponsor.user.phone_number || "-"}
                />
                <SimpleLabelValue
                  label="WhatsApp Number"
                  value={selectedSponsor.user.whatsapp_number || "-"}
                />
                <SimpleLabelValue
                  label="Address"
                  value={selectedSponsor.company_address || "-"}
                />
                <SimpleLabelValue
                  label="Status"
                  value={selectedSponsor.status || "-"}
                />
                <SimpleLabelValue
                  label="Registration Type"
                  value={selectedSponsor.user.registration_type || "-"}
                />
              </div>
            ) : (
              <p>No sponsor details available.</p>
            )}

            <div className="head">Invoices</div>

            {selectedSponsor?.sponsor_invoices &&
            selectedSponsor?.sponsor_invoices.length > 0 ? (
              selectedSponsor?.sponsor_invoices?.map((invoice, index) => (
                <div key={index} className="details-list">
                  <SimpleLabelValue label="Invoice ID" value={invoice.id} />
                  <SimpleLabelValue
                    label="Total Amount"
                    value={`$${invoice.total_amount}`}
                  />
                  <SimpleLabelValue
                    label="Conference ID"
                    value={invoice.conference_id}
                  />
                  <SimpleLabelValue
                    label="Created At"
                    value={new Date(invoice.created_at).toLocaleString()}
                  />
                </div>
              ))
            ) : (
              <p className="no-messgae">No invoices available for this sponsor.</p>
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

export default SponsorsComponent;
