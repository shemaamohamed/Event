import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import { useAuth } from "../../common/AuthContext";

const SponsorInvoice = ({ invoiceData2, setInvoiceData2, handlePrevious, handleNext }) => {
  const [loading, setLoading] = useState(true);
  const { myConferenceId } = useAuth();

  // Fetch the token from localStorage
  const getAuthToken = () => localStorage.getItem("token");
  const BaseUrl = process.env.REACT_APP_BASE_URL;;
  const getInvoice = () => {
    axios
      .get(`${BaseUrl}/invoice/${myConferenceId}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((response) => {
        setInvoiceData2(response.data.invoices[0]);
        console.log("ayat" , response);
        
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching invoice data:", error);
      });
  };

  useEffect(() => {
    getInvoice();
  }, [myConferenceId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="invoiceContainerS">
      <h1 className="invoiceTitle">Invoice Details</h1>
      <div className="invoiceDetails">
        {invoiceData2 && (
          <>
            {/* General Information */}
            <div className="section general-info">
              <h2>General Information</h2>
              <div className="row">
                <span className="label">Exhibit Number:</span>
                <span className="value">{invoiceData2.exhibit_number || "N/A"}</span>
              </div>
              <div className="row">
                <span className="label">User Name:</span>
                <span className="value">{invoiceData2.user_name}</span>
              </div>
              <div className="row">
                <span className="label">Total Amount:</span>
                <span className="value">${invoiceData2.total_amount}</span>
              </div>
              <div className="row">
                <span className="label">Created At:</span>
                <span className="value">{new Date(invoiceData2.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Conference Sponsorship Details */}
            <div className="section sponsorship-details">
              <h2>Conference Sponsorship Details</h2>
              {invoiceData2.conference_sponsorship_details.length > 0 ? (
                invoiceData2.conference_sponsorship_details.map((item, index) => (
                  <div key={index} className="row">
                    <span className="label">{item.item}:</span>
                    <span className="value">${item.price}</span>
                  </div>
                ))
              ) : (
                <p>No conference sponsorship details available.</p>
              )}
            </div>

            {/* Booth Cost Details */}
            <div className="section booth-details">
              <h2>Booth Cost Details</h2>
              {invoiceData2.booth_cost_details.length > 0 ? (
                invoiceData2.booth_cost_details.map((booth, index) => (
                  <div key={index} className="row">
                    <span className="label">Size:</span>
                    <span className="value">{booth.size}</span>
                    <span className="label">Cost:</span>
                    <span className="value">${booth.cost}</span>
                  </div>
                ))
              ) : (
                <p>No booth cost details available.</p>
              )}
            </div>

            {/* Sponsorship Option Details */}
            <div className="section sponsorship-options">
              <h2>Sponsorship Option Details</h2>
              {invoiceData2.sponsorship_option_details.length > 0 ? (
                invoiceData2.sponsorship_option_details.map((option, index) => (
                  <div key={index} className="row">
                    <span className="label">{option.title}:</span>
                    <span className="value">${option.price}</span>
                  </div>
                ))
              ) : (
                <p>No sponsorship options available.</p>
              )}
            </div>
            <div className="section sponsorship-options">
              {/* Shell Scheme Price and Square Meters */}
              {invoiceData2?.square_meters > 0 && <div className="row">
                <span className="label">Shell Scheme Price:</span>
                <span className="value">${invoiceData2.shell_scheme_price || "N/A"}</span>
              </div>}
              <div className="row">
                <span className="label">Square Meters:</span>
                <span className="value">{invoiceData2.square_meters || 0}</span>
              </div>



            </div>
          </>
        )}
      </div>
      <div className="fixed-buttons">
        {/* <button className="prev-button" onClick={handlePrevious}>Prev</button> */}
        <button
        style={{
          backgroundColor:'#9B1321'
        }}
         className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default SponsorInvoice;
