import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import "./style.scss";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper";
import SimpleLabelValue from "../../SimpleLabelValue";
import httpService from "../../../services/httpService"; // Adjust if needed

const ViewInvoice = ({ data, setOpen }) => {
  const [invoice, setInvoice] = useState(null);
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const getAuthToken = () => localStorage.getItem("token");
  const navigate = useNavigate();

  const flightId = data?.flight_id;

  const getInvoiceById = async () => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/invoice-flight/${flightId}`, // Dynamically use flightId
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,
      });

      setInvoice(response?.invoice); // Assuming the response has `invoice` as the key
    } catch (error) {
      console.error("Error fetching invoice", error);
    }
  };

  useEffect(() => {
    if (flightId) {
      getInvoiceById();
    }
  }, [flightId]);

  return (
    <CustomFormWrapper
      title="Invoice"
      handleSubmit={handleSubmit}
      setOpenForm={setOpen}
      noActions={false}
    >
      {invoice ? (
        <div>
          <SimpleLabelValue label="Invoice ID" value={invoice.id || "-"} />
          <SimpleLabelValue label="Flight ID" value={invoice.flight_id || "-"} />
          <SimpleLabelValue label="Total Price(USD) " value={invoice.total_price || "-"} />
          <SimpleLabelValue label="Status" value={invoice.status || "-"} />
          <SimpleLabelValue label="Created At" value={invoice.created_at || "-"} />
          <SimpleLabelValue label="Updated At" value={invoice.updated_at || "-"} />
          <SimpleLabelValue label="Ticket PDF" value={invoice.ticketPDF || "-"} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </CustomFormWrapper>
  );
};

export default ViewInvoice;
