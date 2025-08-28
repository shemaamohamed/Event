import React, { useState } from "react";
import SimpleLabelValue from "../../SimpleLabelValue";
import "./style.scss";
import { useTripsStepper } from "../StepperContext";
import axios from "axios";

const PayForm = ({total , id}) => {
  const { currentStep, completeStep, invoice, setInvoice } = useTripsStepper();
console.log(invoice);
const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false); // ✅ حالة التحميل
console.log(total , id);

const handlePayment = async () => {
  const type = "pTrip"
 

  try {
    setLoading(true); // ⏳ تشغيل التحميل
    const token = localStorage.getItem("token")

    const response = await axios.post(
      `${BaseUrl}/paypal/create-payment`,
      {
        amount: total,
        return_url: `https://eventscons.com/success/${type}/${id}/0`,
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
      {invoice.length > 0 ? (
        <ul className="invoice-list">
          {invoice.map((invoice, index) => (
            <li key={index} className="invoice-item">
              <h3 className="invoice-title">
                Participant ID: {invoice.participant_id}
              </h3>
              <div className="invoice-details">
                <SimpleLabelValue
                  label="Base Price"
                  value={invoice.base_price}
                  className="invoice-detail"
                />
                <SimpleLabelValue
                  label="Options Price"
                  value={invoice.options_price}
                  className="invoice-detail"
                />
                <SimpleLabelValue
                  label="Total Price(USD)"
                  value={invoice.total_price}
                  className="invoice-detail"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No invoices available.</p>
      )}
      <div className="actions-section">
        <button className="next-button" onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default PayForm;
