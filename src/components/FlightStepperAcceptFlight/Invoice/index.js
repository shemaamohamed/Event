import React, { useEffect, useState } from "react";
import "./style.scss";
import httpService from "../../../common/httpService";
import toast from "react-hot-toast";
import axios from "axios";
const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false); // ✅ حالة التحميل

  const BaseUrl = process.env.REACT_APP_BASE_URL;

  // Fetch flight data from localStorage
  const getFlights = () => {
    const trips = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("Available_Trip_ID_")) {
        const value = localStorage.getItem(key);
        try {
          trips.push(JSON.parse(value));
        } catch {
          console.error("Error parsing localStorage data", value);
        }
      }
    }
    return trips;
  };
  const handlePayment = async () => {
    const type = "flight"
    const id = invoices[0].id
    try {
      setLoading(true); // ⏳ تشغيل التحميل
      const token = localStorage.getItem("token")

      const response = await axios.post(
        `${BaseUrl}/paypal/create-payment`,
        {
          amount: total,
          // return_url: `https://eventscons.com/success/${type}/${id}`,
             return_url: `http://localhost:3000/success/${type}/${id}`,

          cancel_url: `https://eventscons.com/failed`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderID = response.data.id;
      // window.location.href = `https://www.paypal.com/checkoutnow?token=${orderID}`;

      window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderID}`;
    } catch (error) {
      console.error("❌ خطأ أثناء إنشاء الطلب:", error);
      console.log(error);
      
      alert("حدث خطأ، حاول مرة أخرى.");
      
    } finally {
      setLoading(false); // ✅ إيقاف التحميل
    }
  };
  // Fetch invoice data from API
  const getInvoice = async () => {
    const getAuthToken = () => localStorage.getItem("token");
    const flights = getFlights();
    const ids = flights?.map((item) => item?.flight_id);
    try {
      const data = await httpService({
        method: "POST",
        url: `${BaseUrl}/invoice/flight`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,
        data: {
          flight_id: ids,
        },
        // withToast: true,
      });
      if (data.error) {
        toast.error(data.error);
      }
      console.log(data.error);

      setInvoices(data?.invoices || []);
      setTotal(data.total_sum)


    } catch (error) { }
  };
  console.log(total);
console.log(invoices);

  useEffect(() => {
    getInvoice();

  }, []);
console.log(invoices);

  return (
    <div className="invoice">
      <h2 className="invoice__title">Invoice Details</h2>

      <div className="invoice__list">
        {invoices?.length > 0 ? (
          invoices?.map((invoice) => (
            <div key={invoice?.id} className="invoice__item">
              <div className="invoice__item-header">
                <h3 className="invoice__flight-id">
                  Flight ID: {invoice?.flight_id}
                </h3>
                <span className={`invoice__status ${invoice?.status}`}>
                  {invoice?.status}
                </span>
              </div>
              <div className="invoice__details">
                <p className="invoice__total-price">
                  Total Price: ${invoice?.total_price}
                </p>
                <p className="invoice__date">
                  Created on: {new Date(invoice?.created_at).toLocaleString()}
                </p>
                <p className="invoice__date">
                  Last updated: {new Date(invoice?.updated_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="invoice__no-data">No invoices available.</p>
        )}
      </div>

      <div className="actions-section">
        <button className="next-button" onClick={handlePayment}>
          Pay
        </button> </div>
    </div>
  );
};

export default Invoice;
