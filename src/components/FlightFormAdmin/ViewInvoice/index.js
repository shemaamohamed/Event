import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import "./style.scss";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper";
import SimpleLabelValue from "../../SimpleLabelValue";
import httpService from "../../../common/httpService";
import moment from "moment";
import { backendUrlImages } from "../../../constant/config";

const ViewInvoice = ({ data }) => {
  const [invoiceFlights, setInvoiceFlights] = useState([]);
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

      setInvoiceFlights(response?.invoice_flights || []); // Set invoice_flights array
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
    <CustomFormWrapper title="Invoice" noActions={false}>
      {invoiceFlights.length > 0 ? (
        invoiceFlights.map((invoice) => (
          <div key={invoice.id} className="all-Invoice">
            <SimpleLabelValue label="Invoice ID" value={invoice.id || "-"} />
            <SimpleLabelValue
              label="Flight ID"
              value={invoice.flight_id || "-"}
            />
            <SimpleLabelValue
              label="Total Price"
              value={invoice.total_price || "-"}
            />
            <SimpleLabelValue label="Status" value={invoice.status || "-"} />
            <SimpleLabelValue
              label="Created At"
              value={moment(invoice.created_at).format("DD-MM-YYYY") || "-"}
            />
            <SimpleLabelValue
              label="Ticket PDF"
              value={
                invoice.ticketPDF ? (
                  <a
                    href={`${backendUrlImages}${invoice.ticketPDF}`}
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
          </div>
        ))
      ) : (
        <div className="no-data"> No Data Available</div>
      )}
    </CustomFormWrapper>
  );
};

export default ViewInvoice;
