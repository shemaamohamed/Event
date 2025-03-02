import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper";
import SimpleLabelValue from "../../SimpleLabelValue";
import httpService from "../../../common/httpService";
import moment from "moment";
import { backendUrlImages } from "../../../constant/config";

const ViewInvoice = ({ data }) => {
  const [invoiceFlights, setInvoiceFlights] = useState([]);
  const [acceptedFlights, setAcceptedFlights] = useState([]);
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

      // Logging the accepted flight file URLs to debug
      console.log(response?.accepted_flights);

      setInvoiceFlights(response?.invoice_flights || []); // Set invoice_flights array
      setAcceptedFlights(response?.accepted_flights || []); // Set accepted_flights array
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
      <h3>Invoice Flights</h3>
      {invoiceFlights.length > 0 ? (
        invoiceFlights.map((invoice, index) => (
          <div key={invoice.id} className="all-Invoice">
            <SimpleLabelValue label="Invoice ID" value={invoice.id || "-"} />
            <SimpleLabelValue
              label="Flight ID"
              value={invoice.flight_id || "-"}
            />
            <SimpleLabelValue
              label="Total Price(USD)"
              value={invoice.total_price || "-"}
            />
            {index === 0 && (<SimpleLabelValue label="Status" value={invoice.total_price > 0 ? invoice.status : "approved"} />)
            }            <SimpleLabelValue
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
        <div className="no-data">No Data Available for Invoices</div>
      )}

      <h3>Accepted Flights</h3>
      {acceptedFlights.length > 0 ? (
        acceptedFlights.map((acceptedFlight) => (
          <div key={acceptedFlight.accepted_flight_id} className="all-accepted-flight">
            {/* <SimpleLabelValue
              label="Accepted Flight ID"
              value={acceptedFlight.accepted_flight_id || "-"}
            /> */}
            <SimpleLabelValue
              label="Flight ID"
              value={acceptedFlight.flight_id || "-"}
            />
            <SimpleLabelValue
              label="Price (USD)"
              value={acceptedFlight.price || "-"}
            />

            <SimpleLabelValue
              label="Flight File"
              value={
                acceptedFlight.flightFile ? (
                  <a
                    href={`${backendUrlImages}${acceptedFlight.flightFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Flight File
                  </a>
                ) : (
                  "-"
                )
              }
            />
          </div>
        ))
      ) : (
        <div className="no-data">No Data Available for Accepted Flights</div>
      )}
    </CustomFormWrapper>
  );
};

export default ViewInvoice;
