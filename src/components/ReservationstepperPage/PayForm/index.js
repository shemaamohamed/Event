import React, { useState } from "react";
import SimpleLabelValue from "../../SimpleLabelValue";
import { useNavigate } from "react-router-dom";
import { useStepper } from "../StepperContext";
import "./style.scss";
import axios from "axios";

const PayForm = () => {
  const { invoice } = useStepper();
  const [loading, setLoading] = useState(false);
  const BaseUrl = process.env.REACT_APP_BASE_URL;
console.log(invoice);

  const handlePayment = async () => {
    const type = "reservation"
    const id =invoice.room_invoices[0].room_id
    
    try {
      setLoading(true); // ⏳ تشغيل التحميل
      const token = localStorage.getItem("token")

      const response = await axios.post(
        `${BaseUrl}/paypal/create-payment`,
        {
          amount: invoice.total_invoice,
          return_url: `https://eventscons.com/success/${type}/${id}/0`,
            //  return_url: `http://localhost:3000/success/${type}/${id}/0`,

          cancel_url: `https://eventscons.com/failed`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderID = response.data.id;
      window.location.href = `https://www.paypal.com/checkoutnow?token=${orderID}`;

      // window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderID}`;
    } catch (error) {
      console.error("❌ خطأ أثناء إنشاء الطلب:", error);
      console.log(error);
      
      alert("حدث خطأ، حاول مرة أخرى.");
      
    } finally {
      setLoading(false); // ✅ إيقاف التحميل
    }
  };
  return (
    <div className="pay-form-container">
      {invoice && (
        <div className="pay-form-invoice-details">
          <h3>Invoice Details</h3>
          <div className="pay-form-section">
            <SimpleLabelValue
              label="Reservation ID"
              value={invoice.reservation_id}
            />
            <SimpleLabelValue
              label="Total Invoice"
              value={`$${invoice.total_invoice}`}
            />
             <SimpleLabelValue
              label=" ID"
              value={invoice.id}
            />
          </div>
          <h3>Room Invoices</h3>
          {invoice.room_invoices.map((room, index) => (
            <div key={index} className="pay-form-section">
              <SimpleLabelValue label="Room Type" value={room.room_type} />
              <SimpleLabelValue
                label="Base Price"
                value={`$${room.base_price}`}
              />
              {/* <SimpleLabelValue
                label="Early Check-In Price"
                value={`$${room.early_check_in_price}`}
              />
              <SimpleLabelValue
                label="Late Check-Out Price"
                value={`$${room.late_check_out_price}`}
              /> */}
              {/* <SimpleLabelValue label="Room ID" value={room.room_id} /> */}
              <SimpleLabelValue
                label="Total Cost"
                value={`$${room.total_cost}`}
              />
            </div>
          ))}
        </div>
      )}

   { invoice.total_invoice>0 &&  <div className="actions-section">
    <button className="next-button" onClick={handlePayment}>
          Pay
        </button>
      </div>}
    </div>
  );
};

export default PayForm;
